import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import DogCard from '../DogCard/DogCard';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import 
{
  getAllDogs, GetAndShowAllDogs, MoveForward, MoveBachward, FilterByAlphabeticalOder, FilterByWeigth, 
  FilterByTemperament, FilterByBreed, GetAllBreeds, GetAllTemperament
}  
from '../../redux/actions';
import { Link } from 'react-router-dom';


export default function Home(){


  const dispatch = useDispatch();
  const [ filterByBreed, setFilterByBreed ] = useState(true)
  const [ filterByTemperament, setFilterByTemperament ] = useState(true)
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
  },[])

  const value = Math.ceil(AllDogs.length / 8);
  // let Dogs = [...AllDogs.slice(0, 10)];
  

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

  return (
    <div className="app-container-img" >

      <div className="app-container-back" >

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
                <div className='paginado' >
                  <button className={ value === 1 ? 'block' : 'btn-buttons1' } onClick={() => dispatch(MoveBachward())}></button>
                  <div className='container-paginado ' >

                    <button className='btn_pagina_phone' >{Current}</button>
                    <button className={ value + 1 <= 1 ? 'block' :  Current === 1 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(1))} >1</button>
                    <button className={ value + 1 <= 2 ? 'block' :  Current === 2 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(2))} >2</button>
                    <button className={ value + 1 <= 3 ? 'block' :  Current === 3 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(3))} >3</button>
                    <button className={ value + 1 <= 4 ? 'block' :  Current === 4 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(4))} >4</button>
                    <button className={ value + 1 <= 5 ? 'block' :  Current === 5 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(5))} >5</button>
                    <button className={ value + 1 <= 6 ? 'block' :  Current === 6 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(6))} >6</button>
                    <button className={ value + 1 <= 7 ? 'block' :  Current === 7 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(7))} >7</button>
                    <button className={ value + 1 <= 8 ? 'block' :  Current === 8 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(8))} >8</button>
                    <button className={ value + 1 <= 9 ? 'block' :  Current === 9 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(9))} >9</button>
                    <button className={ value + 1 <= 10 ? 'block' : Current === 10 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(10))} >10</button>
                    <button className={ value + 1 <= 11 ? 'block' : Current === 11 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(11))} >11</button>
                    <button className={ value + 1 <= 12 ? 'block' : Current === 12 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(12))} >12</button>
                    <button className={ value + 1 <= 13 ? 'block' : Current === 13 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(13))} >13</button>
                    <button className={ value + 1 <= 14 ? 'block' : Current === 14 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(14))} >14</button>
                    <button className={ value + 1 <= 15 ? 'block' : Current === 15 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(15))} >15</button>
                    <button className={ value + 1 <= 16 ? 'block' : Current === 16 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(16))} >16</button>
                    <button className={ value + 1 <= 17 ? 'block' : Current === 17 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(17))} >17</button>
                    <button className={ value + 1 <= 18 ? 'block' : Current === 18 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(18))} >18</button>
                    <button className={ value + 1 <= 19 ? 'block' : Current === 19 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(19))} >19</button>
                    <button className={ value + 1 <= 20 ? 'block' : Current === 20 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(20))} >20</button>
                    <button className={ value + 1 <= 21 ? 'block' : Current === 21 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(21))} >21</button>
                    <button className={ value + 1 <= 22 ? 'block' : Current === 22 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(22))} >22</button>
                    <button className={ value + 1 <= 23 ? 'block' : Current === 23 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(23))} >23</button>
                    <button className={ value + 1 <= 24 ? 'block' : Current === 24 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(24))} >24</button> 
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
                <button className='btn_temps' onClick={() => BtnFilterByTemp(temp.name)} >{temp.name}</button>
              )
            }
            <button className='filterBy' >Close</button>
          </div>

        </div> 

      </div>
    </div>
  )
}