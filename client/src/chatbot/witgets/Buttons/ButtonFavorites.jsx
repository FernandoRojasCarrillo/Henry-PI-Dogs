import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Styles.css';

const ButtonFavorites = () => {
  
  return (
    <>
      <Link to="/favorites">
        <button className='ChatBot_Btn ChatBot_Btn_Favorites' >Favorites</button>
      </Link>
    </>
  );
};

export default ButtonFavorites;
