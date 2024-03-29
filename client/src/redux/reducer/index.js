import 
  { 
    GET_ALL_DOGS, 
    GET_CARRUSEL_DOGS, 
    GET_ALL_DOGS_FROM_DB,
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
    GET_ALL_BREEDS,
    ADD_NEW_BREED,
    ADD_TO_FAVORITES,
    REMOVE_TO_FAVORITES,
    CLEAR_DOG_DETAIL,
    GO_AHEAD_DETAIL,
    GO_BEGIND_DETAIL,
    DELETE_DOG,
    GET_FAVORITES,
    CHANGE_CHAT_BOT,
  } 
from '../actions';

const inisialState = {
  Current: 0,
  ChatBot: false,
  AllDogs: [],
  AllDogsFromDataBase: [],
  Favorites: [],
  BackupDogs: [],
  BackupCarruselDogs: [],
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
      const showDogs = Show.length ? [...Show[0]] : action.payload;
      return{
        ...state,
        Current: state.Current !== 0 ? state.Current : 1,
        AllDogs: action.payload[0].name === 'error' ? action.payload : [...action.payload] ,
        BackupDogs: action.payload.length > state.BackupDogs.length ? [...action.payload] : state.BackupDogs ,
        AuxDogs: Show.length ? [...Show] : [],
        ShowDogs: state.ShowDogs.length ? state.ShowDogs : showDogs, 
        BackupCarruselDogs: action.payload , 
      }
      case GET_CARRUSEL_DOGS:
        return {
        ...state,
        BackupCarruselDogs: [...state.AllDogs]
      }
    case GET_ALL_DOGS_FROM_DB:
      return {
        ...state,
        AllDogsFromDataBase: action.payload,
        BackupCarruselDogs: action.payload.length ? action.payload : []
      }
    case GET_DOG_BY_ID:
      return {
        ...state,
        getDogDetail: state.BackupCarruselDogs.filter((dog) => dog.id.toString() === action.payload.toString() )
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
      let dogs = action.payload === 'A-Z' ? [...Array] : [...Array.reverse()];
      let DogsFilterByName = [...dogs]

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
        AllDogs: [...DogsFilterByName],
        Current: state.Current,
        AuxDogs: [...show],
        BackupCarruselDogs: [...DogsFilterByName],
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

      let DogsSort = action.payload === 'Asc' ? [...Array2] : [...Array2.reverse()];
      let DogsFilterByWeigth = [...DogsSort];
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
        AllDogs: [...DogsFilterByWeigth],
        Current: state.Current,
        AuxDogs: [...ShowSort],
        BackupCarruselDogs: [...DogsFilterByWeigth],
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
        
        if(!action.payload[i].breed_group || action.payload[i].breed_group === ""){
          continue;
        }
        breeds.push(action.payload[i].breed_group);
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
      state.BackupDogs.forEach((dog) => {
        if(dog.breed_group === action.payload) {
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
        BackupCarruselDogs: [...allDogs],
        ShowDogs: [...ShowFilter[0]]
      }
    case FILTER_BY_TEMPERAMENT:
      const dogsFilter = [];
      const AllDogs = [];
      const input = action.payload.toLowerCase();
      state.BackupDogs.forEach((dog) => {
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
      if(dogsFilter.length) {
        while(dogsFilter.length){
          let ArrayOfDogs = [];
          let c = 8; 
          while(c > 0 && dogsFilter.length > 0) {
            c --
            ArrayOfDogs.push(dogsFilter.shift());
          }
          showFilter.push(ArrayOfDogs);
        }
      }

      return {
        ...state,
        AllDogs: [...AllDogs],
        BackupCarruselDogs: [...AllDogs],
        Current: 1,
        AuxDogs: [...showFilter],
        ShowDogs: showFilter.length ? [...showFilter[0]] : state.ShowDogs
      }
    case ADD_NEW_BREED:
      return {
        ...state,
        Breeds: [...state.Breeds, action.payload]
      }
    case ADD_TO_FAVORITES:
      const Dog = state.Favorites.find((dog) => dog.id === action.payload.id);
      const ChangeDogToFav = state.AllDogs.find((dog) => dog.id === action.payload.id);
      const RemoveDogs = Dog && state.Favorites.filter((dog) => dog.id !== Dog.id);
      ChangeDogToFav.fav_button = !ChangeDogToFav.fav_button;
      return {
        ...state,
        Favorites: !Dog ? [ ...state.Favorites, action.payload] : RemoveDogs,
        ShowDogs: [...state.AuxDogs[state.Current - 1]],
        Current: state.Current,
        AllDogs: state.AllDogs,
        AllDogsFromDataBase: [...state.AllDogsFromDataBase],
        BackupDogs: state.BackupDogs,
        AuxDogs: state.AuxDogs,
      }
    case REMOVE_TO_FAVORITES:
      const ChangeDogToNormalAllDogs = state.AllDogs.find((dog) => parseInt(dog.id) === parseInt(action.payload));
      const ChangeDogToNormal = state.Favorites.find((dog) => parseInt(dog.id) === parseInt(action.payload));
      ChangeDogToNormal.fav_button = false;
      if(ChangeDogToNormalAllDogs) ChangeDogToNormalAllDogs.fav_button = false
      return {
        ...state,
        Favorites: state.Favorites.filter((dog) => dog.id !== action.payload )
      }
    case GET_FAVORITES:
      return {
        ...state,
        Favorites: action.payload,
        BackupCarruselDogs: action.payload
      }
    case GO_AHEAD_DETAIL:
      let NextDog = [];
      for (let i = 0; i < state.BackupCarruselDogs.length; i++) {
        if(state.BackupCarruselDogs[state.BackupCarruselDogs.length - 1].id === action.payload && NextDog.length === 0) {
          NextDog = []
          NextDog.push(state.BackupCarruselDogs[0]);
        }
        else if(state.BackupCarruselDogs[i].id === action.payload ) {
          NextDog.push(state.BackupCarruselDogs[i+1]);
        }
      }
      return {
        ...state,
        getDogDetail: NextDog.length ? [...NextDog] : state.getDogDetail
      }
    case GO_BEGIND_DETAIL:
      let PreviousDog = [];
      for (let i = 0; i < state.BackupCarruselDogs.length; i++) {
        if(state.BackupCarruselDogs[0].id === action.payload && PreviousDog.length === 0) {
          PreviousDog = []
          PreviousDog.push(state.BackupCarruselDogs[state.BackupCarruselDogs.length - 1]);
        }
        else if(state.BackupCarruselDogs[i].id === action.payload ) {
          PreviousDog.push(state.BackupCarruselDogs[i-1]);
        }
      }
      return {
        ...state,
        getDogDetail: PreviousDog.length ? [...PreviousDog] : state.getDogDetail
      }
    case DELETE_DOG:
      return {
        ...state,
        AllDogsFromDataBase: state.AllDogsFromDataBase.filter((dog) => parseInt(dog.id) !== parseInt(action.payload))
      }
    case CHANGE_CHAT_BOT:
      return {
        ...state,
        ChatBot: !state.ChatBot
      }
    default:
      return state;
      
  }
}