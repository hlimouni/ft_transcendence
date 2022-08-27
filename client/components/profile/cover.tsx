import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import MenuBar from './menubar'

type Props = {}

const Cover = (props: Props) => {
  const {state} = useContext(AppContext);

  return (
    <div>
       <img className='cover-image' src='evolution.jpeg' alt='cover image'/>
       <img src={state.mainUser.image} alt="User avatar"/>
       <MenuBar/>
    </div>
  )
}

export default Cover