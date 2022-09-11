import { stat } from 'fs'
import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
import FriendsCard from './friendsCard'
import MenuBar from './menubar'
import { fetchFriends } from './utils'
import ProfileStyle from '../../styles/Profile.module.css'

export default function Profile() {
  const {state} = useContext(AppContext);
  const cntx = useContext(AppContext);

	useEffect(() => {
		console.log("state mainUser : effec ", state.mainUser);
		if (state.mainUser) {
			fetchFriends(cntx);
		}
	}, [state.mainUser]);
  return (
    <div className={ProfileStyle.profile}>
        <Cover/>
        <MenuBar/>
        <FriendsCard/>
    </div>
  )
}
