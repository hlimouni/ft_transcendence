import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import ProfileStyle from '../../styles/Profile.module.css'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuBar from './menubar'
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from './editDialog'

const Cover = () => {
  const {state} = useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={ProfileStyle.cover}>
       <img className={ProfileStyle.coverImage} src='BACKGROUND@4x.png' alt='cover image'/>
       <div className={ProfileStyle.profileBanner}>
          <div className={ProfileStyle.profileInfos}>
            <Avatar
              alt={state.mainUser.userName}
              src={state.mainUser.image}
              sx={{width: '120px', height: '120px'}}
            />
            <div className={ProfileStyle.profileText}>
              <h1>{state.mainUser.firstName} {state.mainUser.lastName} <span className={ProfileStyle.sub}>({state.mainUser.userName})</span></h1>
              <h6>{[...state.friends].length} friends</h6>
            </div>
          </div>
          <Button
            onClick={handleClickOpen}
            className={ProfileStyle.editButton}
            startIcon={<EditIcon/>}
            variant='contained'
            sx={{
              letterSpacing: '.12em',
              whiteSpace: 'nowrap',
              margin: '2.2rem',
              padding: '2em 3em'
              }}>
                Edit Profile
          </Button>
          <EditDialog openState={open} closeHandler={handleClose}/>
       </div>
    </div>
  )
}

export default Cover