import axios from 'axios'
import { stat } from 'fs'
import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
// import Cover from './cover'
import Image from 'next/image'
import MenuBar from './menubar'
import { fetchFriends } from './utils'
import TwoFaGenerate from './TwoFaGenerate'

export default function Profile() {
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
    <div>
        {/* <Cover/> */}
        <TwoFaGenerate />
        {/* <div>{Qr}</div> */}
        <MenuBar/>
    </div>
  )
}
