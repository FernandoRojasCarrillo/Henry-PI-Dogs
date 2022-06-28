import 
  { 
    GET_ALL_DOGS, 
    GET_AND_SHOW_ALL_DOGS,
    MOVE_FORWARD,
    MOVE_BACKWARD,
    FILTER_BY_ALPHABETICAL_ORDER,
    CLEAR_ALL_DOGS,
    GET_DOG_BY_ID,
    FILTER_BY_WEIGTH,
    GET_ALL_TEMPERAMENT,
    FILTER_BY_BREED,
    FILTER_BY_TEMPERAMENT,
    DOG_CREATED,
    GET_ALL_BREEDS,
    ADD_NEW_BREED,
    CHANGE_LOADING,
    ADD_TO_FAVORITES,
    REMOVE_TO_FAVORITES,
    CLEAR_DOG_DETAIL
  } 
from '../actions';

const inisialState = {
  Current: 0,
  AllDogs: [],
  Favorites: [],
  BackupDogs: [],
  AuxDogs: [],
  ShowDogs: [],
  getDogDetail: [],
  Temperaments: [],
  Breeds: []
}

export default function Reducer(state=inisialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      let Dogs = action.payload[0].name !== 'error' ? [...action.payload] : []
      console.log(Dogs);
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
        AllDogs: action.payload[0].name === 'error' ? action.payload : [...action.payload] ,
        BackupDogs: action.payload.length > state.BackupDogs.length ? [...action.payload] : state.BackupDogs ,
        AuxDogs: Show.length ? [...Show] : [],
        ShowDogs: Show.length ? [...Show[0]] : action.payload , 
      }
    case GET_DOG_BY_ID:
      return {
        ...state,
        getDogDetail: state.AllDogs.filter((dog) => dog.id.toString() === action.payload.toString() )
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
      let cambio = true
      while(cambio === true) {
        cambio = false
        for (let i = 0; i < Array2.length - 1; i++) {
          if(Array2[i].weight > Array2[i + 1].weight) {
            let aux = Array2[i];
            Array2[i] = Array2[i + 1];
            Array2[i + 1] = aux
            cambio = true;
          }
        }
      }

      let DogsSort = action.payload === 'Asc' ? Array2 : Array2.reverse();
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
    case CLEAR_DOG_DETAIL:
      return {
        ...state,
        getDogDetail: []
      }
    case GET_ALL_TEMPERAMENT:
      return {
        ...state,
        Temperaments: action.payload
      }
    case GET_ALL_BREEDS:

      let breeds = [] ;
      for (let i = 0; i < action.payload.length; i++) {
        
        if(!action.payload[i].breed || action.payload[i].breed === ""){
          continue;
        }
        breeds.push(action.payload[i].breed);
      }
      
      let set = new Set(breeds);
      let AllBreeds = [...set];

      return {
        ...state,
        Breeds: AllBreeds
      }
    case FILTER_BY_BREED :
      const DogsFilter = []
      const allDogs = [];
      state.BackupDogs.map((dog) => {
        if(dog.breed === action.payload) {
          DogsFilter.push(dog)
          allDogs.push(dog)
        }
      })
      let ShowFilter = [];
      while(DogsFilter.length){
        let ArrayOfDogs = [];
        let c = 8; 
        while(c > 0 && DogsFilter.length > 0) {
          c --
          ArrayOfDogs.push(DogsFilter.shift());
        }
        ShowFilter.push(ArrayOfDogs);
      }
      return {
        ...state,
        AllDogs: [...allDogs],
        Current: 1,
        AuxDogs: [...ShowFilter],
        ShowDogs: [...ShowFilter[0]]
      }
    case FILTER_BY_TEMPERAMENT:
      const dogsFilter = [];
      const AllDogs = [];
      const input = action.payload.toLowerCase();
      state.BackupDogs.map((dog) => {

        let val = dog.temperament ? dog.temperament.split(',') : ''
        let valor = [];
        for (let i = 0; i < val.length; i++) {
          valor.push(val[i].toLowerCase().trim())
        }
        if(valor.includes(input)) {
          dogsFilter.push(dog)
          AllDogs.push(dog)
        }

      })

      const showFilter = [];
      while(dogsFilter.length){
        let ArrayOfDogs = [];
        let c = 8; 
        while(c > 0 && dogsFilter.length > 0) {
          c --
          ArrayOfDogs.push(dogsFilter.shift());
        }
        showFilter.push(ArrayOfDogs);
      }

      return {
        ...state,
        AllDogs: [...AllDogs],
        Current: 1,
        AuxDogs: [...showFilter],
        ShowDogs: [...showFilter[0]]
      }
    case ADD_NEW_BREED:
      return {
        ...state,
        Breeds: [...state.Breeds, action.payload]
      }
    case DOG_CREATED:
      return {
        ...state
      }
    case ADD_TO_FAVORITES:
      const Dog = state.Favorites.find((dog) => dog.id === action.payload.id)
      return {
        ...state,
        Favorites: !Dog ? [ ...state.Favorites, action.payload] : state.Favorites
      }
    case REMOVE_TO_FAVORITES:
      return {
        ...state,
        Favorites: state.Favorites.filter((dog) => dog.id !== action.payload )
      }
    default:
      return state;
      
  }
}