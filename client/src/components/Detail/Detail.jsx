import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetDogsById } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Detail.css';

export default function Detail() {

  const dispatch = useDispatch();
  const { dogId } = useParams();
  const getDogDetail = useSelector(state => state.getDogDetail);

  useEffect(() => {
    dispatch(GetDogsById(dogId))
  },[])

  return (
    <div>
      {
        getDogDetail.length ? getDogDetail.map((dog) => 
          <div className='main-container-detail' >
            <div className='container-image' >
              <img className='img' src={ `${dog.image}` } alt={ `${dog.name}`} /> 
              <div className='container-detail' >
                <ul>
                  <li>{ dog.name}</li>
                  <li>Temperaments</li>
                  <li>{ dog.temperament}</li>
                  <li>Height</li>
                  <li>{ dog.height.metric}</li>
                  <li>weight</li>
                  <li>{ dog.weight.metric}</li>
                  <li>Life Expectancy</li>
                  <li>{ dog.life_span}</li>
                  <li className='btn-go-back' >
                    <div className='btn-color' ><Link to={'/home'} ><div>Go Back</div></Link></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : <Loading/>
        
          
      }
    </div>
  )
}