import { stat } from 'fs'
import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
import MenuBar from './menubar'
import { fetchFriends } from './utils'
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
    <div>
        <Cover/>
        {/* <MenuBar/> */}
    </div>
  )
}
