import { User } from '../../utils/interfaces';
import ProfileStyle from '../../styles/Profile.module.css'
import Avatar from '@mui/material/Avatar'

type Props = {user: User};

const Friend = (props: Props) => {

  return (
    <div className={ProfileStyle.oneFriend}>
          {/* <img src={props.user.image} alt="User avatar"/> */}
          <Avatar sx={{ width: '100px', height: '100px' }} alt={props.user.userName} src={props.user.image}/>
          <h2>{props.user.userName}</h2>
          <div className='friend-state'>
              {props.user.isPlaying ? 'Playing': props.user.isOnline ? 'Online': 'Offline'}
          </div>
    </div>
  )
}

export default Friend