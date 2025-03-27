import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Compenents/Dropdown";
import MessageList from "./Compenents/MessageList";
import InputField from "./Compenents/InputField";
import logo from "./assets/pngfind.com-nxt-logo-png-1371274.png";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([{ sender: "bot", text: "How can I help you today? " }]);
  }, []);

  const handleSendMessage = async (userMessage) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    console.log("User Message:", userMessage);

    try {
      const response = await axios.post("https://0a07-34-106-12-161.ngrok-free.app/query", {
      query: userMessage,
    });
      console.log(response
      );
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.answer },
      ]);
    } catch (error) {
      console.log(error)
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error fetching response. Try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="top-bar">
        <div className="top-bar-left">
        </div>
        <div className="top-bar-center">
          <div className="title-container">
            <img src={logo} alt="Blackbaud Logo" className="logo" />
            <h2>Blackbaud Enterprise Assistant(BEA)</h2>
          </div>
        </div>
        <div className="top-bar-right">
        </div>
      </div>
      <div className="chat-container">
        <MessageList messages={messages} isLoading={isLoading} />
        <InputField
          onSendMessage={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default App;