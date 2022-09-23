import { stat } from 'fs'
import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
import FriendsCard from './friendsCard'
import MenuBar from './menubar'
import { fetchFriends, fetchMainUser } from './utils'
import ProfileStyle from '../../styles/Profile.module.css'
import { WinStats } from './winStat'
import { ScoreStats } from './scoreStat'
import FriendsInfo from './friendsInof'

export default function Profile() {
  // const {state} = useContext(AppContext);

  return (
    <div className={ProfileStyle.profile}>
        <Cover/>
        <div className={ProfileStyle.profileBody}>
          <MenuBar/>
          {/* <FriendsCard/> */}
          {/* <div style={{display: 'flex', maxWidth: '76rem', justifyContent: 'space-evenly'}}>
            <WinStats/>
            <ScoreStats/>
          </div> */}
          {/* <FriendsInfo/> */}
        </div>
    </div>
  )
}
