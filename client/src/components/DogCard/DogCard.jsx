import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { 
  AddToFavorites,
} 
from '../../redux/actions';
import { MdDeleteForever } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import './DogCard.css';

export default function DogCard({id, image, name, weight, temperaments, dog, fav_button, setState, setId, setImage}) {

  const dispatch = useDispatch();
  const Location = useLocation();


  const AddToFavorite = () => {
    console.log(fav_button)
    fav_button === false ?
    dispatch(AddToFavorites(dog, true)) :
    dispatch(AddToFavorites(dog, false)) 
  }

  const DeleteFavorite = () => {
    setId(id)
    setState(true)
  }

  const DeleteDog = () => {
    setId(id)
    setImage(image)
    console.log(image)
    setState(true)
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
        {
          Location.pathname === "/created" ?
          <MdDeleteForever 
            onClick={()=>DeleteDog()}
            className='Trash_can' 
          />
          : <div></div>
        } 
        <TiDelete
          onClick={() => DeleteFavorite()} 
          className={ Location.pathname === "/favorites" ? "btn_delete" : 'block'}/>
      </div>
      <ul className='container-titulo'>
        <li className='targeta-titulo'>{ name }
          <ul className='container_Info' >
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
            !fav_button ? "btn_favorites" : 'fav_active' 
          }
        ></button>
      </ul>
      
    </div>
  )
}