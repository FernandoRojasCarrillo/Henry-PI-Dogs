import React from "react";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import { useDispatch, useSelector } from 'react-redux';
import "react-chatbot-kit/build/main.css";
import { IoPawSharp } from 'react-icons/io5';
import './ChatBot.css';
import { ChangeChatBot } from "../../redux/actions";

export const ChatBot = () => {
  const ChatBot = useSelector((state) => state.ChatBot);
  const dispatch = useDispatch();

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  const handleShow = (e) => {
    dispatch(ChangeChatBot())
  };
  return (
    <>
      {ChatBot && (
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
