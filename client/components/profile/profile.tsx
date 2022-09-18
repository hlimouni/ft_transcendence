import { stat } from 'fs'
import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
import FriendsCard from './friendsCard'
import MenuBar from './menubar'
import { fetchFriends } from './utils'
import ProfileStyle from '../../styles/Profile.module.css'
import { WinStats } from './winStat'
import { ScoreStats } from './scoreStat'

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
        <div className={ProfileStyle.profileBody}>
          <MenuBar/>
          {/* <FriendsCard/> */}
          <div style={{display: 'flex', maxWidth: '76rem', justifyContent: 'space-evenly'}}>
            <WinStats/>
            <ScoreStats/>
          </div>
        </div>
    </div>
  )
}
