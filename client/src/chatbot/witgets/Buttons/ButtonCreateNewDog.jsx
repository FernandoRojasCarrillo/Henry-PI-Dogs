import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Styles.css';

const ButtonCreateNewDog = () => {
  
  return (
    <>
      <Link to="/formulario">
        <button className='ChatBot_Btn ChatBot_Btn_CreateNewDog' >Create New Dog</button>
      </Link>
    </>
  );
};

export default ButtonCreateNewDog;
