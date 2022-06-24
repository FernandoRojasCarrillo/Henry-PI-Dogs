import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
  return (
    <div className='landin-image' >
          <div className='landing-main' >
            <div className='containe_landing' >
              <span>
                Wellcome
              </span>
              <span>
              Here you can find many kinds of dogs
              </span>
              <div className='landing-main-button' >
                <span className='landing-button' ><Link to={'/home'}><span>Lets go</span></Link></span>
              </div>
            </div>
          </div>
    </div>

  )
}