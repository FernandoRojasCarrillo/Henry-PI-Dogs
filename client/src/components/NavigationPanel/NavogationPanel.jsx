import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import './NavigationPanel.css';

export default function NavigationPanel() {

  const [ change, setChange ] = useState(true);
  const Location = useLocation();
  
  const HandleCLick = () => {
    setChange(!change);
  }


  return (
    <div className={ change === false ? 'navigation_panel_active' : 'navigation_panel'} >
      <div className={ change === false ? 'block' : Location.pathname === "/home" ? 'Btn_home' : 'Btn'} onClick={() => HandleCLick()}>
        <AiOutlineMenuUnfold 
          style={{height: '40px', width: '40px', color: 'rgb(255 255 255 / 80%'}}
        />
      </div>
      <div className={ change === true ? 'panel' : 'active_panel'} >

        <div className='navigation' >
          <Link to={'/home'} >
            <button className={ change === true ? 'block' : 'butons'} >Home</button>
          </Link>
          <Link to={'/favorites'} >
            <button className={ change === true ? 'block' : 'butons'} >Favorites</button>
          </Link>
          <Link to={'/formulario'} >
            <button className={ change === true ? 'block' : 'butons'} >Formulario</button>
          </Link>
          <Link to={'/created'} >
            <button className={ change === true ? 'block' : 'butons'} >Dogs Created</button>
          </Link>
        </div>
        <button onClick={() => HandleCLick()} className='btn_close'>X</button>
      </div>
    </div>
  )
}