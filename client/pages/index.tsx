import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Profile from '../components/profile/profile'
import Login from './Login'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Login/Loading'

const Home: NextPage = () => {

  const [isLoged, setIsLoged] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(true);
  const { state, setMainUser } = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/users/me`, { withCredentials: true })
      .then((res) => {
        console.log("hey", res.data);
          setMainUser({ ...res.data });
          setIsLoged(true);
      })
      .catch(() => {
        console.log("error", `${process.env.SERVER_HOST}/users/me`)
        setIsLoged(false);
      }).finally(()=> {
        setIsloading(false);
      }
      );

  }, [isLoged]);
  
  return (
    <div className="div">
      
      {isloading ? <Loading />  : (
        !isLoged ? (
            <Login setIsLoged={setIsLoged}/>
          ) : (
            state.mainUser && <Profile />
          )
        )
      }
    </div>
  )
}

export default Home
