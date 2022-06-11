import React from 'react';
import { Link } from 'react-router-dom';
import './DogCard.css';

export default function DogCard({image, name, weight, temperaments}) {


  return (
    <div className='container-card' >
      <div className='container-img' >
        <Link to={'/detail'}>
          <img className='image' src={ image } alt='nombre'/>
        </Link>
      </div>
      <ul className='container-info'>
        <li className='targeta-titulo'>{ name }</li>
        <li className='tageta-informacion'>Weight { weight }</li>
        <li className='tageta-informacion'>Temperaments</li>
        <li>{ temperaments ? temperaments : 'This dog has no temperaments'}</li>
      </ul>
    </div>
  )
}