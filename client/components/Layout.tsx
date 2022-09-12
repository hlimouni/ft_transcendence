import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import { AppConsumer } from '../context/AppContext'
import Home from '../pages'
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '../utils/interfaces'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MessageIcon from '@mui/icons-material/Message'
import MarkChatUnreadRoundedIcon from '@mui/icons-material/MarkChatUnreadRounded';
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import LayoutStyle from '../styles/Layout.module.css'
import Link from 'next/link'
import { acceptFriendRequest, unfriend } from '../utils/utils'
import { useRouter } from 'next/router'

const ProfileButton = ({ state }: { state: any }) => {
  const settings = [
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Edit Profile', icon: <SettingsIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
  ]

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
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
        {settings.map((setting) => (
          <MenuItem
            key={settings.indexOf(setting)}
            // onClick={handleCloseUserMenu}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              gap: '10px',
            }}
          >
            {setting.icon}
            <Typography>{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
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
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <PeopleAltIcon />
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
      icon: <PersonRoundedIcon/>,
      path: '/',
      selected: true,
    },
    {
      name: 'Chat',
      icon: <MarkChatUnreadRoundedIcon />,
      path: '/chat',
      selected: false,
    },
    {
      name: 'Users',
      icon: <GroupIcon />,
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
      icon: <OndemandVideoRoundedIcon />,
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
              
              <div className={LayoutStyle.main_content}>
                <div className={LayoutStyle.main_nav}>

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

                  <nav style={{ color: '#8f8f8f' , padding: '0px 5px' }}>
                    <List>
                      {sideMenu.map((page, index) => {
                        if (page.selected) {
                          return (
                            <Link href={page.path} key={index}>
                              <a href="">
                                <ListItem
                                  disablePadding
                                  sx={{
                                    borderLeft: '3px solid #6c5dd3',
                                    backgroundColor: '#2d090935 !important',
                                    // background: 'linear-gradient(90deg, rgba(108,93,211,0.5914959733893557) 0%, rgba(108,93,211,0) 100%, rgba(0,212,255,0) 100%)',
                                    color: '#ebebeb',
                                    borderRadius: '0px',
                                  }}
                                >
                                  <ListItemButton
                                    sx={{
                                      padding: '20px',
                                      borderRadius: '0px',
                                      height: '60px',
                                    }}
                                  >
                                    <ListItemIcon >{page.icon}</ListItemIcon>
                                    <ListItemText className={LayoutStyle.listItems}>{page.name}</ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              </a>
                            </Link>
                          )
                        } else {
                          return (
                            <Link href={page.path} key={index}>
                              <a href="">
                                <ListItem
                                  disablePadding
                                  sx={{
                                    borderRadius: '0px',
                                  }}
                                >
                                  <ListItemButton
                                    sx={{
                                      padding: '20px',
                                      borderRadius: '0px',
                                      height: '60px',
                                    }}
                                  >
                                    <ListItemIcon>{page.icon}</ListItemIcon>
                                    <ListItemText className={LayoutStyle.listItems}>{page.name}</ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              </a>
                            </Link>
                          )
                        }
                      })}
                    </List>
                  </nav>
                </div>
                <div className={LayoutStyle.vl}></div>
                
                <div className={LayoutStyle.navwithmain}>
                  <div className={LayoutStyle.main_header}>
                    
                    <div className={LayoutStyle.account_setting}>
                      <FriendsRequestDropDown state={state} />
                      <ProfileButton state={state} />
                    </div>
                  </div>
                  <main style={{ width: '100%' }}>{children}</main>
              </div>
              </div>
            </div>
          )
        }
      }}
    </AppConsumer>
  )
}
export default Layout
