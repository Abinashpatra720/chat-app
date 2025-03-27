import React from "react";
import TypingIndicator from "./TypingIndicator";

const MessageList = ({ messages, isLoading }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender}`}
        >
          {msg.text}
        </div>
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default MessageList;