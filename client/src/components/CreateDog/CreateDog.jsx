import React, { useEffect, useState } from 'react';
import { AddNewBreed, ClearAllDogs, CreateNewDog, GetAllBreeds, getAllDogs, GetAllTemperament } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreateDog.css'
import ValidationForm from './Validations';
import NavigationPanel from '../NavigationPanel/NavogationPanel';
import { Link } from 'react-router-dom';
import { FcCheckmark } from 'react-icons/fc';
import { MdCloseFullscreen } from 'react-icons/md';




export default function CreateDog() {


  const [ buttonTemp , setButtonTemp ] = useState(true);
  const [ successMessage , setSuccessMessage ] = useState(true);
  const [ buttonBreed , setButtonBreed ] = useState(true);
  const [ Errors, setErrors ] = useState([]);
  const [File, setFile ] = useState(null);
  const [DogCreated, setDogCreated] = useState({
    name: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    life_span: '',
    breed_group: '',
    temperaments: [],
    new_dog: ''
  })
  const Temperaments = useSelector((state) => state.Temperaments);
  const Breeds = useSelector((state) => state.Breeds);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(GetAllTemperament())
    dispatch(GetAllBreeds())
  },[dispatch])

  const HandleClickBtnTemp = (e) => {
    e.preventDefault();
    setButtonBreed(true)
    setButtonTemp( !buttonTemp )
  }

  const HandleClickBtnBreed = (e) => {
    e.preventDefault();
    setButtonTemp(true)
    setButtonBreed(!buttonBreed)
  }

  const HandleClickTemp = (e) => {
    e.preventDefault();
    DogCreated.temperaments.push(e.target.value)
  }

  const HandleClickBreed = (e) => {
    e.preventDefault();
    setDogCreated({
      ...DogCreated,
      breed_group: e.target.value
    })
  }

  const CreateDog = (e) => {
    e.preventDefault();
    dispatch(AddNewBreed(DogCreated.new_dog))
    setDogCreated({
      ...DogCreated,
      new_dog: ''
    })
    
  }

  const handleChange = (e) => {
    e.preventDefault();
    setDogCreated({
      ...DogCreated,
      [e.target.name]:e.target.value
      
    })
    setErrors(
      ValidationForm(
        {
        ...DogCreated,
        [e.target.name]:e.target.value
        },
        Breeds
      )
    )
  }

  const HandleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', File)

    const Dog = {
      name: DogCreated.name,
      height: `${DogCreated.min_height} - ${DogCreated.max_height}`,
      weight: `${DogCreated.min_weight} - ${DogCreated.max_weight}`,
      life_span: DogCreated.life_span,
      breed_group: DogCreated.breed_group,
      temperament: [...DogCreated.temperaments]
    }

    const NewDog = {
      DogImage: formData,
      DogInfo: Dog
    }

    dispatch(CreateNewDog(NewDog))

    document.getElementById('file').value = null;

    setDogCreated({
      name: '',
      min_height: '',
      max_height: '',
      min_weight: '',
      max_weight: '',
      life_span: '',
      breed_group: '',
      temperaments: [],
      new_dog: ''
    })
    setSuccessMessage(false)
    dispatch(ClearAllDogs())
    dispatch(getAllDogs())
  }

  const HandlerSelect = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <div className='formulario' >
      <form className='container-form' >
        <label
          htmlFor='file' 
          className='tbn_select_image' 
        >
          Choose an Image
        </label>
        <input id='file' name='file' onChange={(e)=>HandlerSelect(e)} type='file' />

        <div className='form_group' >
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='name' 
            value={DogCreated.name} 
            placeholder=' '
          />
          <label className='form_label' >Dog Name</label>
          <span className='form_line' ></span>
          {Errors.name && (
            <p className='danger' >{Errors.name}</p>
          )}
        </div>

        <div className='form_group' >
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='min_height' 
            value={DogCreated.min_height} 
            placeholder=' ' 
          />
          <label className='form_label' >Min Height</label>
          <span className='form_line' ></span>
          {Errors.min_height && (
            <p className='danger' >{Errors.min_height}</p>
          )}
        </div>

        <div className='form_group' >
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='max_height' 
            value={DogCreated.max_height} 
            placeholder=' '
          />
          <label className='form_label' >Max Height</label>
          <span className='form_line' ></span>
          {Errors.max_height && (
            <p className='danger' >{Errors.max_height}</p>
          )}
        </div>

        <div className='form_group' >
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='min_weight' 
            value={DogCreated.min_weight} 
            placeholder=' '
          />
          <label className='form_label' >Min weight</label>
          <span className='form_line' ></span>
          {Errors.min_weight && (
            <p className='danger' >{Errors.min_weight}</p>
          )}
        </div>

        <div className='form_group' >
          <input 
            className='input'
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='max_weight' 
            value={DogCreated.max_weight} 
            placeholder=' '
          />
          <label className='form_label' >Max weight</label>
          <span className='form_line' ></span>
          {Errors.max_weight && (
            <p className='danger' >{Errors.max_weight}</p>
          )}
        </div>

        <div className='form_group' >
          <input 
            className='input' 
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='life_span' 
            value={DogCreated.life_span} 
            placeholder=' '
          />
          <label className='form_label' >Life Expectancy</label>
          <span className='form_line' ></span>
          {Errors.life_span && (
            <p className='danger' >{Errors.life_span}</p>
          )}
        </div>

        <div className='form_group' >
          <input 
            className='input' 
            type="text" 
            onChange={(e)=>handleChange(e)} 
            name='new_dog' 
            value={DogCreated.new_dog} 
            placeholder=' '
          />
          {Errors.new_dog && (
            <p className='danger' >{Errors.new_dog}</p>
          )}
          <input 
            className={ !DogCreated.new_dog || Errors.new_dog ? 'Block' : 'btn_crea_dog' }
            onClick={(e) => CreateDog(e)}
            type='button' 
            value='Create ' 
          />
          <label className='form_label' >Create New Breed</label>
          <span className='form_line' ></span>
        </div>

          <input className='button_breeds' type='button' onClick={(e) => HandleClickBtnBreed(e)} value='Breeds' />
            <div className={ buttonBreed === true ? 'Block' : 'container_Breeds'} >
              {
                Breeds.map((breed, i) => 
                  <input key={i} type='button' className={ buttonBreed === true ? 'Block' : 'breeds'} onClick={(e) => HandleClickBreed(e) } value={breed} />
                )
              }
            </div>

          {/* Posibilidad de seleccionar/agregar uno o más temperamentos */}
          <input className='button_temperaments' type='button' onClick={(e) => HandleClickBtnTemp(e)} value='Temperaments'/> 
          
            <div className={ buttonTemp === true ? 'Block' : 'container_temperaments'} >
              <MdCloseFullscreen onClick={()=>setButtonTemp(true)} className='close_tbn_temperaments' />
              {
                Temperaments.map((tem, i) => 
                  <input key={i} type='button' className={ buttonTemp === true ? 'Block' : 'temperament'} onClick={(e) => HandleClickTemp(e)} value={tem.name}  />
                ) 
              }
            </div>
           

          <input
          className = {
            !DogCreated.name ||
            !DogCreated.min_height ||
            !DogCreated.max_height ||
            !DogCreated.min_weight ||
            !DogCreated.max_weight ||
            !DogCreated.life_span ||
            !DogCreated.breed_group ||
            Errors.name ||
            Errors.min_height ||
            Errors.max_height ||
            Errors.min_weight ||
            Errors.max_weight ||
            Errors.life_span ||
            Errors.breed_group ? 'Block' : 'SubmitButton'
          }
            onClick={(e) => HandleSubmit(e)} 
            type='button' 
            value='Create Dog'
          />
      </form>
      <div className={ successMessage === true ? 'Block' : 'message_success'} >
        <div className='message' >
          Dog created successfully
          <Link to='/created' >
            <button 
              onClick={()=>setSuccessMessage(true)}  
              className='btn_message_success' 
            >
              Got it
            </button>
          </Link> 
          <FcCheckmark className='check_icon' /> 
        </div>
      </div>
      <NavigationPanel/>
    </div>
  )
}