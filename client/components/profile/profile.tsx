import React, { useContext } from 'react'
import { Button, Typography } from '@mui/material'
import {AppContext} from '../../context/AppContext'

export default function Profile() {
  const {state} = useContext(AppContext)
  return (
    <div>
        <Typography variant='h1'>profile page</Typography>
        <Button variant='contained'>Press me</Button>
        <p>{state.mainUser.id}</p>
        <p>{state.mainUser.userName}</p>
    </div>
  )
}
