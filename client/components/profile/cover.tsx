import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import ProfileStyle from '../../styles/Profile.module.css'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuBar from './menubar'
import { Typography } from '@mui/material'

type Props = {}

const Cover = (props: Props) => {
  const {state} = useContext(AppContext);

  return (
    <div className={ProfileStyle.cover}>
       <img className={ProfileStyle.coverImage} src='james-webb.png' alt='cover image'/>
       <div className={ProfileStyle.profileBanner}>
          {/* <img src={state.mainUser.image} alt="User avatar"/> */}
          <Avatar alt={state.mainUser.userName} src={state.mainUser.image} sx={{width: '120px', height: '120px'}}/>
          <div style={{marginRight: '20em'}}>
            <h1>{state.mainUser.firstName} {state.mainUser.lastName} ({state.mainUser.userName})</h1>
            <h6>{[...state.friends].length} friends</h6>
          </div>
          <Button variant='contained' sx={{letterSpacing: '.12em', whiteSpace: 'nowrap', margin: '2.2rem', padding: '2em 3.4em'}}>Edit Profile</Button>
       </div>
    </div>
  )
}

export default Cover