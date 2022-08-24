import { useDispatch } from "react-redux";
import { DeleteDog, RemoveToFavorites } from "../../redux/actions";
import { TiDeleteOutline } from 'react-icons/ti';
import { BiX } from 'react-icons/bi';
import './Message.css';
import { useLocation } from "react-router-dom";


export default function Message({setState, state, id, image}) {

  const dispatch = useDispatch();
  const Location = useLocation();


  const HandleChick = () => {
    if(Location.pathname === "/favorites") {
      dispatch(RemoveToFavorites(id, false)) 
    }
    else if(Location.pathname === "/created") {
      dispatch(DeleteDog(id, image))
    }
    setState(false)
  }

  return (
    <div className={ state ?"container_msg_delete" : 'container_msg_delete_block'}>
      <div className="msg_delete_dog">
        <span className="message_DL">Are you sure</span>
        <span className="message_DL">This action is irreversible</span>
        <div className="cont_btn_okey">
          <button 
            onClick={()=>HandleChick()}
            className="btn_click"
          >
            Okey
          </button>
        </div>
        <TiDeleteOutline className='X_icon' />
        <BiX 
          onClick={()=>setState(false)}
          className='close_icon' 
        />
      </div>
    </div>
  )
}