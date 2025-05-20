import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from "lucide-react";
import difyAPI from '../../../api/client-api/dify_api';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../../model/User';
import { RootState } from '../../../redux/store';
import MessageChatBox from './chatbox';

interface MessageHistory {
  id: string;
  conversation_id: string;
  query: string;
  answer: string;
}

interface ResponseMessageHistory {
  limited: number;
  has_more: boolean;
  data: MessageHistory[];
}

type Message = {
  text: string;
  sender: "user" | "bot";
};

const ChatBox: React.FC = () => {
  const userData: User = useSelector(
    (state: RootState) => state.users
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    try {
      if (inputValue.trim()) {
        var conversationId = localStorage.getItem("conversationId");
        if (!conversationId) {
          conversationId = "";
        }
        setMessages(pre => [...pre, { text: inputValue, sender: "user" }]);
        setInputValue("");
        setIsLoading(true);
        var response: any = await difyAPI.service("chat-messages").send({
          "inputs": {},
          "query": inputValue,
          "response_mode": "blocking",
          "conversation_id": `${conversationId}`,
          "user": `${userData.user_id}`
        });
        if (response.conversation_id) {
          localStorage.setItem("conversationId", response.conversation_id);
        }
        setMessages(pre => [...pre, { text: response.answer, sender: "bot" }]);
        setIsLoading(false);
        toggleScroll();
      }
    }
    catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    const response: ResponseMessageHistory = await difyAPI.service('messages').get(`user=${userData.user_id}&conversation_id=${conversationId} `);
    for (const value of response.data) {
      setMessages(pre => [...pre, { text: value.query, sender: "user" }]);
      setMessages(pre => [...pre, { text: value.answer, sender: "bot" }]);
    }
  }

  const reloadMessages = async () => {
    setMessages([]);
    localStorage.removeItem('conversationId');
  }

  useEffect(() => {
    const conversationId = localStorage.getItem("conversationId");
    if (conversationId && (userData.user_id)) {
      loadMessages(conversationId);
    }
  }, [userData.user_id]);

  useEffect(() => {
    toggleScroll();
    console.log("Scroll to bottom");
  }, [messages, isOpen]);

  const toggleScroll = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scrollTop:", messageEndRef.current?.scrollTop);
    console.log("scrollHeight:", messageEndRef.current?.scrollHeight);
    console.log("scrollClientHeight:", messageEndRef.current?.clientHeight);
  }

  const toggleChatBox = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-40">
      {/* Chat Toggle Button */}
      {
        isOpen ? (
          <div className='flex flex-row gap-2'>
            <button
              className="rounded-full p-2 shadow-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              onClick={reloadMessages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
            <button
              className="rounded-lg shadow-lg p-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none"
              onClick={toggleChatBox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : <button
          className="rounded-full p-4 shadow-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={toggleChatBox}
        >
          <MessageCircle size={24} />
        </button>
      }

      {/* Chat Box */}
      {isOpen && (
        <div className="mt-4 w-[25rem] bg-white rounded-lg shadow-lg z-40">
          <div className='flex flex-row justify-center items-center gap-3 bg-blue-400 rounded-t-lg py-2 font-bold'>
            Chat bot hỗ trợ
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <div className="flex flex-col h-[40em] p-4">
            {/* Message Display */}
            <MessageChatBox messageEndRef={messageEndRef} messages={messages} isLoading={isLoading} />
            {/* Input Field */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 p-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={toggleScroll}
                className="px-2 py-2 m-1 bg-yellow-400 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5" // stroke-width → strokeWidth
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round" // stroke-linecap → strokeLinecap
                    strokeLinejoin="round" // stroke-linejoin → strokeLinejoin
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </button>
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
