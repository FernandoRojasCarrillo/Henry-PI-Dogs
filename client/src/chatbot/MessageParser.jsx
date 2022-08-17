import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase();
    if (message.includes("hello") || message.includes("hi") ) {
      actions.Hello();
    }
    else if (message.includes("hola")) {
      actions.Hola();
    }
    else if ( message.includes("new") && message.includes("dog") ) {
      actions.AnswerCreateNewDog();
    }
    else if ( message.includes("favorites")  ) {
      actions.ButtonFavorites();
    }
    else if ( message.includes("dogs") && message.includes("created")  ) {
      actions.ButtonDogsCreated();
    }
    else {
      actions.ErrorMessage();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
