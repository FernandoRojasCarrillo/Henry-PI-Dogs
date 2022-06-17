import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDogs, SearchByName, ClearAllDogs } from '../../redux/actions';
import './NavBar.css';

export default function NavBar() {

  const [ input, setInput ] = useState('');
  const dispatch = useDispatch();

  const HandleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value)
  }

  const HandleSubmit = (e)=>{
    e.preventDefault();
    input ? dispatch(ClearAllDogs()) : alert('El input de busqueda esta vacío')
    input && dispatch(SearchByName(input)) 
    setInput('');
  }

  const HandleClickGetAll = ()=>{
    dispatch(ClearAllDogs())
    dispatch(getAllDogs())
  }

  return (
    <div className='navbar-container' >
      <div className='create-dog-box' >
        <div className='create-dog' ><Link to = {'/create'}><p>Create New Dog</p></Link></div>
      </div>

      <div>
        {/* <input 
          onChange={(e)=>HandleChange(e)}
          className='search-box-inp' 
          type='text' 
          placeholder='Search dog by name'
        />
        <button onClick={() => HandleClick()} className='search-box-btn' >Search</button> */}
        <form className='container' onSubmit={(e) => HandleSubmit(e)} >
          <input
             className='search-box-inp'
             type="text"
             placeholder="Buscar cuidad"
             value={input}
             onChange={(e) => HandleChange(e)}
          />
          <input 
              className='search-box-btn'
              type='submit' 
              value='Search'
          />
        </form>
      </div>

      <div>
        <button className='btn-reload'  onClick={() => HandleClickGetAll()}>Reload All Dogs</button>
      </div>
    </div>
  )
}