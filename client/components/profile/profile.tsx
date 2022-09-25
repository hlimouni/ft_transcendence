import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
import MenuBar from './menubar'
import { fetchFriends, fetchMainUser } from './utils'
import ProfileStyle from '../../styles/Profile.module.css'

export default function Profile() {
    const {state} = useContext(AppContext);
  const cntx = useContext(AppContext);
  const [Qr, setQr] = useState();

	useEffect(() => {
		console.log("state mainUser : effec ", state.mainUser);
		if (state.mainUser) {
			fetchFriends(cntx);
      console.log("2fa");
		}
	}, [state.mainUser]);
  const TwoFa = `${process.env.SERVER_HOST}/2fa/generate`

  return (
    <div className={ProfileStyle.profile}>
        <Cover/>
        <div className={ProfileStyle.profileBody}>
          <MenuBar/>
        </div>
    </div>
  )
}
