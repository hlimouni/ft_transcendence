import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Image from 'next/image'
import IMG1 from '../public/pong.png'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import axios from 'axios'


// type Props

const Login = (props: any) => {
  const {setIsLoged} = props
  const router = useRouter();
  const [isactive, setisactive] = useState<boolean>(false);
  const [Code, setCode] = useState<any>();

  useEffect(() => {
    if (router.query.twoFa)
    {
      setisactive(true);
      
    }
    else {
      console.log("two factor authentication deactive");
    }
  }, [router])

  useEffect(() => {
    checkCode();
  }, [router])

  function checkCode() {
    try {
      axios.post(`${process.env.SERVER_HOST}/2fa/authenticate`,
      { twoFactorAuthenticationCode : Code },
      { withCredentials : true }).then((data) => {
        router.push('/')
        setIsLoged(true);
      })
      console.log("success ", Code);
    } catch (error) {
      
      console.log(error);
    }
  }

  return (
    <>
      {
        !isactive?(
          <div className="Login">
            <div className="divForm">
              <Image src={IMG1} className="Login_img"  alt='pong logo'/>
              <form action={`${process.env.SERVER_HOST}/auth/42`}>
                <Button color="primary" variant="outlined" type="submit">
                  LOGIN WITH INTRA
                </Button>
              </form>
            </div>
          </div>
        ):(
          <div className="checkcode">
            <h1>Verification code</h1>
            <TextField
                id="outlined-basic"
                label="Code"
                variant="outlined"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={checkCode}
              >
                Login
            </Button>
          </div>
        )
      }
    </>
  )
}

export default Login
