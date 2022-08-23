import React, { useEffect } from "react"
import { Container } from '@mui/material';

const Login = () => {
    return (
        <Container maxWidth="sm">
            <div className="Login">
                <form action={`${process.env.SERVER_HOST}/auth/42`}>
                    <button type="submit">Login</button>
                </form>
            </div>
        </Container>

    )
}

export default Login;
