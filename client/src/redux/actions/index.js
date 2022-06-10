import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';

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