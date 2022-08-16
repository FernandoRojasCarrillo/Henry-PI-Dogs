import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AddToFavorites, RemoveToFavorites, DeleteDog } from '../../redux/actions';
import { FaTrash } from 'react-icons/fa';
import './DogCard.css';

export default function DogCard({id, image, name, weight, temperaments, dog, fav_button}) {

  const dispatch = useDispatch();
  const Location = useLocation();


  const AddToFavorite = () => {
    dispatch(AddToFavorites(dog))
  }

  return (
    <div className='container-card' >
      <div className='container-img' >
        <Link to={`/detail/${id}`}>
        <img className='image' src= {image ? image : 'https://cdn2.thedogapi.com/images/dW5UucTIW.jpg' } alt={name} />
        </Link>
        <Link to={`/detail/${id}`}>
          <div className={image ? 'block' : 'text_default'} > Image by default</div>
        </Link>
        <FaTrash 
          onClick={()=>dispatch(DeleteDog(id, image))}
          className='Trash_can' 
        />
      </div>
      <ul className='container-titulo'>
        <li className='targeta-titulo'>{ name }
          <ul className='container-info' >
            <li className='tageta-informacion'>Weight { weight }</li>
            <li className='tageta-informacion'>Temperaments</li>
            <li className='tageta-informacion' >{ temperaments ? temperaments : 'This dog has no temperaments'}</li>
          </ul>
        </li>
        <button 
          onClick={() => AddToFavorite()} 
          className={ 
            Location.pathname === "/created" || 
            Location.pathname === "/favorites" ? 'block' : 
            fav_button === true ? 'fav_active' : "btn_favorites"
          }
        ></button>
        <button 
          onClick={() => dispatch(RemoveToFavorites(id))} 
          className={ 
            Location.pathname === "/home" || 
            Location.pathname === "/created" ? 'block' : 
            "btn_delete"}
        ></button>
      </ul>
    </div>
  )
}