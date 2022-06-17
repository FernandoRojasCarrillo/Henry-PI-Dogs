import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const GET_AND_SHOW_ALL_DOGS = 'GET_AND_SHOW_ALL_DOGS';
export const MOVE_FORWARD = 'MOVE_FORWARD';
export const MOVE_BACKWARD = 'MOVE_BACKWARD';
export const FILTER_BY_ALPHABETICAL_ORDER = 'FILTER_BY_ALPHABETICAL_ORDER';
export const CLEAR_ALL_DOGS = 'CLEAR_ALL_DOGS';
export const FILTER_BY_WEIGTH = 'FILTER_BY_WEIGTH';

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

export function SearchByName(name) {
  return function (dispatch) {
    axios(`http://localHost:3000/dogs?name=${name}`)
    .then((response) => {
      return dispatch({
        type: GET_ALL_DOGS,
        payload: response.data
      })
    })
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

export function FilterByWeigth() {
  return {
    type: FILTER_BY_WEIGTH
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

