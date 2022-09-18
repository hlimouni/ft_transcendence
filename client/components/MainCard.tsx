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
    {/* <ul className={LayoutStyle.cardsL}>
      <li>
        <div className={LayoutStyle.cardL}>
          <Image draggable="false" src={JamesWebb} className={LayoutStyle.card_imageL} />
          <div className={LayoutStyle.card_ItemsL}>
              <img className={LayoutStyle.card_PImgL} src={`${state.mainUser.image}`} />
            <div className={LayoutStyle.card_headerL}>
              <div className={LayoutStyle.card_header_textL}>
                <h3 className={LayoutStyle.card_titleL}>{state.mainUser.userName}</h3>
                  
              </div>
            </div>
            <div className={LayoutStyle.card_btnsL} style={{ display: 'flex' }}>
                <Button
                    size="large"
                    color="primary"
                    variant="outlined"
                >
                    Profile
                </Button>
            </div>
          </div>
        </div>
      </li>
    </ul> */}

    <div className={LayoutStyle.cardsL}>
        {/* <div className={LayoutStyle.cardL}>
        <Image draggable="false" src={JamesWebb} className={LayoutStyle.card_imageL} />
        </div> */}
        <div className={LayoutStyle.card_ItemsL}>
            <img className={LayoutStyle.card_PImgL} src={`${state.mainUser.image}`} />
        </div>
        <div className={LayoutStyle.cardContent}>
            <div>
                <p style={{color: 'white'}}>Friends</p>
            </div>
            <div>
                <p style={{color: 'white'}}>Friends</p>
            </div>
        </div>
        <div className={LayoutStyle.card_headerL}>
            <h2 className={LayoutStyle.card_titleL}>{state.mainUser.userName}</h2>
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
    </>
  )
}

export default MainCard;