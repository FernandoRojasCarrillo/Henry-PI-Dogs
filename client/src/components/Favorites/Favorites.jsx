import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetFavotrites } from '../../redux/actions';
import DogCard from '../DogCard/DogCard';
import NavigationPanel from '../NavigationPanel/NavogationPanel';
import './Favorites.css';

export default function Favorites() {

  const Favorites = useSelector((state) => state.Favorites);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetFavotrites())
  },[dispatch])

  return (
    <div className="favorites" >
      <div className='All_favorites' >
        {
          Favorites.length ? Favorites.map((fav) =>
            <DogCard
              key={fav.id}
              id={fav.id}
              image={fav.image} 
              name={fav.name}
              weight={fav.weight}
              temperaments={fav.temperament}
              fav={fav}
            />
          )
          : <div className='message' >There is not dogs added</div>
        }
      </div>
      <h1
        className='message_Favorite'
      >
        Favorites
      </h1>
      <NavigationPanel/>
    </div>
  )
}