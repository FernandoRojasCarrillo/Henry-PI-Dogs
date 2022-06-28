import React, { useEffect, useState } from 'react';
import { AddNewBreed, ClearAllDogs, CreateNewDog, GetAllBreeds, getAllDogs, GetAllTemperament } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreateDog.css'
import ValidationForm from './Validations';
import NavigationPanel from '../NavigationPanel/NavogationPanel';


export default function CreateDog() {


  const [ buttonTemp , setButtonTemp ] = useState(true);
  const [ successMessage , setSuccessMessage ] = useState(true);
  const [ containerImg , setContainerImg ] = useState(true);
  const [ buttonBreed , setButtonBreed ] = useState(true);
  const [ Errors, setErrors ] = useState([]);
  const [DogCreated, setDogCreated] = useState({
    image: null,
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
  },[])

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
    console.log(DogCreated)
  }

  const SelectImage = (e) => {
    e.preventDefault()
    setDogCreated({
      ...DogCreated,
      image: e.target.name
    })
    setContainerImg(true)
  }

  const ShowImage = (e) => {
    e.preventDefault()
    setContainerImg(false)
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    const Dog = {
      image: DogCreated.image ? DogCreated.image : null ,
      name: DogCreated.name,
      height: `${DogCreated.min_height} - ${DogCreated.max_height}`,
      weight: `${DogCreated.min_weight} - ${DogCreated.max_weight}`,
      life_span: DogCreated.life_span,
      breed_group: DogCreated.breed_group,
      temperament: [...DogCreated.temperaments]
    }
    dispatch(CreateNewDog(Dog))
    setDogCreated({
      image: null,
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

  return (
    <div className='formulario' >
      <form className='container-form' >
        <button 
          onClick={(e)=> ShowImage(e)}
          className='tbn_select_image' 
        >
          Select image
        </button>

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
                Breeds.map((breed) => 
                  <input type='button' className={ buttonBreed === true ? 'Block' : 'breeds'} onClick={(e) => HandleClickBreed(e) } value={breed} />
                )
              }
            </div>

          {/* Posibilidad de seleccionar/agregar uno o más temperamentos */}
          <input className='button_temperaments' type='button' onClick={(e) => HandleClickBtnTemp(e)} value='Temperaments'/> 
          
            <div className={ buttonTemp === true ? 'Block' : 'container_temperaments'} >
              {
                Temperaments.map((tem) => 
                  <input type='button' className={ buttonTemp === true ? 'Block' : 'temperament'} onClick={(e) => HandleClickTemp(e)} value={tem.name}  />
                ) 
              }
            </div>
           
         {/* Botón/Opción para crear una nueva raza de perro */}

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
            onClick={(e) => 
            HandleSubmit(e)} 
            type='button' 
            value='Create Dog'
          />
      </form>
      <div className={ successMessage === true ? 'Block' : 'message_success'} >
        <div className='message' >
          Dog created successfully
          <button onClick={()=>setSuccessMessage(true)}  className='btn_message_success' >X</button>
        </div>
      </div>
      <div className={ containerImg === true ? 'Block' : 'container_images'} >
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/dW5UucTIW.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/dW5UucTIW.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/BJT0Jx5Nm.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/BJT0Jx5Nm.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/SJJxjecEX.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/SJJxjecEX.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/Sk4DXl54m.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/Sk4DXl54m.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/HJ7Pzg5EQ.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/HJ7Pzg5EQ.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/SkJj7e547.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/SkJj7e547.jpg' 
            value='Select' />
        </div>
        <div className='container_img_btn' >
          <img className='img_selected' src='https://cdn2.thedogapi.com/images/rkXiGl9V7.jpg' />
          <input 
            className='btn_select_img'
            onClick={(e)=>SelectImage(e)}
            type='button' 
            name='https://cdn2.thedogapi.com/images/rkXiGl9V7.jpg' 
            value='Select' />
        </div>

      </div>
      <NavigationPanel/>
    </div>
  )
}