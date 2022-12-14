import * as React from 'react'
import Button from '@mui/material/Button'
import Image from 'next/image'
import PP from '../../public/p_prUsers.jpeg'
import { useContext, } from 'react'
import { AppContext } from '../../context/AppContext'
import { addFriend, blockUser, unfriend, unBlockUser, acceptFriendRequest } from '../../utils/utils'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function UserCard(props: any) {
  const { state, setUsers, setMainUser, } = useContext(AppContext)
  console.log('ids:', props.pendingIds)
  console.log(props.pendingRequestsIds.includes(props.id))
  return (
    <>
    <ul className="cards">
      <li>
        <div className="card">
          <Image draggable="false" src={PP} className="card_image" />
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
      </li>
    </ul>
    </>
  )
}
