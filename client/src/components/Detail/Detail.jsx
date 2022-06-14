import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetDogsById } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
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
      <img src={ getDogDetail.length && getDogDetail[0].image} alt={ getDogDetail.length && getDogDetail[0].name} />
      <div>{ getDogDetail.length && getDogDetail[0].name}</div>
      <div>{ getDogDetail.length && getDogDetail[0].temperament}</div>
      <div>{ getDogDetail.length && getDogDetail[0].height.metric}</div>
      <div>{ getDogDetail.length && getDogDetail[0].weight.metric}</div>
      <div>{ getDogDetail.length && getDogDetail[0].life_span}</div>
      <Link to={'/home'} ><div>go back</div></Link>
    </div>
  )
}