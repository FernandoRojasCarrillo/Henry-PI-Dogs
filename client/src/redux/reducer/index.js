import 
  { 
    GET_ALL_DOGS, 
    GET_AND_SHOW_ALL_DOGS,
    MOVE_FORWARD,
    MOVE_BACKWARD
  } 
from '../actions';

const inisialState = {
  Current: 1,
  AllDogs: [],
  AuxDogs: [],
  ShowDogs: [],
  getDogDetail: {}
}

export default function Reducer(state=inisialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      let Dogs = [...action.payload];
      let Show = [];
      while(Dogs.length){
        let ArrayOfDogs = [];
        let c = 8;
        while(c > 0 && Dogs.length > 0) {
          c --
          ArrayOfDogs.push(Dogs.shift());
        }
        Show.push(ArrayOfDogs);
      }
      return{
        ...state,
        AllDogs: action.payload,
        AuxDogs: [...Show],
        ShowDogs: action.payload.slice(0,8) || action.payload.slice(0,action.payload.length)
      }
    case GET_AND_SHOW_ALL_DOGS:
      return {
        ...state,
        ShowDogs: [...state.AuxDogs[action.payload - 1]] ,
        Current: action.payload
      }
    case MOVE_FORWARD:
      return{
        ...state,
        ShowDogs: state.Current === Math.ceil(state.AllDogs.length/8) ? [...state.AuxDogs[0]] : [...state.AuxDogs[state.Current]] ,
        Current: state.Current === Math.ceil(state.AllDogs.length/8) ? 1 : state.Current + 1
      }
        
    case MOVE_BACKWARD:
      // let End = Math.ceil(state.AllDogs.length / 8)
      return{
        ...state,
        ShowDogs: state.Current === 1 ? [...state.AuxDogs[Math.ceil(state.AllDogs.length/8 - 1)]] : [...state.AuxDogs[state.Current - 2]],
        Current: state.Current === 1 ? Math.ceil(state.AllDogs.length/8)  : state.Current - 1
      }
    default:
      return state;
      
  }
}