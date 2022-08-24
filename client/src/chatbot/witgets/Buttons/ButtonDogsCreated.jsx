import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ChangeChatBot } from "../../../redux/actions";
import '../Styles/Styles.css';

const ButtonDogsCreated = () => {

  const dispatch = useDispatch();
  
  return (
    <>
      <Link to="/created">
        <button 
          onClick={()=>dispatch(ChangeChatBot())}
          className='ChatBot_Btn ChatBot_Btn_CreateNewDog' 
        >
          Dogs Created
        </button>
      </Link>
    </>
  );
};

export default ButtonDogsCreated;
