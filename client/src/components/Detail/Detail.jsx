import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearDogDetail, GetDogsById, GoAheadDetail,  } from '../../redux/actions';
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
    dispatch(GetDogsById(dogId))
    return () => {
      dispatch(ClearDogDetail())
    }
  },[dispatch, dogId])

  return (
    <div>
      {
        getDogDetail.length ?  
          <div className='main-container-detail' >
              <div className='container-detail' >
              <img className='img' src={ getDogDetail[0] && `${getDogDetail[0].image}` } alt={ getDogDetail[0] &&  `${getDogDetail[0].name}`} /> 
                <div className='Cont_info' >
                  <ul>
                    <li className='Detail_Name'>{ getDogDetail[0] && getDogDetail[0].name}</li>
                    <li className='Detail_titles' >{ getDogDetail[0] && getDogDetail[0].temperament ? 'Temperament' : ''}</li>
                    <li className='Detail_Info' >{ getDogDetail[0] && getDogDetail[0].temperament}</li>
                    <li className='Detail_titles' >Height</li>
                    <li className='Detail_Info' >{ getDogDetail[0] && getDogDetail[0].height}</li>
                    <li className='Detail_titles' >weight</li>
                    <li className='Detail_Info' >{ getDogDetail[0] && getDogDetail[0].weight}</li>
                    <li className='Detail_titles' >Life Expectancy</li>
                    <li className='Detail_Info' >{ getDogDetail[0] && getDogDetail[0].life_span}</li>
                    <li className='Detail_titles' >{ getDogDetail[0] && getDogDetail[0].criadoPor && `Criado por`}</li>
                    <li className='Detail_Info' >{ getDogDetail[0] && getDogDetail[0].criadoPor && getDogDetail[0].criadoPor}</li>
                  </ul>
                </div>
              </div>
                <MdArrowBackIosNew 
                  // onClick={()=>dispatch(GoBehindDetail(getDogDetail[0] && getDogDetail[0].id))}
                  className='Arrows Arrows_left' 
                />
                <MdArrowForwardIos 
                  onClick={()=>dispatch(GoAheadDetail(getDogDetail[0] && getDogDetail[0].id))}
                  className='Arrows Arrows_right' 
                />
          </div>
         : 
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