import React from 'react'
import { WinStats } from './winStat'
import { ScoreStats } from './scoreStat'

export default function ProfileBody() {
  return (
    <div style={{display: 'flex', maxWidth: '76rem', justifyContent: 'space-between'}}>
        <WinStats/>
        <ScoreStats/>
    </div> 
  )
}