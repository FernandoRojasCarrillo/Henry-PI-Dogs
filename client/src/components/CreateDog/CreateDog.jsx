import React, { useState } from 'react';
import { CreateNewDog, GetAllTemperament } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreateDog.css'


export default function CreateDog() {

  const [DogCreated, setDogCreated] = useState({
    image: null,
    name: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    life_span: '',
    breed_group: '',
    temperaments: []
  })
  const Temperaments = useSelector((state) => state.Temperaments);
  const dispatch = useDispatch();

  const HandleClick = (e) => {
    e.preventDefault();
    dispatch(GetAllTemperament())
  }

  const HandleClickTemp = (e) => {
    e.preventDefault();
    DogCreated.temperaments.push(e.target.value)
  }

  const handleChange = (e) => {
    e.preventDefault();
    setDogCreated({
      ...DogCreated,
      [e.target.name]:e.target.value
    })
    console.log(DogCreated)
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    const Dog = {
      image: 'Url',
      name: DogCreated.name,
      height: `${DogCreated.min_height} - ${DogCreated.max_height}`,
      weight: `${DogCreated.min_weight} - ${DogCreated.max_weight}`,
      life_span: DogCreated.life_span,
      breed_group: DogCreated.breed_group,
      temperament: [...DogCreated.temperaments]
    }
    dispatch(CreateNewDog(Dog))
    console.log(Dog)
  }

  return (
    <div className='formulario' >
      <form>
          <span className='title' >Name</span>
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='name' 
            value={DogCreated.name} 
            placeholder='Dog Name'
          />
          <span className='title' >Min Height</span>
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='min_height' 
            value={DogCreated.min_height} 
            placeholder='Min Height' 
          />
          <span className='title' >Max Height</span>
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='max_height' 
            value={DogCreated.max_height} 
            placeholder='Max Height'
          />
          <span className='title' >Min Weight</span>
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='min_weight' 
            value={DogCreated.min_weight} 
            placeholder='Min Weight'
          />
          <span className='title' >Max Weight</span>
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='max_weight' 
            value={DogCreated.max_weight} 
            placeholder='Max Weight'
          />
          <span className='title' >Life Span</span>
          <input 
            className='input' 
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='life_span' 
            value={DogCreated.life_span} 
            placeholder='Life Span'
          />
          <span className='title' >Breed</span>
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='breed_group' 
            value={DogCreated.breed_group} 
            placeholder='Breed'
          />
          {/* Posibilidad de seleccionar/agregar uno o más temperamentos */}
          <input type='button' onClick={(e) => HandleClick(e)} value='Temperaments'/> 
          {
            Temperaments.length ? Temperaments.map((tem) => 
              <input onClick={(e) => HandleClickTemp(e)} type='button' value={tem.name} />
            ) : <div></div>
          }
         {/* Botón/Opción para crear una nueva raza de perro */}
         <input onClick={(e) => HandleSubmit(e)} type='button' value='Submit'/>
      </form>
    </div>
  )
}