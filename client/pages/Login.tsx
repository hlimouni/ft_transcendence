import React, { useEffect } from "react"
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Image from "next/image";
import IMG1 from '../../files/pong.png'

const Login = () => {
    return (
            <div className="Login">
                <div className="divForm">

                    <Image src={IMG1} className='Login_img'/>
                    <form action={`${process.env.SERVER_HOST}/auth/42`}>
                        <Button variant="outlined" type="submit">LOGIN WITH INTRA</Button>
                    </form>

                </div>
            </div>

    )
}

export default Login;
