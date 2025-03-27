import React, { useState } from 'react';
import './ApiConfig.css';

const ApiConfig = ({ onApiChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState('https://0a07-34-106-12-161.ngrok-free.app/query');

  const handleSubmit = (e) => {
    e.preventDefault();
    onApiChange(apiUrl);
    setIsOpen(false);
  };

  return (
    <div className="api-config">
      <button 
        className="api-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚙️
      </button>
      
      {isOpen && (
        <div className="api-input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="Enter API URL"
              className="api-input"
            />
            <button type="submit" className="api-save-btn">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApiConfig; 