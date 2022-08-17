import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Styles.css';

const ButtonDogsCreated = () => {
  
  return (
    <>
      <Link to="/created">
        <button className='ChatBot_Btn ChatBot_Btn_CreateNewDog' >Dogs Created</button>
      </Link>
    </>
  );
};

export default ButtonDogsCreated;
