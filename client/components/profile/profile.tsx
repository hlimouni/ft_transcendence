import React, { useContext } from 'react'
import { Button, Typography } from '@mui/material'
import {AppContext} from '../../context/AppContext'
import Cover from './cover'
export default function Profile() {
  const {state} = useContext(AppContext)
  return (
    <div>
        <Cover/>
        <p>{state.mainUser.id}</p>
        <p>{state.mainUser.userName}</p>
    </div>
  )
}
