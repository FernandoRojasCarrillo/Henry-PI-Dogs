import React, { useState } from "react";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
// import img from '../Home/background_img2.jpg';
import { IoPawSharp } from 'react-icons/io5';
import './ChatBot.css';

export const ChatBot = () => {
  const [showBot, setShowBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  const handleShow = (e) => {
    setShowBot((prev) => !prev);
  };
  return (
    <>
      {showBot && (
        <Chatbot
          className='ChatBot'
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
        />
      )}
      <button className='btnBot'>
        <IoPawSharp
          onClick={handleShow}
          className='img2'
        />
      </button>
      
      
    </>
  );
};
