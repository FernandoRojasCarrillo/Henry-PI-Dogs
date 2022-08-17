import './Loading.css';

export default function Loading(){
  return (
    <div className='container-lading' >
      <div className='text' >
        <div>Loading</div>
      </div>
      <div className='loup' >
        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>    
      </div>
    </div>
  )
}