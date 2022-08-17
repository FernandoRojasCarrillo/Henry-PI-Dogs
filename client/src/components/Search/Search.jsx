import { useState } from "react";
import { useDispatch } from "react-redux";
import { ClearAllDogs, SearchByName } from "../../redux/actions";
import './Search.css';


export default function Search() {

  const [ input, setInput ] = useState('');
  const dispatch = useDispatch();

  const HandleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value)
  }

  const HandleSubmit = (e)=>{
    e.preventDefault();
    input ? dispatch(ClearAllDogs()) : alert('El input de busqueda esta vacío')
    input && dispatch(SearchByName(input)) 
    setInput('');
  }

  return (
    <div className='container_search' >
      <form className='container' onSubmit={(e) => HandleSubmit(e)} >
        <input
           className='search-box-inp'
           type="text"
           placeholder="Buscar cuidad"
           value={input}
           onChange={(e) => HandleChange(e)}
        />
        <input 
            className='search-box-btn'
            type='submit' 
            value='Search'
        />
      </form>
    </div>
  )
}