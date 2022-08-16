import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import DogCard from '../DogCard/DogCard';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import NavigationPanel from '../NavigationPanel/NavogationPanel.jsx'
import 
{
  getAllDogs, GetAndShowAllDogs, MoveForward, MoveBachward, FilterByAlphabeticalOder, FilterByWeigth, 
  FilterByTemperament, FilterByBreed, GetAllBreeds, GetAllTemperament, ClearAllDogs
}  
from '../../redux/actions';
import { Link } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import { MdCloseFullscreen } from 'react-icons/md';
import { IoReloadOutline } from 'react-icons/io5';
import FilterComponent from '../FilterComponent/FIlterComponent';
import Search from '../Search/Search';


export default function Home(){

  const dispatch = useDispatch();
  const [ filterByBreed, setFilterByBreed ] = useState(true)
  const [ filterByTemperament, setFilterByTemperament ] = useState(true)
  const [ SearchBar, setSearchBar ] = useState(true)
  const [ LeftMenu, setLeftMenu ] = useState(true)
  const  ShowDogs = useSelector(state => state.ShowDogs);
  const  Current = useSelector(state => state.Current);
  const  AllDogs = useSelector(state => state.AllDogs);
  const  Breeds = useSelector(state => state.Breeds);
  const  Temperaments = useSelector(state => state.Temperaments);

  
  
  useEffect( ()=>{
    if(Current === 0) {
      dispatch(getAllDogs())
      dispatch(GetAllBreeds())
      dispatch(GetAllTemperament())
    }
  },[dispatch, Current])

  const value = Math.ceil(AllDogs.length / 8);
  let Dogs = [...AllDogs.slice(0, value)];

  const HandleNavBar = (value) => {
    setSearchBar(value)
    setLeftMenu(value)
  }

  const FilterByBred = () => {
    setFilterByBreed(!filterByBreed);
    setFilterByTemperament(true);
  }
  
  const FilterByTemp = () => {
    setFilterByTemperament(!filterByTemperament);
    setFilterByBreed(true);
  }
  
  const BtnFilterByBreed = (breed) => {
    dispatch(FilterByBreed(breed))
    setFilterByBreed(true);
  }

  const BtnFilterByTemp = (temp) => {
    dispatch(FilterByTemperament(temp))
    setFilterByBreed(true);
    setFilterByTemperament(true);
  }

  const HandleClickGetAll = ()=>{
    dispatch(ClearAllDogs())
    dispatch(getAllDogs())
  }

  return (
    <div className="app-container-img" >

      <div className={ "app-container-back Padding_top" } >
        
        <NavBar/>
        
        <div className='main-container' >

          <div className='container-buttons' >
            <button className='btn_navbar' onClick={() => FilterByTemp()} >Filter By Temperament</button>
            <button className='btn_navbar' onClick={() => FilterByBred()} >Filter By Breed</button>

            <Link to='/favorites' >
              <button className='btn_navbar' >Favorites</button>
            </Link>

            <div className='container-order' >
              <ul className={'order-name' } >
                <li><button className='oder-by'>Order By</button>
                  <ul className='buttons-order' >
                    <li><button className='btn-order' >Order by Name</button>
                      <ul className='buttons-order-name' >
                        <li><button className='sub-btn-order' onClick={() => dispatch(FilterByAlphabeticalOder('A-Z'))} >A - Z</button></li>
                        <li><button className='sub-btn-order' onClick={() => dispatch(FilterByAlphabeticalOder('Z-A'))} >Z - A</button></li>
                      </ul>
                    </li>
                    <li><button className='btn-order Weight' >Order by Weight</button>
                      <ul className='buttons-order-name W' >
                        <li><button className='sub-btn-order' onClick={() => dispatch(FilterByWeigth('Des'))} >Des</button></li>
                        <li><button className='sub-btn-order' onClick={() => dispatch(FilterByWeigth('Asc'))} >Asc</button></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

              <Link to={'/created'} >
                <button className='btn_navbar' >Dogs Created</button>
              </Link>

          </div>

            {
              ShowDogs.length ?
              (
                // Pagination Buttons
                <div className='paginado' >
                  <button className={ value === 1 ? 'block' : 'btn-buttons1' } onClick={() => dispatch(MoveBachward())}></button>
                  <div className='container-paginado ' >
                    <button className='btn_pagina_phone' >{Current}</button>
                    {
                      Dogs.length && Dogs.map((d, i) => (
                        <>
                          <button className={ value + 1 <= i+1 ? 'block' :  Current === i+1 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(i+1))} >{i+1}</button>
                        </>
                      ))
                    }
                  </div>
                  <button  className={ value === 1 ? 'block' : 'btn-buttons2' }  onClick={() => dispatch(MoveForward())}></button>
                </div>
              ): (<div></div>)
            }
          <div className='container-dogs' >
            {
              AllDogs.length ? 
                ShowDogs[0].name !== 'error' ?
                ShowDogs.map((dog) =>
                  <DogCard
                    key={dog.id}
                    id={dog.id}
                    image={dog.image ? dog.image : null} 
                    name={dog.name}
                    weight={dog.weight}
                    temperaments={dog.temperament}
                    dog={dog}
                    fav_button={dog.fav_button}
                  />
                ): <div className='container_error' >
                    <div className='error_message' >
                      <span>No dogs with that name have been found</span>
                    </div>
                  </div> 
              :
              <>
                {
                  <Loading/>
                }
              </>
            }
          </div>

        </div>
        <div className={ filterByBreed === true ? 'Block' : "container_breeds"}>
          {
            Breeds.map((breed) => 
              <button className='btn_breed' onClick={() => BtnFilterByBreed(breed)}>{breed}</button> 
            )
          }
        </div>
        <div className={ filterByTemperament === true ? 'Block' : 'left_menu'} >
          <div className="container_temps">
            {
              Temperaments.map((temp) =>
                <button key={temp.id} className='btn_temps' onClick={() => BtnFilterByTemp(temp.name)} >{temp.name}</button>
              )
            }
            <input onClick={()=>setFilterByTemperament(true)} type='button' className='filterBy' value='X' />
          </div>
        </div> 
        <div className='Up_Background_menu' ></div>
        {
          SearchBar ?
            <div className='CONT_FILTER_BTN' >
              <ImSearch 
                onClick={()=>HandleNavBar(false)} 
                style={{
                  height: '30px',
                  width: '30px',
                  position: 'fixed',
                  top: '15px',
                  color: 'rgb(255 255 255 / 80%)',
                  right: '20px'
                }}
              />
            </div>
          : 
            <>
              <Search/>
              <MdCloseFullscreen
                onClick={()=>HandleNavBar(true)}
                style={{
                  height: '30px',
                  width: '30px',
                  position: 'fixed',
                  top: '20px',
                  color: 'rgb(255 255 255 / 80%)',
                  right: '10px'
                }}
              />
            </>
        }
        {
          LeftMenu ?
          <>
            <div className='CONT_FILTER_BTN' >
              <NavigationPanel/>
              <FilterComponent/>
              <IoReloadOutline
                onClick={()=>HandleClickGetAll()}
                style={{
                  height: '30px',
                  width: '30px',
                  position: 'fixed',
                  top: '15px',
                  left: '110px',
                  color: 'rgb(255 255 255 / 80%)',
                  Cursor: 'pointer'
                }}
              />
            </div>
          </>          
          : 
          <div></div>
        }
      </div>
    </div>
  )
}