import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './DogCard.css';

export default function DogCard() {

  const AllDogs = useSelector(state => state.AllDogs)

  return (
    <div className='container-card' >
      <div className='container-img' >
        <Link to={'/detail'}>
          <img className='image' src={ AllDogs.length && AllDogs[1].image} alt='nombre'/>
        </Link>
      </div>
      <ul className='container-info'>
        <li>Name { AllDogs.length && AllDogs[1].name}</li>
        <li>Weight { AllDogs.length && AllDogs[1].weight.imperial}</li>
        <li>Temperaments</li>
        <li>{ AllDogs.length && AllDogs[1].temperament}</li>
      </ul>
    </div>
  )
}