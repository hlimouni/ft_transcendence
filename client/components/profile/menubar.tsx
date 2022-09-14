import React, { useState } from 'react'
import ProfileStyle from '../../styles/Profile.module.css'
import { Tabs, Tab, AppBar } from '@mui/material'

type Props = {}

const MenuBar = (props: Props) => {
  const [seletctedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  }
  return (
    <Tabs className={ProfileStyle.tabs} value={seletctedTab} onChange={handleChange}>
      <Tab sx={{letterSpacing: '.07em'}} label="Profile"/>
      <Tab sx={{letterSpacing: '.07em'}} label="Friends"/>
      <Tab sx={{letterSpacing: '.07em'}} label="History"/>
    </Tabs>
  )
}

export default MenuBar