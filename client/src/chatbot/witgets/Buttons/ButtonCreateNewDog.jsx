import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ChangeChatBot } from "../../../redux/actions";
import '../Styles/Styles.css';

const ButtonCreateNewDog = () => {

  const dispatch = useDispatch();
  
  return (
    <>
      <Link to="/formulario">
        <button 
          onClick={()=>dispatch(ChangeChatBot())}
          className='ChatBot_Btn ChatBot_Btn_CreateNewDog' 
        >
          Create New Dog
        </button>
      </Link>
    </>
  );
};

export default ButtonCreateNewDog;
