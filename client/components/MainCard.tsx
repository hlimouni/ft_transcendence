import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { User } from '../utils/interfaces'
import { flexbox, style } from '@mui/system'
import IMGBACK from '../public/backgroungUsers.jpeg'
import JamesWebb from '../public/james-webb.png'
import PP from '../public/p_prUsers.jpeg'
import BACKGROUND4x from '../public/BACKGROUND4x.png'
import Image from 'next/image'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import Grid from '@mui/material/Grid'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { addFriend, blockUser, unfriend, unBlockUser, acceptFriendRequest } from '../utils/utils'
import axios from 'axios'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DoneIcon from '@mui/icons-material/Done'
import LayoutStyle from '../styles/Layout.module.css'

const MainCard = ({state} : {state: any}) => {
  return (
    <>
    <div className={LayoutStyle.cardsL}>
        <div className={LayoutStyle.cardL}>
          <Image draggable="false" src={PP} className={LayoutStyle.card_imageL} />
        </div>
        <div className={LayoutStyle.card_contentL1}>
          <div className={LayoutStyle.card_ItemsL}>
              <div>
                  <p style={{color: 'white'}}>Friends</p>
              </div>
              <img className={LayoutStyle.card_PImgL} src={`${state.mainUser.image}`} />
              <div>
                  <p style={{color: 'white'}}>Friends</p>
              </div>
          </div>
          <div className={LayoutStyle.card_headerL}>
              <h3 className={LayoutStyle.card_titleL}>{state.mainUser.firstName + ' ' + state.mainUser.lastName}</h3>
              <p  className={LayoutStyle.card_User}>{'@' + state.mainUser.userName} </p>
              <div className={LayoutStyle.card_btnsL}>
                  
                      <Button
                          size="large"
                          color="primary"
                          variant="outlined"
                      >
                          My Profile
                      </Button>
              </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default MainCard;