import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {

  const HandleClick = () => {

  }

  return (
    <div className='navbar-container' >
      <div className='create-dog-box' >
        <div className='create-dog' ><Link to = {'/create'}><p>Create New Dog</p></Link></div>
      </div>

      <div>
        <input className='search-box-inp' type='text' placeholder='Search dog by name'/>
        <button className='search-box-btn' onClick={() => HandleClick()} >Search</button>
      </div>

      <div>
        <button className='btn-reload'  onClick={() => HandleClick()}>Reload All Dogs</button>
      </div>
    </div>
  )
}