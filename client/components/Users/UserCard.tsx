import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { User } from '../../utils/interfaces'
import { flexbox, style } from '@mui/system'
import IMGBACK from '../../public/backgroungUsers.jpeg'
import JamesWebb from '../../public/james-webb.png'
import Image from 'next/image'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import Grid from '@mui/material/Grid'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { addFriend, blockUser, unfriend, unBlockUser, acceptFriendRequest } from '../../utils/utils'
import axios from 'axios'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DoneIcon from '@mui/icons-material/Done'

export default function UserCard(props: any) {
  const { state, setUsers, setMainUser, } = useContext(AppContext)
  console.log('ids:', props.pendingIds)
  console.log(props.pendingRequestsIds.includes(props.id))
  return (
    <>
    <ul className="cards">
      {/* <li> */}
        <div className="card">
          <Image draggable="false" src={JamesWebb} className="card_image" />
          <div className="card_Items">
            <div className="card_header">
              <img className="card_PImg" src={`${props.image}`} />
              <div className="card_header-text">
                <h3 className="card_title">{props.userName}</h3>
                <span className="card_status">
                  {props.isOnline ? (
                    !props.isPlaying ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>
                        <span className="Online_point"></span>
                        Online
                      </span>
                    ) : (
                      <span className="ingame">In Game</span>
                    )
                  ) : (
                    <span
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        opacity: '0.4',
                      }}
                    >
                      <span className="Ofline_point"></span>
                      Offline
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="card_btns" style={{ display: 'flex' }}>
              {
                props.RecievedRequests.includes(props.id) ? 
                (
                  <Button
                        className='confirmBtn'
                        size="small"
                        color="info"
                        variant="contained"
                        onClick={(e) => {
                          e.defaultPrevented
                          acceptFriendRequest(state.mainUser.id, props.id)
                        }}
                      >
                        confirm
                      </Button>
                )
                :
                (
                  props.friendsId.includes(props.id) ? 
                  (
                    <Button
                    size="small"
                      color="info"
                      variant="outlined"
                      onClick={(e) => {
                        e.defaultPrevented
                        unfriend(state.mainUser.id, props.id)
                      }}
                    >
                      <PersonRemoveAlt1Icon></PersonRemoveAlt1Icon>Unfriend
                    </Button>
                  )
                  :
                  (
                    !props.pendingRequestsIds?.includes(props.id) ? 
                    (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={(e) => {
                          e.defaultPrevented
                          addFriend(state.mainUser.id, props.id)
                        }}
                      >
                        <PersonAddIcon></PersonAddIcon>Add Friend
                      </Button>
                    )
                    : 
                    (
                      <Button 
                        className='cancelRqstBtn'
                        size="small"
                        variant="contained"
                        onClick={(e) => {
                          e.defaultPrevented
                          unfriend(state.mainUser.id, props.id)
                        }}
                        >
                        Cancel
                      </Button>
                    )
                  )
                )
              }
              {props.blockedUsersIds.includes(props.id) ? (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        unBlockUser(state.mainUser.id, props.id)
                      }}
                    >
                      UnBlock
                    </Button>

              ):(
                      <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        blockUser(state.mainUser.id, props.id)
                      }}
                    >
                      Block
                    </Button>
              )}
            </div>
          </div>
        </div>
      {/* </li> */}
    </ul>
    </>
  )
}
