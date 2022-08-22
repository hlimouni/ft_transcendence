import axios from "axios"
import React, { useContext, useEffect } from "react"
import Loading from "../../components/Login/Loading"
import UserCard from "../../components/Users/UserCard"
import { AppContext } from "../../context/AppContext"


const Users = () => {
    const { state, setUsers } = useContext(AppContext)

    useEffect(() => {
        fetchUser();
    }, [])

    async function fetchUser() {
        axios
            .get(`${process.env.SERVER_HOST}/users`, { withCredentials: true })
            .then((res) => {

                setTimeout(() => {
                    setUsers([...res.data]);
                }, 1000)
            })
            .catch(() => {
                console.log("error!!!");
            });
    }

    return (
        <div className="container"  style={{display: "flex", flexWrap: "wrap"}}>
            {!state.users ? <Loading /> : state.users.map((user: any) => {
                return <UserCard {...user} />
            })}
        </div>
    )
}


export default Users;