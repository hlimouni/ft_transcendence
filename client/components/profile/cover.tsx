import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import MenuBar from './menubar'
import Image from 'next/image'
import IMGBACK from '../../public/backgroungUsers.jpeg'

type Props = {}

const Cover = (props: Props) => {
  const {state} = useContext(AppContext);

  return (
    // <div>
    //   {/* <img className='cover-image' src='james-webb.png' alt='cover image'/> */}
    //    <div className='profile-banner'>
    //       <img src={state.mainUser.image} alt="User avatar"/>
    //       <h2>{state.mainUser.firstName} {state.mainUser.lastName}</h2>
    //       <h6>{[...state.friends].length}</h6>
    //       <button>Edit Profile</button>
    //    </div>
    // </div>
    <div className='profileDiv'>
      <div className='profileHeader'>
        <Image draggable='false' src={IMGBACK} className='imgBanner' />
        <div className=''>

        </div>
        
      </div>
    </div>
  )
}

export default Cover