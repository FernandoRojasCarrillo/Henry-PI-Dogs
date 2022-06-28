import React from 'react';
import { useSelector } from 'react-redux';
import DogCard from '../DogCard/DogCard';
import NavigationPanel from '../NavigationPanel/NavogationPanel';
import './Favorites.css';

export default function Favorites() {

  const Favorites = useSelector((state) => state.Favorites);

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
      <NavigationPanel/>
    </div>
  )
}