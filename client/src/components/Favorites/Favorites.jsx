import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetFavotrites } from '../../redux/actions';
import DogCard from '../DogCard/DogCard';
import Message from '../Message/Message';
import NavigationPanel from '../NavigationPanel/NavogationPanel';
import './Favorites.css';

export default function Favorites() {

  const [ state, setState ] = useState(false);
  const [ id, setId ] = useState(null);
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
              setState={setState}
              setId={setId}
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
      <Message
        setState={setState}
        state={state}
        id={id}
      />
    </div>
  )
}