import { User } from '../../utils/interfaces';

type Props = {user: User};

const Friend = (props: Props) => {

  return (
    <div>
          <img src={props.user.image} alt="User avatar"/>
          <h2>{props.user.userName}</h2>
          <div className='friend-state'>
              {props.user.isPlaying ? 'Playing': props.user.isOnline ? 'Online': 'Offline'}
          </div>
    </div>
  )
}

export default Friend