import React, { RefObject } from 'react';
import { memo } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface MessageChatBoxProps {
  messages: Message[];
  isLoading: boolean;
  messageEndRef: RefObject<HTMLDivElement>;
}

const MessageChatBox: React.FC<MessageChatBoxProps> = ({ messages, isLoading, messageEndRef }) => {
  return (
    <div className="flex-1 overflow-y-scroll border-b mb-2 max-w-md mx-auto" >
      {
        messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
              }`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))
      }
      {isLoading && <div>...</div>}
      <div ref={messageEndRef} className="p-1" />
    </div>
  );
};

export default memo(MessageChatBox);
