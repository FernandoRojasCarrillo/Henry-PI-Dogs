import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const Hello = () => {
    const botMessage = createChatBotMessage("Hi how are you. How can i help you ?");

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const Hola = () => {
    const botMessage = createChatBotMessage("Hola como estas. Como puedo ayudarte ?");

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const ButtonFavorites = () => {
    const botMessage = createChatBotMessage(
      'You will find the favorites button in the menu or you can click the button below',
      { widget: "ButtonFavorites" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const AnswerCreateNewDog = () => {
    const botMessage = createChatBotMessage(
      'To create a new dog you can click the button "Create new Dog" you will find it in the menu or you click the button below ',
      { widget: "AnswerCreateNewDog" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const ButtonDogsCreated = () => {
    const botMessage = createChatBotMessage(
      'You can find the dogs that have been created by clicking the button below',
      { widget: "ButtonDogsCreated" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  
  const ErrorMessage = () => {
    const botMessage = createChatBotMessage(
      "I'm sorry, I don't have an answer to your question. Be sure to type consistent questions and spell them correctly. Down below there are some frequent questions that may help you ",
      { widget: "FrequentQuestions" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  
  // Put the Hello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            Hola,
            Hello,
            ButtonFavorites,
            ButtonDogsCreated,
            AnswerCreateNewDog,
            ErrorMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
