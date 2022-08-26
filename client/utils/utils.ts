import axios from "axios";
import { eventsSocket } from "../context/sockets";

export function addFriend(sender: string, receiver: string){


    try {
        console.log("addfriend", sender, receiver);
        axios
            .post(`${process.env.SERVER_HOST}/users/send`,
                {id: receiver},
                {withCredentials: true}
            )
            .then((data)=>{
                //eventsSocket.emit("SEND_FRIEND_REQUEST",{
                //    sender: sender,
                //    target: receiver
                //})
                console.log("request sent");
            })
    } catch (error) {
        console.log("error");
    }
}