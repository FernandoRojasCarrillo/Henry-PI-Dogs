import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { FilterByAlphabeticalOder, FilterByWeigth, FilterByBreed } from '../../redux/actions';
import './FilterComponent.css';

export default function FilterComponent() {

  const [ FilterMenu, setFilterMenu ] = useState(true)
  const [ OrderByName, setOrderByName ] = useState(true)
  const [ OrderByWeight, setOrderByWeight ] = useState(true)
  const [ filterByBreed, setFilterByBreed ] = useState(true)
  const  Breeds = useSelector(state => state.Breeds);
  const dispatch = useDispatch();

  const HandleOrder = (value) => {
    if(value === 'A-Z' || value === 'Z-A') {
      dispatch(FilterByAlphabeticalOder(value))
    } else {
      dispatch(FilterByWeigth(value))
    }
    setFilterMenu(true)
    setOrderByWeight(true);
    setOrderByName(true);
    setFilterByBreed(true);
  }

  const HandleFilters = (value) => {
    dispatch(FilterByBreed(value))
    setFilterMenu(true)
    setOrderByWeight(true);
    setOrderByName(true);
    setFilterByBreed(true);
  }

  const HandleSetOrderByName = () => {
    setOrderByName(!OrderByName);
    setOrderByWeight(true);
    setFilterByBreed(true);
  }

  const HandleSetOrderByWeight = () => {
    setOrderByWeight(!OrderByWeight);
    setOrderByName(true);
    setFilterByBreed(true);
  }

  const HandleSetFilterByBreed = () => {
    setFilterByBreed(!filterByBreed);
    setOrderByWeight(true);
    setOrderByName(true);
  }

  const CloseLeftMenu = () => {
    setFilterMenu(true)
    setFilterByBreed(true);
    setOrderByWeight(true);
    setOrderByName(true);
  }

  return (
    <>
    {
      FilterMenu ?
        <div className='CONT_FILTER_BTN' >
          <label 
            onClick={()=>setFilterMenu(false)}
            style={{
              color: 'rgb(255 255 255 / 80%',
              position: 'fixed',
              top: '15px',
              left: '120px',
              fontSize: '20px',
              cursor: 'position'
            }}
          >
            Filters
          </label>
        </div>
      : <div></div>
    }
      <div className={ FilterMenu ? "block_container_BackGround_color" : "BackGround_color"} >
        <div className={ FilterMenu ? 'block_container_filters' : 'Container_filter_component'} >
          <div className={ FilterMenu ? 'block_text' : 'Father_container'} >
            <div onClick={()=>HandleSetOrderByName()} className='Name_Btn' >
              Order By Name
            </div>
            {
              !OrderByName &&
              <div className={ FilterMenu ? 'block_text' : 'Child_container'} >
                <div onClick={()=>HandleOrder('A-Z')} className='B_T_N' >A - Z</div>
                <div onClick={()=>HandleOrder('Z-A')} className='B_T_N' >Z - A</div>
              </div>
            }
          </div>

          <div className={ FilterMenu ? 'block_text' : 'Father_container'} >
            <div onClick={()=>HandleSetOrderByWeight()} className='Name_Btn' >
              Order By Weight
            </div>
            {
              !OrderByWeight &&
              <div className={ FilterMenu ? 'block_text' : 'Child_container'} >
                <div onClick={()=>HandleOrder('Des')} className='B_T_N' >Des</div>
                <div onClick={()=>HandleOrder('Asc')} className='B_T_N' >Asc</div>
              </div>
            }
          </div>

          <div className={ FilterMenu ? 'block_text' : 'Father_container'} >
            <div onClick={()=>HandleSetFilterByBreed()} className='Name_Btn' >
              Filter By Breed
            </div>
            {
              !filterByBreed &&
              <div className={ FilterMenu ? 'block_text' : 'Child_container'} >
                {
                  Breeds.length && Breeds.map((breed, i) => (
                    <div key={i} onClick={()=>HandleFilters(breed)} className='B_T_N' >{breed}</div>
                  ))
                }
              </div>
            }
          </div>
          <IoCloseSharp 
            onClick={()=>CloseLeftMenu()}
            style={{
              height: '40px',
              width: '40px',
              position: 'absolute',
              top: '0',
              right: '0',
              cursor: 'position'
            }} 
          />
        </div>
      </div>
    
    </>
  )
}