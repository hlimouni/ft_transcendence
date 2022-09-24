import React, { Key, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { User } from '../../utils/interfaces';
import Friend from './friend';
import ProfileStyle from '../../styles/Profile.module.css'

const FriendsCard = () => {
    const {state} = useContext(AppContext);
  return (
        <div className={ProfileStyle.friends}>
          {[...state.friends].map((user: User) => <Friend user={user}/>)}
        </div>
  )
}

export default FriendsCard