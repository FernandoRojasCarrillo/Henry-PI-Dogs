import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDogs } from '../../redux/actions';
import './NavBar.css';

export default function NavBar() {

  const [ input, setInput ] = useState('');
  const dispatch = useDispatch();

  const HandleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value)
  }

  return (
    <div className='navbar-container' >
      <div className='create-dog-box' >
        <div className='create-dog' ><Link to = {'/create'}><p>Create New Dog</p></Link></div>
      </div>

      <div>
        <input 
          onChange={(e)=>HandleChange(e)}
          className='search-box-inp' 
          type='text' 
          placeholder='Search dog by name'
        />
        <button className='search-box-btn' >Search</button>
      </div>

      <div>
        <button className='btn-reload'  onClick={() => dispatch(getAllDogs())}>Reload All Dogs</button>
      </div>
    </div>
  )
}