import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
  return (
    <div className='landin-image' >
          <div className='landing-main' >
            <ul>
              {/* <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit ullam aspernatur ipsa adipisci quisquam fugiat asperiores a minima! Atque eos voluptatem cumque quibusdam corrupti nihil, vel voluptates obcaecati reprehenderit quae?
                Dolor eveniet natus deleniti quis! Aliquam excepturi ipsam amet molestias impedit non fugit soluta id, optio natus nulla veritatis! Dolores ea odio nesciunt eaque quibusdam sapiente explicabo beatae tempora excepturi.
              </li> */}
              <li className='landing-main-button' >
                <span className='landing-button' ><Link to={'/home'}><span>Ingresar</span></Link></span>
              </li>
            </ul>
          </div>
    </div>

  )
}