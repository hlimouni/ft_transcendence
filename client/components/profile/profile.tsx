import axios from 'axios'
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
import Image from 'next/image'
import TwoFaGenerate from './TwoFaGenerate'

export default function Profile() {
  // const {state} = useContext(AppContext);
  const {state} = useContext(AppContext);
  const cntx = useContext(AppContext);
  const [Qr, setQr] = useState();

	useEffect(() => {
		console.log("state mainUser : effec ", state.mainUser);
		if (state.mainUser) {
			fetchFriends(cntx);
      console.log("2fa");
      // generate2Fa();
		}
	}, [state.mainUser]);

  const TwoFa = `${process.env.SERVER_HOST}/2fa/generate`
  return (
    <div className={ProfileStyle.profile}>
        <Cover/>
        <div className={ProfileStyle.profileBody}>
          <MenuBar/>
          <TwoFaGenerate />
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
