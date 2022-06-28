import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearDogDetail, GetDogsById } from '../../redux/actions';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
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
                  <li>{ dog.height}</li>
                  <li>weight</li>
                  <li>{ dog.weight}</li>
                  <li>Life Expectancy</li>
                  <li>{ dog.life_span}</li>
                  <li>{dog.criadoPor && `Criado por`}</li>
                  <li>{ dog.criadoPor && dog.criadoPor}</li>
                  <li className='btn-go-back' >
                    <div className='btn-color' ><button onClick={() =>History.goBack()}>Go Back</button></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : 
        <div className='main-container-detail' >
          <Loading/>
        </div>
        
          
      }
    </div>
  )
}