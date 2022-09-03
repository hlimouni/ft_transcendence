import React, { Key, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { User } from '../../utils/interfaces';
import Friend from './friend';

const FriendsCard = () => {
    const {state} = useContext(AppContext);
  return (
        <div>
          {[...state.friends].map((user: User) => <Friend user={user}/>)}
        </div>
  )
}

export default FriendsCard