import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationPanel.css';

export default function NavigationPanel() {

  const [ change, setChange ] = useState(true);
  
  const HandleCLick = () => {
    setChange(!change);
  }


  return (
    <div className={ change === false ? 'navigation_panel_active' : 'navigation_panel'} >
      <button className={ change === false ? 'block' : 'Btn'} onClick={() => HandleCLick()}>Menu</button>
      <div className={ change === true ? 'block' : 'active_panel'} >
        <div className='navigation' >
          <Link to={'/home'} >
            <button className='butons' >Home</button>
          </Link>
          <Link to={'/favorites'} >
            <button className='butons' >Favorites</button>
          </Link>
          <Link to={'/formulario'} >
            <button className='butons' >Formulario</button>
          </Link>
          <Link to={'/created'} >
            <button className='butons' >Dogs Created</button>
          </Link>
        </div>
        <button onClick={() => HandleCLick()} className='btn_close'>X</button>
      </div>
    </div>
  )
}