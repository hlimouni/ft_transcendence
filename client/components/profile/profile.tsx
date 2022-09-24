import axios from 'axios'
import { stat } from 'fs'
import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
import Image from 'next/image'
import FriendsCard from './friendsCard'
import MenuBar from './menubar'
import { fetchFriends, fetchMainUser } from './utils'
import ProfileStyle from '../../styles/Profile.module.css'
import { WinStats } from './winStat'
import { ScoreStats } from './scoreStat'
import FriendsInfo from './friendsInof'
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

  // async function generate2Fa() {
  //   try{
  //     const res = await axios
  //     .get(`${process.env.SERVER_HOST}/2fa/generate`, { withCredentials: true })
  //     setQr(res.data);
  //     console.log("generate 2fa");
  //     console.log(res);

  //   }catch (e){
  //     console.log("error when generate 2fq!!")
  //   }

  // }

  const TwoFa = `${process.env.SERVER_HOST}/2fa/generate`

  return (
    <div className={ProfileStyle.profile}>
        <Cover/>
        <div className={ProfileStyle.profileBody}>
          <MenuBar/>
          {/* <FriendsCard/> */}
          {/* <div style={{display: 'flex', maxWidth: '76rem', justifyContent: 'space-evenly'}}>
            <WinStats/>
            <ScoreStats/>
            <TwoFaGenerate />
          </div> */}
          {/* <FriendsInfo/> */}
        </div>
    </div>
  )
}
