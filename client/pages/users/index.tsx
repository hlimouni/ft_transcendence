import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Login/Loading'
import UserCard from '../../components/Users/UserCard'
import { AppContext } from '../../context/AppContext'
import { User } from '../../utils/interfaces'
import { Container } from '@mui/material'
import { TIMEOUT } from 'dns'

const Users = () => {
  const { state, setUsers, setMainUser, setFriends } = useContext(AppContext)
  const [friendsId, setfriendsId] = useState<any[]>([])
  const [pendingRequestsIds, setPendingRequestsIds] = useState<any[]>([])
  const [blockedUsersIds, setblockedUsersIds] = useState<any[]>([])
  const [RecievedRequests, setRecievedRequests] = useState<any[]>([])

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
      fetchpendingRequests()
      fetchFriends()
      fetchblockedUsersIds()
      fetchRecievedRequests()
      state.eventsSocket.on("A_USER_STATUS_UPDATED", (user: any) => {
        fetchUsers();
        fetchFriends();
        fetchpendingRequests()
        fetchblockedUsersIds()
        fetchRecievedRequests()
        console.log("user online data");   
      });
      state.eventsSocket.on("UPDATE_DATA", () => {
        fetchUsers();
        fetchFriends();
        fetchpendingRequests()
        fetchblockedUsersIds()
        fetchRecievedRequests()
        console.log("update data");        
      });
  
    }
  }, [state.mainUser])

  async function fetchUsers() {
    try {
        const res = await axios
          .get(`${process.env.SERVER_HOST}/users`, { withCredentials: true })
            if (res.data.length){
                setUsers(
                  res.data.filter((user: User) => {
                    return user.id != state.mainUser.id
                  }),
                )
            }else{
              setUsers([])
            }
    } catch (error) {
      console.log('error!!!')
    }
  }

  async function fetchFriends() {
    try {
      const res = await axios.get(`${process.env.SERVER_HOST}/users/id/${state.mainUser.id}/friends`, {withCredentials: true})
      
        setFriends([...res.data]);
        setfriendsId([...res.data].map((e) => e.id))
        console.log("friends fetched");
    } catch (error) {
      console.log('error!!!')
    }
  }

  async function fetchRecievedRequests() {
    try {
      const res = await axios.get(`${process.env.SERVER_HOST}/users/recievedrequests`, {withCredentials: true},)

      setRecievedRequests([...res.data].map((e) => e.id));
      console.log("recievedrequets fetched",RecievedRequests);
    } catch (error) {
      console.log('error');
    }
  }

  // fetchpendingIds();
  async function fetchpendingRequests() {
    try {
      const res = await axios.get(
        `${process.env.SERVER_HOST}/users/sentrequests`,
        { withCredentials: true },
      )
      if (res.data.length) {
        setPendingRequestsIds([...res.data].map((e) => e.id))
      } else {
        setPendingRequestsIds([])
        console.log('no friend request')
      }
    } catch (error) {
      console.log('error!!!')
    }
  }

  async function fetchblockedUsersIds() {
    try {
      const res = await axios.get(`${process.env.SERVER_HOST}/users/blocked`, {withCredentials: true})
      if(res.data.length){
        setblockedUsersIds([...res.data].map((e) => e.id))
        console.log("blocked users fetched successfuly")
      } else {
        setblockedUsersIds([])
        console.log("no blocked users!!")
      }
    } catch (error) {
      
    }
  }
  // useEffect(()=>{
  //     fetchpendingIds();
  // },[pendingIds])

  return (
    <>
    {/* <Container style={{ color: 'white', padding: '0px' }}> */}
      {!state.users ? (
        <Loading />
      ) : (
        <div className='usersDiv'>
          {/* <h1>
            Users
          </h1> */}
          <div className="usersvl">Users</div>
          
            {state.users.length == 0 ?
            (<div className='emptyusers'>no users found</div>) : 
            (
              <div className="condiv">
                {state.users.map((user: any) => {
                  return (
                    <UserCard key={user.id} {...user} pendingRequestsIds={pendingRequestsIds} friendsId={friendsId} blockedUsersIds={blockedUsersIds} RecievedRequests={RecievedRequests} />
                  )
                })}
              </div>
            )}
        </div>
      )}
    {/* </Container> */}
    </>
  )
}

export default Users
