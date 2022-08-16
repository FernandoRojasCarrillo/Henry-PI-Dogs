import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearDogDetail, GetDogsById, GoAheadDetail, GoBehindDetail, getAllDogs } from '../../redux/actions';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import NavigationPanel from '../NavigationPanel/NavogationPanel';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { MdArrowBackIosNew } from 'react-icons/md';
import './Detail.css';

export default function Detail() {

  const dispatch = useDispatch();
  const History = useHistory();
  const { dogId } = useParams();
  const getDogDetail = useSelector(state => state.getDogDetail);

  useEffect(() => {
    dispatch(getAllDogs())
    dispatch(GetDogsById(dogId))
    return () => {
      dispatch(ClearDogDetail())
    }
  },[dispatch, dogId])

  return (
    <div>
      {
        getDogDetail.length ? getDogDetail.map((dog) => 
          <div className='main-container-detail' >
              <div className='container-detail' >
              <img className='img' src={ `${dog.image}` } alt={ `${dog.name}`} /> 
                <div className='Cont_info' >
                  <ul>
                    <li className='Detail_Name'>{ dog.name}</li>
                    <li className='Detail_titles' >{ dog.temperament ? 'Temperament' : ''}</li>
                    <li className='Detail_Info' >{ dog.temperament}</li>
                    <li className='Detail_titles' >Height</li>
                    <li className='Detail_Info' >{ dog.height}</li>
                    <li className='Detail_titles' >weight</li>
                    <li className='Detail_Info' >{ dog.weight}</li>
                    <li className='Detail_titles' >Life Expectancy</li>
                    <li className='Detail_Info' >{ dog.life_span}</li>
                    <li className='Detail_titles' >{dog.criadoPor && `Criado por`}</li>
                    <li className='Detail_Info' >{ dog.criadoPor && dog.criadoPor}</li>
                  </ul>
                </div>
              </div>
                <MdArrowBackIosNew 
                  onClick={()=>dispatch(GoBehindDetail(dog.id))}
                  className='Arrows Arrows_left' 
                />
                <MdArrowForwardIos 
                  onClick={()=>dispatch(GoAheadDetail(dog.id))}
                  className='Arrows Arrows_right' 
                />
          </div>
        ) : 
        <div className='main-container-detail' >
          <Loading/>
        </div>
      }
      <NavigationPanel/>
      <BsArrowReturnLeft
        onClick={()=>History.goBack()}
        style={{
          position: 'fixed',
          top: '5px',
          right: '15px',
          fontSize: '40px',
          color: 'rgb(255 255 255 / 70%)',
          cursor:'pointer'
        }}
      />
      
    </div>
  )
}