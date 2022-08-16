import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../Images/backbround_img.jpeg'
import img2 from '../../Images/background_img2.jpg'
import img3 from '../../Images/background-img-phone.jpg'
import img4 from '../../Images/img_background_phone.png'
import { MdArrowForwardIos } from 'react-icons/md';
import { MdArrowBackIosNew } from 'react-icons/md';
import './LandingPage.css';

export default function LandingPage(){

  const [ changeImg, setChangeImg ] = useState(true);
  const [ changeImgPhone, setChangeImgPhone ] = useState(true);

  const HandleClick = () => {
    setChangeImg(!changeImg)
    setChangeImgPhone(!changeImgPhone)
  }

  return (
    <div className='landin-image' >
      <div className='landing-main' >
        <img className={ changeImg ? 'Landing_Images_Computers' : 'block_img_landing'} src={img} alt='Dog_image' />
        <img className={ !changeImg ? 'Landing_Images_Computers' : 'block_img_landing'} src={img2} alt='Dog_image' />
        <img className={ changeImgPhone ? 'Landing_Images_Phone' : 'block_img_landing'} src={img3} alt='Dog_image' />
        <img className={ !changeImgPhone ? 'Landing_Images_Phone' : 'block_img_landing'} src={img4} alt='Dog_image' />
        <h1 className='wellcome_messsage' >WELCOME  EVERYONE</h1>
        <span className='landing-button' ><Link to={'/home'}><span>Lets go</span></Link></span>
        <MdArrowBackIosNew 
          onClick={()=>HandleClick()}
          className='Arrows Arrows_left' />
        <MdArrowForwardIos 
          onClick={()=>HandleClick()}
          className='Arrows Arrows_right' />
      </div>
    </div>

  )
}