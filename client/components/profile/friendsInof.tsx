import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Login/Loading'
import UserCard from '../../components/Users/UserCard'
import { AppContext } from '../../context/AppContext'
import { User } from '../../utils/interfaces'

const FriendsInfo = () => {
  const { state, setUsers, setMainUser, setFriends } = useContext(AppContext)
  const [friendsId, setfriendsId] = useState<any[]>([])
  const [pendingRequestsIds, setPendingRequestsIds] = useState<any[]>([])

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
      state.eventsSocket.on("A_USER_STATUS_UPDATED", (user: any) => {
        fetchUsers();
        fetchFriends();
        fetchpendingRequests()
        console.log("user online data");   
      });
      state.eventsSocket.on("UPDATE_DATA", () => {
        fetchUsers();
        fetchFriends();
        fetchpendingRequests()
        console.log("update data");        
      });
  
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
  async function fetchpendingRequests() {
    try {
      var res = await axios.get(
        `${process.env.SERVER_HOST}/users/sentrequests`,
        { withCredentials: true },
      )
      if (res.data.length) {
        setPendingRequestsIds([...res.data].map((e) => e.id))
      } else {
        setPendingRequestsIds([])
        console.log('no friend request')
      }
    } catch (error) {}
  }
  return (
    <>
      {!state.friends ? (
        <Loading />
      ) : (
        <div >
          <div className="condiv">
            {state.friends.map((user: any) => {
              return (
                <UserCard key={user.id} {...user} pendingRequestsIds={pendingRequestsIds} friendsId={friendsId} />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default FriendsInfo
