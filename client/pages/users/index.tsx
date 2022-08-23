import axios from "axios"
import React, { useContext, useEffect } from "react"
import Loading from "../../components/Login/Loading"
import UserCard from "../../components/Users/UserCard"
import { AppContext } from "../../context/AppContext"
import { User } from "../../utils/interfaces"
import { Container } from '@mui/material';


const Users = () => {
    const { state, setUsers, setMainUser } = useContext(AppContext)

    useEffect(() => {
        axios
            .get(`${process.env.SERVER_HOST}/users/me`, { withCredentials: true })
            .then((res) => {
                setMainUser({ ...res.data });
            })
            .catch(() => {
            });
    }, [])
    useEffect(() => {
        if (state.mainUser)
            fetchUsers();
    }, [state.mainUser])

    async function fetchUsers() {
        axios
            .get(`${process.env.SERVER_HOST}/users`, { withCredentials: true })
            .then((res) => {

                setTimeout(() => {
                    setUsers(res.data.filter((user: User) => { return user.id != state.mainUser.id }));
                }, 1000)
            })
            .catch(() => {
                console.log("error!!!");
            });
    }

    return (
        <Container style={{color: 'white', backgroundColor: 'dimgrey', padding: '0px'}}>

                {!state.users ? <Loading /> : 
                <div>
                    <h1 style={{backgroundColor: 'darkslategrey', paddingLeft: '10px'}}>Users</h1>
                    <div className="condiv">
                        {state.users.map((user: any) => {
                            return <UserCard key={user.id} {...user} />
                        })}
                    </div>
                </div>
                }
        </Container>
    )
}


export default Users;