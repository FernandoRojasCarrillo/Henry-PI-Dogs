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