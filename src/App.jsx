import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Compenents/Dropdown";
import MessageList from "./Compenents/MessageList";
import InputField from "./Compenents/InputField";
import ApiConfig from "./Compenents/ApiConfig";
import logo from "./assets/pngfind.com-nxt-logo-png-1371274.png";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState("https://0a07-34-106-12-161.ngrok-free.app/query");

  useEffect(() => {
    setMessages([{ sender: "bot", text: "How can I help you today? " }]);
  }, []);

  const handleSendMessage = async (userMessage) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    console.log("User Message:", userMessage);

    try {
      const response = await axios.post(apiUrl, {
        query: userMessage,
      });
      console.log(response);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.answer },
      ]);
    } catch (error) {
      console.log(error);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error fetching response. Try again! Please email me at abinash.patra@blackbaud.com to get the new api as this is free tier and it expires after few hours" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiChange = (newApiUrl) => {
    setApiUrl(newApiUrl);
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
      <ApiConfig onApiChange={handleApiChange} />
    </div>
  );
}

export default App;