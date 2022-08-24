import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ChangeChatBot } from "../../../redux/actions";
import '../Styles/Styles.css';

const ButtonFavorites = () => {

  const dispatch = useDispatch();
  
  return (
    <>
      <Link to="/favorites">
        <button 
          onClick={()=>dispatch(ChangeChatBot())}
          className='ChatBot_Btn ChatBot_Btn_Favorites' 
        >
          Favorites
        </button>
      </Link>
    </>
  );
};

export default ButtonFavorites;
