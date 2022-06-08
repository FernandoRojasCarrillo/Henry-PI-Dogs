import { GET_DOGS } from '../actions';

const inisialState = {
  allDogs: []
}

export default function Reducer(state=inisialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return{
        ...state,
        allDogs: action.payload
      }
    default:
      return {
        state
      }
  }
}