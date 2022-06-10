import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import  {getAllDogs}  from '../../redux/actions';
import './Home.css'
import DogCard from '../DogCard/DogCard';

export default function Home(){

  const dispatch = useDispatch();
  const AllDogs = useSelector(state => state.AllDogs)

  useEffect(()=>{
    dispatch(getAllDogs())
  },[])

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   dispatch(getAllDogs())
  // }

  return (
    <div className="app-container-img" >

      <div className="app-container-back" >

        <NavBar/>
        <div className='main-container' >

          <div className='container-buttons' >
            <button >Filter By</button>
            <button>Oder By</button>
          </div>

          <div className='container-dogs' >
            <DogCard/>
          </div>

        </div>
      </div>
    </div>
  )
}