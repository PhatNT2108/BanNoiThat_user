import React, { RefObject } from "react";
import { memo } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface MessageChatBoxProps {
  messages: Message[];
  isLoading: boolean;
  messageEndRef: RefObject<HTMLDivElement>;
}

const MessageChatBox: React.FC<MessageChatBoxProps> = ({
  messages,
  isLoading,
  messageEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-scroll border-b mb-2 max-w-md mx-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-2 mb-2 rounded-lg inline-block max-w-[80%] ${
              msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
            }`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center space-x-2 p-2 justify-start">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
        </div>
      )}

      <div ref={messageEndRef} className="p-1" />
    </div>
  );
};

export default memo(MessageChatBox);
