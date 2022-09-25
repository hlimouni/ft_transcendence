import { User } from '../../utils/interfaces';
import ProfileStyle from '../../styles/Profile.module.css'
import Avatar from '@mui/material/Avatar'
import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';

type Props = {user: User};

const Friend = (props: Props) => {

  return (
    <div className={ProfileStyle.oneFriend}>
          <Avatar sx={{ width: '70px', height: '70px', margin: 'auto 0' }} alt={props.user.userName} src={props.user.image}/>
          <Typography sx={{margin: 'auto'}} variant='subtitle1'>{props.user.userName}</Typography>
          <Box display='flex' sx={{p: '0 1rem'}} className='friend-state'> {
              props.user.isPlaying ?
                <Chip sx={{margin: 'auto'}} variant='outlined' label='Playing'/>:
              props.user.isOnline ?
                  <Chip sx={{margin: 'auto'}} variant='outlined' label='Online' color='success'/>:
                  <Chip sx={{margin: 'auto'}} variant='outlined' label='Offline' color='error'/>}
          </Box>
    </div>
  )
}

export default Friend