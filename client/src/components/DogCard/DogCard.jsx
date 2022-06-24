import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AddToFavorites, RemoveToFavorites } from '../../redux/actions';
import './DogCard.css';

export default function DogCard({id, image, name, weight, temperaments, dog}) {

  const dispatch = useDispatch();
  const Location = useLocation();

  return (
    <div className='container-card' >
      <div className='container-img' >
        <Link to={`/detail/${id}`}>
        <img className='image' src= {image ? image : 'https://cdn2.thedogapi.com/images/dW5UucTIW.jpg' } alt={name} />
        </Link>
        <div className={image ? 'block' : 'text_default'} > Image by default</div>
      </div>
      <ul className='container-titulo'>
        <li className='targeta-titulo'>{ name }
          <ul className='container-info' >
            <li className='tageta-informacion'>Weight { weight }</li>
            <li className='tageta-informacion'>Temperaments</li>
            <li className='tageta-informacion' >{ temperaments ? temperaments : 'This dog has no temperaments'}</li>
          </ul>
        </li>
        <button onClick={() => dispatch(AddToFavorites(dog))} className={ Location.pathname === "/favorites" ? 'block' : "btn_favorites"}></button>
        <button onClick={() => dispatch(RemoveToFavorites(id))} className={ Location.pathname === "/home" ? 'block' : "btn_delete"}></button>
      </ul>
    </div>
  )
}