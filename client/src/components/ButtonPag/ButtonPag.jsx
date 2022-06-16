// import Reac from 'react';

export default function ButtonPag(val) {
  let v = 1;
  return (
    // <button className={ Current === val ? 'btns btn-active' : 'btns'} onClick={() => dispatch(GetAndShowAllDogs(val))} >{val}</button>
    <button>{v}</button>,
    {
      v : v++
    }
  )
}