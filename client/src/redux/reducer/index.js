import 
  { 
    GET_ALL_DOGS, 
    GET_AND_SHOW_ALL_DOGS,
    MOVE_FORWARD,
    MOVE_BACKWARD,
    FILTER_BY_ALPHABETICAL_ORDER,
    CLEAR_ALL_DOGS,
    GET_DOG_BY_ID,
    FILTER_BY_WEIGTH
  } 
from '../actions';

const inisialState = {
  Current: 0,
  AllDogs: [],
  AuxDogs: [],
  ShowDogs: [],
  getDogDetail: []
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
        Current: 1,
        AllDogs: action.payload,
        AuxDogs: [...Show],
        ShowDogs: action.payload.slice(0,8) || action.payload.slice(0,action.payload.length)
      }
    case GET_DOG_BY_ID:
      return {
        ...state,
        getDogDetail: state.AllDogs.filter((dog) => dog.id === parseInt(action.payload))
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
    case FILTER_BY_ALPHABETICAL_ORDER:
      let Array = [...state.AllDogs] ;
      for (let j = 0; j <Array.length ; j++) { //you can also use "for in", so you don't need the variable "len"
   
        for (let i = 0; i <Array.length -1; i++) {
          if (Array[i].name > Array[i + 1].name) {
              let aux = Array[i];
              Array[i] = Array[i + 1];
              Array[i + 1] = aux;
          }
        }
      }
      let dogs = action.payload === 'A-Z' ? Array : Array.reverse();
      let show = [];
      while(dogs.length){
        let ArrayOfDogs = [];
        let c = 8;
        while(c > 0 && dogs.length > 0) {
          c --
          ArrayOfDogs.push(dogs.shift());
        }
        show.push(ArrayOfDogs);
      }
      return {
        ...state,
        AllDogs: state.AllDogs,
        Current: state.Current,
        AuxDogs: [...show],
        ShowDogs: [...show[state.Current - 1]]
      }
    case FILTER_BY_WEIGTH:
      let Array2 = [...state.AllDogs] ;
      for (let j = 0; j < Array2.length; j++) {
        for (let i = 0; i < Array2.length - 1; i++) {
          if(Array2[i].weight.imperial > Array2[i + 1].weight.imperial) {
            let aux = Array2[i];
            Array2[i] = Array2[i + 1];
            Array2[i + 1] = aux
          }
        }
      }

      let DogsSort = action.payload === 'Des' ? Array2 : Array2.reverse();
      let ShowSort = [];
      while(DogsSort.length){
        let ArrayOfDogs = [];
        let c = 8;
        while(c > 0 && DogsSort.length > 0) {
          c --
          ArrayOfDogs.push(DogsSort.shift());
        }
        ShowSort.push(ArrayOfDogs);
      }
      return {
        ...state,
        AllDogs: state.AllDogs,
        Current: state.Current,
        AuxDogs: [...ShowSort],
        ShowDogs: [...ShowSort[state.Current - 1]]
      }
    case CLEAR_ALL_DOGS:
      return {
        ...state,
        ShowDogs: [],
        AllDogs: []
      }
    default:
      return state;
      
  }
}