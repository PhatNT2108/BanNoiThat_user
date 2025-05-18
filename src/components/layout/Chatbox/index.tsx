import React, { useState } from 'react';
import { MessageCircle } from "lucide-react";
import difyAPI from '../../../api/client-api/dify_api';

type Message = {
  text: string;
  sender: "user" | "bot";
};

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const toggleChatBox = (): void => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (inputValue.trim()) {
      setMessages(pre => [...pre, { text: inputValue, sender: "user" }]);
      setInputValue("");
      setIsLoading(true);
      var response: any = await difyAPI.service("chat-messages").send({
        "inputs": {},
        "query": inputValue,
        "response_mode": "blocking",
        "conversation_id": "",
        "user": "abc-123"
      });
      setMessages(pre => [...pre, { text: response.answer, sender: "bot" }]);
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Chat Toggle Button */}
      {
        isOpen ? (
          <button
            className="rounded-lg py-1 px-3 shadow-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            onClick={toggleChatBox}
          >
            x
          </button>
        ) : <button
          className="rounded-full p-4 shadow-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={toggleChatBox}
        >
          <MessageCircle size={24} />
        </button>
      }

      {/* Chat Box */}
      {isOpen && (
        <div className="mt-4 w-80 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col h-[40rem] p-4">
            {/* Message Display */}
            <div className="flex-1 overflow-y-auto border-b mb-2 max-w-md mx-auto">
              {messages.map((msg, index) => (
                <div>
                  <div
                    key={index}
                    className={`p-2 mb-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
                      }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ))}
              {isLoading && <div>...</div>}
            </div>


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
