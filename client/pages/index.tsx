import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Profile from '../components/profile/profile'
import styles from '../styles/Home.module.css'
import Login from './Login'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Login/Loading'
import MiniDrawer from '../components/Layout'

const Home: NextPage = () => {
  const [isLogin, setisLogin] = useState<boolean>(false);
  // const [CurrentUser, setCurrentUser] = useState();
  const { state, setMainUser } = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/users/me`, { withCredentials: true })
      .then((res) => {
        console.log("hey", res.data);
        setisLogin(true);
          setMainUser({ ...res.data });
      })
      .catch(() => {
        console.log("error", `${process.env.SERVER_HOST}/users/me`)
        setisLogin(false);

      });

  }, []);
  // useEffect(() => {
  //   if (state.mainUser)
  //     setisLogin(true);
  // }, [state.mainUser]);
  // console.log("test", isLogin);
  return (
    <div className="div">
      
      {!isLogin ? (
        <Login />
      ) : (
        (!state.mainUser ? <Loading /> :

          <Profile />
        )
      )
      }
    </div>
  )
}

export default Home
