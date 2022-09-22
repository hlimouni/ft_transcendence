import React, { ChangeEvent, Component, ElementType, useContext, useState } from 'react'
import ProfileStyle from '../../styles/Profile.module.css'
import { Tabs, Tab, AppBar } from '@mui/material'
import ProfileBody from './profileBody'
import FriendsInfo from './friendsInof'
import HistoryList from './HistoryList'
import { AppContext } from '../../context/AppContext'

const MenuBar = () => {
  const {state} = useContext(AppContext);
  const [seletctedTab, setSelectedTab] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  }
  return (
    <>
      <Tabs className={ProfileStyle.tabs} value={seletctedTab} onChange={handleChange} selectionFollowsFocus={true}>
        <Tab sx={{letterSpacing: '.07em'}} label="Profile"/>
        <Tab sx={{letterSpacing: '.07em'}} label="Friends"/>
        <Tab sx={{letterSpacing: '.07em'}} label="History"/>
      </Tabs>
      {seletctedTab == 0 && <ProfileBody/>}
      {seletctedTab == 1 && <FriendsInfo/>}
      {seletctedTab == 2 && <HistoryList {...state.mainUser}/>}
      </>
  )
}

export default MenuBar