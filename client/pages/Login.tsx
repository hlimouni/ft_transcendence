import React, { useEffect } from "react"

const Login = () => {
    return (
        <div className="Login">
            <form action={`${process.env.SERVER_HOST}/auth/42`}>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
