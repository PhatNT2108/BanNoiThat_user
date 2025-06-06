import React, { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import difyAPI from "../../../../api/client-api/dify_api";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../../model/User";
import { RootState } from "../../../../redux/store";
import MessageChatBox from "./MessageChatBox";

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
  const userData: User = useSelector((state: RootState) => state.users);
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
        setMessages((pre) => [...pre, { text: inputValue, sender: "user" }]);
        setInputValue("");
        setIsLoading(true);
        var response: any = await difyAPI.service("chat-messages").send({
          inputs: {},
          query: inputValue,
          response_mode: "blocking",
          conversation_id: `${conversationId}`,
          user: `${userData.user_id}`,
        });
        if (response.conversation_id) {
          localStorage.setItem("conversationId", response.conversation_id);
        }

        setMessages((pre) => [
          ...pre,
          { text: response.answer, sender: "bot" },
        ]);
        setIsLoading(false);
        toggleScroll();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response: ResponseMessageHistory = await difyAPI
        .service("messages")
        .get(`user=${userData.user_id}&conversation_id=${conversationId} `);

      for (const value of response.data) {
        setMessages((pre) => [...pre, { text: value.query, sender: "user" }]);
        setMessages((pre) => [...pre, { text: value.answer, sender: "bot" }]);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const loadOpenerMessage = async () => {
    try {
      const response: any = await difyAPI.service("parameters").get("");

      let openingStatement = response?.opening_statement;
      let suggestQuestion = response?.suggested_questions;

      const htmlString = `
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-4">${openingStatement}</h2>
          <div class="space-y-2">
            ${suggestQuestion
          .map(
            (q: any) =>
              `<button class="block w-full text-left px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">${q}</button>`
          )
          .join("")}
          </div>
        </div>`;

      setMessages((pre) => [...pre, { text: htmlString, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const reloadMessages = async () => {
    setMessages([]);
    loadOpenerMessage();
    localStorage.removeItem("conversationId");
  };

  const [hasLoadedMessages, setHasLoadedMessages] = useState(false);

  useEffect(() => {
    const conversationId = localStorage.getItem("conversationId");
    if (conversationId && userData.user_id) {
      loadMessages(conversationId);
    }
  }, [userData.user_id]);
  useEffect(() => {
    const conversationId = localStorage.getItem("conversationId");

    if (!conversationId) {
      loadOpenerMessage();
    }
  }, []);

  useEffect(() => {
    toggleScroll();
  }, [messages, isOpen]);

  const toggleScroll = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatBox = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-40 space-y-3">
      {/* Toggle Button & Chat Box */}
      {isOpen ? (
        <>
          {/* Chat Box */}
          <div className="w-[24rem] bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3 text-white font-semibold">
              <span>Chat bot hỗ trợ</span>

              {/* Nhóm 2 nút: Reload và Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={reloadMessages}
                  className="p-2 rounded-full hover:bg-blue-600 transition duration-150"
                  title="Tải lại tin nhắn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>

                <button
                  onClick={toggleChatBox}
                  className="p-2 rounded-full hover:bg-blue-600 transition duration-150"
                  title="Đóng"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[30rem] p-4 bg-gray-50">
              <MessageChatBox
                messageEndRef={messageEndRef}
                messages={messages}
                isLoading={isLoading}
              />

              {/* Input */}
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={toggleScroll}
                  className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-md transition duration-150"
                  title="Cuộn xuống cuối"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </button>
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-150"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={toggleChatBox}
          className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition duration-150"
          title="Mở chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBox;
