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
  ShowDogs: [],
  getDogDetail: {}
}

export default function Reducer(state=inisialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return{
        ...state,
        AllDogs: action.payload,
        ShowDogs: action.payload.slice(0,8)
      }
    case GET_AND_SHOW_ALL_DOGS:
      return {
        ...state,
        Current: action.payload,
        ShowDogs: action.payload === 1 ? state.AllDogs.slice(0,8) :  
        action.payload === 2 ? state.AllDogs.slice(8,16) :
        action.payload === 3 ? state.AllDogs.slice(16,24) :
        action.payload === 4 ? state.AllDogs.slice(24,32) :
        action.payload === 5 ? state.AllDogs.slice(32,40) :
        action.payload === 6 ? state.AllDogs.slice(40,48) :
        action.payload === 7 ? state.AllDogs.slice(48,56) :
        action.payload === 8 ? state.AllDogs.slice(56,64) :
        action.payload === 9 ? state.AllDogs.slice(64,72) :
        action.payload === 10 ? state.AllDogs.slice(72,80) :
        action.payload === 11 ? state.AllDogs.slice(80,88) :
        action.payload === 12 ? state.AllDogs.slice(88,96) :
        action.payload === 13 ? state.AllDogs.slice(96,104) :
        action.payload === 14 ? state.AllDogs.slice(104,112) :
        action.payload === 15 ? state.AllDogs.slice(112,120) :
        action.payload === 16 ? state.AllDogs.slice(120,128) :
        action.payload === 17 ? state.AllDogs.slice(128,136) :
        action.payload === 18 ? state.AllDogs.slice(136,144) :
        action.payload === 19 ? state.AllDogs.slice(144,152) :
        action.payload === 20 ? state.AllDogs.slice(152,160) :
        action.payload === 21 ? state.AllDogs.slice(160,168) :
        action.payload === 22 ? state.AllDogs.slice(168, state.AllDogs.length) : []
      }
    case MOVE_FORWARD:
      return{
        ...state,
        ShowDogs: state.Current === 1 ? state.AllDogs.slice(8,16) :  
        state.Current === 2 ? state.AllDogs.slice(16,24) :
        state.Current === 3 ? state.AllDogs.slice(24,32) :
        state.Current === 4 ? state.AllDogs.slice(32,40) :
        state.Current === 5 ? state.AllDogs.slice(40,48) :
        state.Current === 6 ? state.AllDogs.slice(48,56) :
        state.Current === 7 ? state.AllDogs.slice(56,64) :
        state.Current === 8 ? state.AllDogs.slice(64,72) :
        state.Current === 9 ? state.AllDogs.slice(72,80) :
        state.Current === 10 ? state.AllDogs.slice(80,88) :
        state.Current === 11 ? state.AllDogs.slice(88,96) :
        state.Current === 12 ? state.AllDogs.slice(96,104) :
        state.Current === 13 ? state.AllDogs.slice(104,112) :
        state.Current === 14 ? state.AllDogs.slice(112,120) :
        state.Current === 15 ? state.AllDogs.slice(120,128) :
        state.Current === 16 ? state.AllDogs.slice(128,136) :
        state.Current === 17 ? state.AllDogs.slice(136,144) :
        state.Current === 18 ? state.AllDogs.slice(144,152) :
        state.Current === 19 ? state.AllDogs.slice(152,160) :
        state.Current === 20 ? state.AllDogs.slice(160,168) :
        state.Current === 21 ? state.AllDogs.slice(168, state.AllDogs.length) :
        state.Current === 22 ? state.AllDogs.slice(0,8) : [],
        Current: state.Current === 22 ? 1 : state.Current + 1
      }
    case MOVE_BACKWARD:
      return{
        ...state,
        ShowDogs: state.Current === 1 ? state.AllDogs.slice(168, state.AllDogs.length) :  
        state.Current === 2 ? state.AllDogs.slice(0,8) :
        state.Current === 3 ? state.AllDogs.slice(8,16) :
        state.Current === 4 ? state.AllDogs.slice(16,24) :
        state.Current === 5 ? state.AllDogs.slice(24,32) :
        state.Current === 6 ? state.AllDogs.slice(32,40) :
        state.Current === 7 ? state.AllDogs.slice(40,48) :
        state.Current === 8 ? state.AllDogs.slice(48,56) :
        state.Current === 9 ? state.AllDogs.slice(56,64) :
        state.Current === 10 ? state.AllDogs.slice(64,72) :
        state.Current === 11 ? state.AllDogs.slice(72,80) :
        state.Current === 12 ? state.AllDogs.slice(80,88) :
        state.Current === 13 ? state.AllDogs.slice(88,96) :
        state.Current === 14 ? state.AllDogs.slice(96,104) :
        state.Current === 15 ? state.AllDogs.slice(104,112) :
        state.Current === 16 ? state.AllDogs.slice(112,120) :
        state.Current === 17 ? state.AllDogs.slice(120,128) :
        state.Current === 18 ? state.AllDogs.slice(128,136) :
        state.Current === 19 ? state.AllDogs.slice(136,144) :
        state.Current === 20 ? state.AllDogs.slice(144,152) :
        state.Current === 21 ? state.AllDogs.slice(152,160) :
        state.Current === 22 ? state.AllDogs.slice(160,168) : [],
        Current: state.Current === 1 ? 22 : state.Current - 1
      }
    default:
      return state;
      
  }
}