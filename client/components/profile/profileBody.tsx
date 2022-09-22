import React, { useContext, useState, useEffect } from 'react'
import { WinStats } from './winStat'
import { ScoreStats } from './scoreStat'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'

export default function ProfileBody(props: any) {

  const {state} = useContext(AppContext);
  return (
    <div style={{display: 'flex', maxWidth: '76rem', justifyContent: 'space-between'}}>
        <WinStats {...state.mainUser}/>
        <ScoreStats {...state.mainUser}/>
    </div> 
  )
}