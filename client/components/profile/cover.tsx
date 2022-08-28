import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import MenuBar from './menubar'

type Props = {}

const Cover = (props: Props) => {
  const {state} = useContext(AppContext);

  return (
    <div>
       <img className='cover-image' src='james-webb.png' alt='cover image'/>
       <div className='profile-banner'>
          <img src={state.mainUser.image} alt="User avatar"/>
          <h2>{state.mainUser.firstName} {state.mainUser.lastName}</h2>
          <h6>{[...state.friends].length}</h6>
          <button>Edit Profile</button>
       </div>
    </div>
  )
}

export default Cover