import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const GET_AND_SHOW_ALL_DOGS = 'GET_AND_SHOW_ALL_DOGS';
export const MOVE_FORWARD = 'MOVE_FORWARD';
export const MOVE_BACKWARD = 'MOVE_BACKWARD';
export const FILTER_BY_ALPHABETICAL_ORDER = 'FILTER_BY_ALPHABETICAL_ORDER';
export const CLEAR_ALL_DOGS = 'CLEAR_ALL_DOGS';
export const FILTER_BY_WEIGTH = 'FILTER_BY_WEIGTH';
export const GET_ALL_TEMPERAMENT = 'GET_ALL_TEMPERAMENT';
export const GET_ALL_BREEDS = 'GET_ALL_BREEDS';
export const FILTER_BY_BREED = 'FILTER_BY_BREED';
export const DOG_CREATED = 'DOG_CREATED';
export const ADD_NEW_BREED = 'ADD_NEW_BREED';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_TO_FAVORITES = 'REMOVE_TO_FAVORITES';

export function getAllDogs () {
  return function (dispatch) {
    axios('http://localhost:3000/dogs')
    .then((response) => {

        return dispatch({
          type: GET_ALL_DOGS,
          payload: response.data
        })
    })
    .catch(err => console.log(err));
  }
}

export function CreateNewDog (dog) {
  return function (dispatch) {
    axios.post('http://localhost:3000/dogs', dog )
    .then((response) => {
      return dispatch({
        type: DOG_CREATED,
      })
    })
    .catch(err => console.log(err));
  }
}

export function SearchByName(name) {
  return async function (dispatch) {
      try {
      const { data } = await axios(`http://localHost:3000/dogs?name=${name}`)
      if(data) {
        return dispatch({
          type: GET_ALL_DOGS,
          payload: data  
        })
      }
    }catch (error) {
      console.log(error);
      return {
        type: GET_ALL_DOGS,
        payload: {mesage: 'error'}
      }
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

export function FilterByWeigth(value) {
  return {
    type: FILTER_BY_WEIGTH,
    payload: value
  }
}

export function GetAllTemperament(){
  return function (dispatch) {
    axios('http://localhost:3000/temperaments')
    .then(response => {
      return dispatch ({
        type: GET_ALL_TEMPERAMENT,
        payload: response.data
      })
    })
  }
}

export function GetAllBreeds() {
  return async function (dispatch) {
    const { data } = await axios.get('http://localhost:3000/dogs')
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

export function AddToFavorites(dog) {
  return {
    type: ADD_TO_FAVORITES,
    payload: dog
  }
}

export function RemoveToFavorites(id) {
  return {
    type: REMOVE_TO_FAVORITES,
    payload: id
  }
}


// export function getAllDogsTwo() {
//   return {
//     type: GET_ALL_DOGS_TWO
//   }
// }

// export function getAllDogsThree() {
//   return {
//     type: GET_ALL_DOGS_THREE
//   }
// }

// export function getAllDogsFour() {
//   return {
//     type: GET_ALL_DOGS_FOUR
//   }
// }

// export function getAllDogsFive() {
//   return {
//     type: GET_ALL_DOGS_FIVE
//   }
// }

// export function getAllDogsSix() {
//   return {
//     type: GET_ALL_DOGS_SIX
//   }
// }

// export function getAllDogsSeven() {
//   return {
//     type: GET_ALL_DOGS_SEVEN
//   }
// }

// export function getAllDogsEight(){
//   return {
//     type: GET_ALL_DOGS_EIGHT
//   }
// }

// export function getAllDogsNine(){
//   return {
//     type: GET_ALL_DOGS_NINE
//   }
// }

// export function getAllDogsTen(){
//   return {
//     type: GET_ALL_DOGS_TEN
//   }
// }

// export function getAllDogsEleven(){
//   return {
//     type: GET_ALL_DOGS_ELEVEN
//   }
// }

// export function getAllDogsTwelve(){
//   return {
//     type: GET_ALL_DOGS_TWELVE
//   }
// }

// export function getAllDogsThirteen(){
//   return {
//     type: GET_ALL_DOGS_THIRTEEN
//   }
// }

// export function getAllDogsFourteen(){
//   return {
//     type: GET_ALL_DOGS_FOURTEEN
//   }
// }

// export function getAllDogsFifteen(){
//   return {
//     type: GET_ALL_DOGS_FIFTEEN
//   }
// }

// export function getAllDogsSixteen(){
//   return {
//     type: GET_ALL_DOGS_SIXTEEN
//   }
// }

// export function getAllDogsSeventeen(){
//   return {
//     type: GET_ALL_DOGS_SEVENTEEN
//   }
// }

// export function getAllDogsEighteen(){
//   return {
//     type: GET_ALL_DOGS_EIGHTEEN
//   }
// }

// export function getAllDogsNineteen(){
//   return {
//     type: GET_ALL_DOGS_NINETEEN
//   }
// }

// export function getAllDogsTwenty(){
//   return {
//     type: GET_ALL_DOGS_TWENTY
//   }
// }

// export function getAllDogsTwentyOne(){
//   return {
//     type: GET_ALL_DOGS_TWENTY_ONE
//   }
// }

// export function getAllDogsTwentyTwo(){
//   return {
//     type: GET_ALL_DOGS_TWENTY_TWO
//   }
// }

