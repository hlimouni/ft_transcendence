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
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import LayoutStyle from '../styles/Layout.module.css'
import Link from 'next/link'

const pages = [
  { name: 'Profile', icon: <PersonIcon />, path: "/" },
  { name: 'chat', icon: <MessageIcon />, path: "chat" },
  { name: 'users', icon: <GroupIcon />, path: "users" },
  { name: 'Game', icon: <SportsEsportsIcon />, path: "Game" },
  { name: 'Live', icon: <PodcastsIcon />, path: "Live" },
]

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
  }, [])

  async function fetchRecievedFriendsRequest() {
    axios
      .get(`${process.env.SERVER_HOST}/users/recievedrequests`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('freinds request : ', res.data)
        if ([...res.data].length) setRecievedFriendRequests([...res.data])
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
                justifyContent: 'flex-start',
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
                <Button color="success" onClick={handleCloseUserMenu}>
                  <CheckCircleIcon />
                </Button>
                <Button color="warning" onClick={handleCloseUserMenu}>
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
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
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
                <Button color="success" onClick={handleCloseUserMenu}>
                  <CheckCircleIcon />
                </Button>
                <Button color="warning" onClick={handleCloseUserMenu}>
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
                    width: '250px',
                  }}
                >
                  <img src="/pong.png" alt="logo" height="30px" />
                </div>
                <div className={LayoutStyle.account_setting}>
                  <FriendsRequestDropDown state={state} />
                  <ProfileButton state={state} />
                </div>
              </div>
              <div className={LayoutStyle.main_content}>
                <div className={LayoutStyle.main_nav}>
                  <nav style={{ color: 'white' }}>
                    <List>
                      {pages.map((page, index) => {
                        return (
                          <ListItem disablePadding key={index}>
                            <ListItemButton sx={{ padding: '20px' }}>
                                <ListItemIcon><a href={`${page.path}`}>{page.icon}</a></ListItemIcon>
                                <ListItemText><a href={`${page.path}`}>{page.name}</a></ListItemText>
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                    </List>
                  </nav>
                </div>
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
