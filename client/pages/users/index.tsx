import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Login/Loading'
import UserCard from '../../components/Users/UserCard'
import { AppContext } from '../../context/AppContext'
import { User } from '../../utils/interfaces'
import { Container } from '@mui/material'

const Users = () => {
  const { state, setUsers, setMainUser, setFriends } = useContext(AppContext)
  const [friendsId, setfriendsId] = useState<any[]>([])
  const [pendingIds, setpendingIds] = useState<any[]>([])

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/users/me`, { withCredentials: true })
      .then((res) => {
        setMainUser({ ...res.data })
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (state.mainUser) {
      fetchUsers()
      fetchpendingIds()
      fetchFriends()
    }
  }, [state.mainUser])

  async function fetchUsers() {
    axios
      .get(`${process.env.SERVER_HOST}/users`, { withCredentials: true })
      .then((res) => {
          setUsers(
            res.data.filter((user: User) => {
              return user.id != state.mainUser.id
            }),
          )
      })
      .catch(() => {
        console.log('error!!!')
      })
  }

  async function fetchFriends() {
    try {
      var res = await axios.get(`${process.env.SERVER_HOST}/users/id/${state.mainUser.id}/friends`, {withCredentials: true})
      
        setFriends([...res.data]);
        setfriendsId([...res.data].map((e) => e.id))
        console.log("friends",res.data);
    } catch (error) {
      
    }
  }


  // fetchpendingIds();
  async function fetchpendingIds() {
    try {
      var res = await axios.get(
        `${process.env.SERVER_HOST}/users/sentrequests`,
        { withCredentials: true },
      )
      if (res.data.length) {
        setpendingIds([...res.data].map((e) => e.id))
      } else {
        setpendingIds([])
        console.log('no friend request')
      }
    } catch (error) {}
  }
  // useEffect(()=>{
  //     fetchpendingIds();
  // },[pendingIds])

  return (
    <Container style={{ color: 'white', padding: '0px' }}>
      {!state.users ? (
        <Loading />
      ) : (
        <div>
          <h1 style={{ paddingLeft: '10px', textDecoration: 'underline' }}>
            Users
          </h1>
          <div className="condiv">
            {state.users.map((user: any) => {
              return (
                <UserCard key={user.id} {...user} pendingIds={pendingIds} friendsId={friendsId} />
              )
            })}
          </div>
        </div>
      )}
    </Container>
  )
}

export default Users
