import { GET_ALL_DOGS } from '../actions';

const inisialState = {
  AllDogs: [],
  getDogDetail: {}
}

export default function Reducer(state=inisialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return{
        ...state,
        AllDogs: action.payload
      }
    default:
      return state;
      
  }
}