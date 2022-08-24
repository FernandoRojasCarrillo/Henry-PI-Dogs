import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_DOGS_FROM_DB = 'GET_ALL_DOGS_FROM_DB';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const GET_AND_SHOW_ALL_DOGS = 'GET_AND_SHOW_ALL_DOGS';
export const MOVE_FORWARD = 'MOVE_FORWARD';
export const MOVE_BACKWARD = 'MOVE_BACKWARD';
export const FILTER_BY_ALPHABETICAL_ORDER = 'FILTER_BY_ALPHABETICAL_ORDER';
export const CLEAR_ALL_DOGS = 'CLEAR_ALL_DOGS';
export const CLEAR_DOG_DETAIL = 'CLEAR_DOG_DETAIL';
export const FILTER_BY_WEIGTH = 'FILTER_BY_WEIGTH';
export const GET_ALL_TEMPERAMENT = 'GET_ALL_TEMPERAMENT';
export const GET_ALL_BREEDS = 'GET_ALL_BREEDS';
export const FILTER_BY_BREED = 'FILTER_BY_BREED';
export const ADD_NEW_BREED = 'ADD_NEW_BREED';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_TO_FAVORITES = 'REMOVE_TO_FAVORITES';
export const GO_AHEAD_DETAIL = 'GO_AHEAD_DETAIL';
export const GO_BEGIND_DETAIL = 'GO_BEGIND_DETAIL';
export const DELETE_DOG = 'DELETE_DOG';
export const GET_FAVORITES = 'GET_FAVORITES';
export const GET_CARRUSEL_DOGS = 'GET_CARRUSEL_DOGS';
export const CHANGE_CHAT_BOT = 'CHANGE_CHAT_BOT';

const API_URL = 'https://api-dogs-backend.herokuapp.com';
// const API_URL = 'http://localhost:3001';

export function getAllDogs () {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_URL}/dogs`)
      return dispatch({
        type: GET_ALL_DOGS,
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getAllDogsFromDB () {
  return async function (dispatch) {
    const { data } = await axios.get(`${API_URL}/dogsFromDB`)
    return dispatch({
      type: GET_ALL_DOGS_FROM_DB,
      payload: data
    })
  }
}

export function CreateNewDog (NewDog) {
  return async function (dispatch) {

    const { data } = await axios.post(`${API_URL}/Image`,NewDog.DogImage)

    const newDog = {
      image: data,
      name: NewDog.DogInfo.name,
      height: NewDog.DogInfo.height,
      weight: NewDog.DogInfo.weight,
      life_span: NewDog.DogInfo.life_span,
      breed_group: NewDog.DogInfo.breed_group,
      temperament: NewDog.DogInfo.temperament
    }

    return await axios.post(`${API_URL}/dogs`, newDog );
  }
}

export function SearchByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_URL}/dogs?name=${name}`)
      return dispatch({
        type: GET_ALL_DOGS,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
  
}

export function GetDogsById(id) {
  return {
    type:GET_DOG_BY_ID,
    payload: id
  }
}

export function GetAndShowAllDogs(num) {
  return {
    type: GET_AND_SHOW_ALL_DOGS,
    payload: num
  }
}

export function MoveForward() {
  return {
    type: MOVE_FORWARD
  }
}

export function MoveBachward() {
  return {
    type: MOVE_BACKWARD
  }
}

export function FilterByAlphabeticalOder(value) {
  return {
    type: FILTER_BY_ALPHABETICAL_ORDER,
    payload: value
  }
}

export function ClearAllDogs() {
  return {
    type: CLEAR_ALL_DOGS
  }
}

export function ClearDogDetail() {
  return {
    type: CLEAR_DOG_DETAIL
  }
}

export function FilterByWeigth(value) {
  return {
    type: FILTER_BY_WEIGTH,
    payload: value
  }
}

export function GetAllTemperament(){
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_URL}/temperaments`)
      return dispatch ({
        type: GET_ALL_TEMPERAMENT,
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function GetAllBreeds() {
  return async function (dispatch) {
    const { data } = await axios.get(`${API_URL}/dogs`)
    return dispatch ({
      type: GET_ALL_BREEDS,
      payload: data
    })
  
  }
}

export function FilterByTemperament(temp) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temp
  }
}

export function AddNewBreed(breed) {
  return {
    type: ADD_NEW_BREED,
    payload: breed
  }
}

export function FilterByBreed(val) {
  return {
    type: FILTER_BY_BREED,
    payload: val
  }
}
export function AddToFavorites(dog, val) {
  return async function(dispatch) {
    try {
      await axios.put(`${API_URL}/favorites/${dog.id}`, {value: val})
      return dispatch({
        type: ADD_TO_FAVORITES,
        payload: dog
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function RemoveToFavorites(id, val ) {
  return async function(dispatch) {
    try {
      axios.put(`${API_URL}/favorites/${id}`, {value: val})
    } catch (error) {
      console.log(error);
    }
    return dispatch({
      type: REMOVE_TO_FAVORITES,
      payload: id
    })
  }
}

export function GoAheadDetail(id) {
  return {
    type: GO_AHEAD_DETAIL,
    payload: id
  }
}

export function GoBehindDetail(id) {
  return {
    type: GO_BEGIND_DETAIL,
    payload: id
  }
}

export function GetFavotrites(id) {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`${API_URL}/favorites`)
      return dispatch({
        type: GET_FAVORITES,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function GetCarruselDogs() {
  return {
    type: GET_CARRUSEL_DOGS,
  }
}

export function DeleteDog(id_dog, image) {
  return async function (dispatch) {
    try {
      if(image) {
        try {
          const public_id = image?.split('/')[7].split('.')[0]
          axios.delete(`${API_URL}/Image?public_id=${public_id}`)
        } catch (error) {
          console.log(error);
        }
      }
      
      axios.delete(`${API_URL}/dogs/${id_dog}`)
    } catch (error) {
      console.log(error);
    }
    return dispatch({
      type: DELETE_DOG,
      payload: id_dog
    })
  }
}


export function ChangeChatBot() {
  return {
    type: CHANGE_CHAT_BOT,
  }
}


