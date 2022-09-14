import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import ProfileStyle from '../../styles/Profile.module.css'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuBar from './menubar'
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material'

type Props = {}

const Cover = (props: Props) => {
  const {state} = useContext(AppContext);

  return (
    <div className={ProfileStyle.cover}>
       <img className={ProfileStyle.coverImage} src='BACKGROUND@4x.png' alt='cover image'/>
       <div className={ProfileStyle.profileBanner}>
          {/* <img src={state.mainUser.image} alt="User avatar"/> */}
          <div className={ProfileStyle.profileInfos}>
            <Avatar alt={state.mainUser.userName} src={state.mainUser.image} sx={{width: '120px', height: '120px'}}/>
            <div className={ProfileStyle.profileText}>
              <h1>{state.mainUser.firstName} {state.mainUser.lastName} <span className={ProfileStyle.sub}>({state.mainUser.userName})</span></h1>
              <h6>{[...state.friends].length} friends</h6>
            </div>
          </div>
          <Button className={ProfileStyle.editButton} startIcon={<EditIcon/>} variant='contained' sx={{letterSpacing: '.12em', whiteSpace: 'nowrap', margin: '2.2rem', padding: '2em 3em'}}>Edit Profile</Button>
       </div>
    </div>
  )
}

export default Cover