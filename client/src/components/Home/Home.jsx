import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import DogCard from '../DogCard/DogCard';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import 
{
  getAllDogs, GetAndShowAllDogs, MoveForward, MoveBachward
}  
from '../../redux/actions';


export default function Home(){


  const dispatch = useDispatch();
  let  ShowDogs = useSelector(state => state.ShowDogs);
  let  Current = useSelector(state => state.Current);
  
  useEffect( ()=>{
    dispatch(getAllDogs())
  },[])


  return (
    <div className="app-container-img" >

      <div className="app-container-back" >

        <NavBar/>
        <div className='main-container' >

          <div className='container-buttons' >
            <button >Filter By</button>
            <button>Oder By</button>
          </div>

          <div className='container-dogs' >
            {
              ShowDogs.length ?
              (
                <div className='paginado' >
                  <button onClick={() => dispatch(MoveBachward())} className='btn-buttons' >Back</button>
                  <div className='container-paginado ' >
                    <button className={Current === 1 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(1))} >1</button>
                    <button className={Current === 2 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(2))} >2</button>
                    <button className={Current === 3 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(3))} >3</button>
                    <button className={Current === 4 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(4))} >4</button>
                    <button className={Current === 5 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(5))} >5</button>
                    <button className={Current === 6 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(6))} >6</button>
                    <button className={Current === 7 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(7))} >7</button>
                    <button className={Current === 8 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(8))} >8</button>
                    <button className={Current === 9 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(9))} >9</button>
                    <button className={Current === 10 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(10))} >10</button>
                    <button className={Current === 11 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(11))} >11</button>
                    <button className={Current === 12 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(12))} >12</button>
                    <button className={Current === 13 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(13))} >13</button>
                    <button className={Current === 14 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(14))} >14</button>
                    <button className={Current === 15 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(15))} >15</button>
                    <button className={Current === 16 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(16))} >16</button>
                    <button className={Current === 17 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(17))} >17</button>
                    <button className={Current === 18 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(18))} >18</button>
                    <button className={Current === 19 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(19))} >19</button>
                    <button className={Current === 20 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(20))} >20</button>
                    <button className={Current === 21 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(21))} >21</button>
                    <button className={Current === 22 ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(22))} >22</button>
                  </div>
                  {/* <button onClick={() => dispatch(MoveForward())}  className='btn-buttons' >Ahead</button> */}
                </div>
              ): (<div></div>)
            }
            {
              ShowDogs.length ? 
              ShowDogs.map((dog) =>
                <DogCard
                  key={dog.id}
                  image={dog.image} 
                  name={dog.name}
                  weight={dog.weight.imperial}
                  temperaments={dog.temperament}
                />
              ) : <Loading/>
            }
          </div>

        </div>
      </div>
    </div>
  )
}