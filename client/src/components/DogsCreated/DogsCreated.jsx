import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogsFromDB } from '../../redux/actions';
import DogCard from '../DogCard/DogCard';
import Message from '../Message/Message';
import NavigationPanel from '../NavigationPanel/NavogationPanel';
import './DogsCreated.css';

export default function DogsCreated() {

  const [ state, setState ] = useState(false);
  const [ id, setId ] = useState(null);
  const [ image, setImage ] = useState(null);

  const dispatch = useDispatch();
  const AllDogsFromDataBase = useSelector((state) => state.AllDogsFromDataBase);

  useEffect(() => {
    dispatch(getAllDogsFromDB())
  },[dispatch])

  return (
    <div className='container_dogs_created' >
      <div className='container_dogs_card' >
        {
          AllDogsFromDataBase.length ? AllDogsFromDataBase.map((dog) => (
            <DogCard
              key={dog.id}
              id={dog.id}
              image={dog.image ? dog.image : null} 
              name={dog.name}
              weight={dog.weight}
              temperaments={dog.temperament}
              dog={dog}
              setState={setState}
              setId={setId}
              setImage={setImage}
            />
          )) : <div className='message' >Not dogs created</div>
        }
      </div>
      <h1
        className='dogs_created_Favorite'
      >
        Dogs Created
      </h1>
      <NavigationPanel/>
      <Message
        setState={setState}
        state={state}
        id={id}
        image={image}
      />
    </div>
  )
}