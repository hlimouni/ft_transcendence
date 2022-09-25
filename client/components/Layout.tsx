import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import { AppConsumer } from '../context/AppContext'
import Home from '../pages'
import {
  Badge,
  List,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '../utils/interfaces'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import LayoutStyle from '../styles/Layout.module.css'
import Link from 'next/link'
import { acceptFriendRequest, unfriend } from '../utils/utils'
import { useRouter } from 'next/router'
import route from 'next/router'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


const ProfileButton = ({ state }: { state: any }) => {

  const [logout, setLogout] = useState<boolean>(false)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    axios
      .get(`${process.env.SERVER_HOST}/users/logOut`, { withCredentials : true }).then(()=> {
        state.eventsSocket.emit(
          "YOU_LOG_OUT",
          state.mainUser.id
        );
        console.log("logout");
        setLogout(true)
      }).catch((e) => {
          console.log("wllah lakhrajt");
      });
      route.reload();

  }
  return (
    <>
      <IconButton
        onClick={handleOpenUserMenu}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disableRipple
      >
        <Avatar
          sx={{ width: '50px', height: '50px' }}
          alt={state.mainUser.userName}
          src={state.mainUser.image}
        />
      </IconButton>
      <IconButton onClick={handleLogout} style={{background:"none", border:"none", color:"white", fontSize:"38px", fontWeight:"bolder"}}><LogoutIcon /></IconButton>
    </>
  )
}

const FriendsRequestDropDown = ({ state }: { state: any }) => {
  const [recievedFriendRequests, setRecievedFriendRequests] = useState<User[]>(
    [],
  )
  const [sentFriendRequests, setSentFriendRequests] = useState<User[]>([])
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  useEffect(() => {
    fetchRecievedFriendsRequest()
    fetchSentFriendsRequest()
    state.eventsSocket.on('A_USER_STATUS_UPDATED', (user: any) => {
      fetchRecievedFriendsRequest()
      fetchSentFriendsRequest()
    })
    state.eventsSocket.on('UPDATE_DATA', () => {
      fetchRecievedFriendsRequest()
      fetchSentFriendsRequest()
    })
  }, [])

  async function fetchRecievedFriendsRequest() {
    axios
      .get(`${process.env.SERVER_HOST}/users/recievedrequests`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('freinds request : ', res.data)
        if ([...res.data].length) setRecievedFriendRequests([...res.data])
        else setRecievedFriendRequests([])
      })
      .catch(() => {
        console.log('error!!!')
      })
  }
  async function fetchSentFriendsRequest() {
    axios
      .get(`${process.env.SERVER_HOST}/users/sentrequests`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('sent request : ', res.data)
        if ([...res.data].length) setSentFriendRequests([...res.data])
        else setSentFriendRequests([])
      })
      .catch(() => {
        console.log('error!!!')
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
        <Badge
          badgeContent={recievedFriendRequests.length}
          color="warning"
          overlap="circular"
        >
          <Avatar
            sx={{
              width: '50px',
              height: '50px',
              color: '#ebebeb',
              backgroundColor: 'rgba(0,0,0,0)',
              "&:hover":{
                color: '#6c5dd3',
              },
              "&:active":{
                color: '#6c5dd3',
              },
            }}
          >
            <BottomNavigation showLabels sx={{ backgroundColor: '#0c1827', color: '#ebebeb'}}>
              <BottomNavigationAction sx={{width:'50px', backgroundColor: '#0c1827', color: '#ebebeb', "&:hover":{ color: '#6c5dd3',},"&:active":{ color: '#6c5dd3' },}}icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
              </svg>
              } />
              </BottomNavigation>
            
          </Avatar>
        </Badge>
      </IconButton>
      <Menu
        sx={{ mt: '65px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Typography
          sx={{
            width: '240px',
            padding: '10px',
            borderBottom: '1px solid grey',
          }}
        >
          Received Friend Requests{' '}
        </Typography>
        {recievedFriendRequests.length == 0 ? (
          <MenuItem disabled={true}> No Friend Request </MenuItem>
        ) : (
          recievedFriendRequests.map((friendRequest: User) => (
            <MenuItem
              disableTouchRipple={true}
              key={friendRequest.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'flex-start',
                gap: '10px',
              }}
            >
              <Avatar alt={friendRequest.userName} src={friendRequest.image} />
              <Typography>{friendRequest.userName}</Typography>
              <ButtonGroup
                disableElevation
                variant="text"
                size="small"
                color="secondary"
                aria-label="Disabled elevation buttons"
              >
                <Button
                  color="success"
                  onClick={() => {
                    acceptFriendRequest(state.mainUser.id, friendRequest.id)
                    handleCloseUserMenu()
                  }}
                >
                  <CheckCircleIcon />
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    unfriend(state.mainUser.id, friendRequest.id)
                    handleCloseUserMenu()
                  }}
                >
                  <CancelIcon />
                </Button>
              </ButtonGroup>
            </MenuItem>
          ))
        )}
        <Typography
          sx={{
            width: '250px',
            padding: '20px 10px 10px 10px ',
            borderBottom: '1px solid grey',
          }}
        >
          Sent Friend Requests
        </Typography>
        {sentFriendRequests.length == 0 ? (
          <MenuItem disabled={true}> No friend Request sent </MenuItem>
        ) : (
          sentFriendRequests.map((sentFriendRequest: User) => (
            <MenuItem
              key={sentFriendRequest.id}
              onClick={handleCloseUserMenu}
              sx={{
                display: 'flex',
                alignContent: 'flex-start',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <Avatar
                alt={sentFriendRequest.userName}
                src={sentFriendRequest.image}
              />
              <Typography>{sentFriendRequest.userName}</Typography>
              <ButtonGroup
                disableElevation
                variant="text"
                size="small"
                color="secondary"
                aria-label="Disabled elevation buttons"
              >
                <Button
                  color="warning"
                  onClick={() => {
                    unfriend(state.mainUser.id, sentFriendRequest.id)
                    handleCloseUserMenu()
                  }}
                >
                  <CancelIcon />
                </Button>
              </ButtonGroup>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  )
}

const Layout = ({ children }: { children: any }) => {
  const pages = [
    {
      name: 'Profile',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
      <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
    </svg>,
      path: '/',
      selected: true,
    },
    {
      name: 'Chat',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
      <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
    </svg>,
      path: '/chat',
      selected: false,
    },
    {
      name: 'Users',
      icon: <PeopleAltIcon />,
      path: '/users',
      selected: false,
    },
    {
      name: 'Game',
      icon: <SportsEsportsIcon />,
      path: '/game',
      selected: false,
    },
    {
      name: 'Live',
      icon: <PlayCircleOutlinedIcon />,
      path: '/live',
      selected: false,
    },
  ]
  const [sideMenu, setSideMenu] = useState([...pages])

  const router = useRouter()
  useEffect(() => {
    const menu = [...sideMenu].map((item) => {
      return { ...item, active: false }
    })
    const newMenu = menu.map((item) => {
      return {
        ...item,
        selected: item.path === router.pathname ? true : false,
      }
    })
    setSideMenu(newMenu)
  }, [router])
  return (
    <AppConsumer>
      {({ state }) => {
        if (!state.mainUser) {
          return <Home />
        } else {
          return (
            <div className={LayoutStyle.layout}>
              
              <div className={LayoutStyle.main_header}>
                      <div
                          style={{
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '200px',
                          }}
                      >
                          <img src="/pong.png" alt="logo" height="30px" />
                    </div>
                    <div className={LayoutStyle.account_setting}>
                      <List className={LayoutStyle.itemsUl}>
                        {sideMenu.map((page, index) => {
                          if (page.selected) {
                            return (
                              
                              <Link href={page.path} key={index}>
                                <a href="">
                                      <BottomNavigation showLabels sx={{ backgroundColor: '#0c1827', color: '#ebebeb'}}>
                                        <BottomNavigationAction sx={{ backgroundColor: '#0c1827', color:'#6c5dd3', borderRadius:'50px' }} icon={page.icon} />
                                      </BottomNavigation>
                                      
                                </a>
                              </Link>
                              
                            )
                          } else {
                            return (
                              
                              <Link href={page.path} key={index}>
                                <a href="">
                                      <BottomNavigation showLabels sx={{ backgroundColor: '#0c1827', color: '#ebebeb'}}>
                                        <BottomNavigationAction sx={{width:'50px', backgroundColor: '#0c1827', color: '#ebebeb', borderRadius:'50px'}} icon={page.icon} />
                                      </BottomNavigation>
                                </a>
                              </Link>
                            )
                          }
                        })}
                        <FriendsRequestDropDown state={state} />
                        
                      </List>
                    </div>
                    <div className={LayoutStyle.NotifMobile}>
                      <div className={LayoutStyle.NotifBtnMobile}>
                        <FriendsRequestDropDown state={state} />
                      </div>
                        <ProfileButton state={state} />
                    </div>
              </div>

              <div className={LayoutStyle.main_content}>
                
                <div className={LayoutStyle.main_nav}>

                  <nav style={{ color: '#8f8f8f' , padding: '0px 5px' }}>
                    <List className={LayoutStyle.itemsUlMobile}>
                      {sideMenu.map((page, index) => {
                        if (page.selected) {
                          return (
                            <Link href={page.path} key={index}>
                              <a href="">
                                <BottomNavigation showLabels sx={{ backgroundColor: '#0c1827', color: '#ebebeb'}}>
                                  <BottomNavigationAction sx={{ backgroundColor: '#0c1827', color:'#6c5dd3', borderRadius:'50px' }} icon={page.icon} />
                                </BottomNavigation>
                              </a>
                            </Link>
                          )
                        } else {
                          return (
                            <Link href={page.path} key={index}>
                              <a href="">
                                <BottomNavigation showLabels sx={{ backgroundColor: '#0c1827', color: '#ebebeb'}}>
                                  <BottomNavigationAction sx={{width:'50px', backgroundColor: '#0c1827', color: '#ebebeb', borderRadius:'50px'}} icon={page.icon} />
                                </BottomNavigation>
                              </a>
                            </Link>
                          )
                        }
                      })}
                    </List>
                  </nav>

                  
                </div>
                <div className={LayoutStyle.vl}></div>
                
                  <main style={{ width: '100%' }}>{children}</main>
              </div>
            </div>
          )
        }
      }}
    </AppConsumer>
  )
}
export default Layout
