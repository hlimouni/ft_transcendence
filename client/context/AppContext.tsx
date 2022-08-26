import { FaxRounded } from "@mui/icons-material";
import React, { ReactNode, createContext, useState, useRef, useEffect } from "react";
import { Message, Channel, User } from "../utils/interfaces";
export const AppContext = createContext<any>({});
// import { eventsSocket, chatSocket } from "./sockets";

export const AppProvider = (props: any) => {
    const [login, setLogin] = useState<boolean>(false);
    const [mainUser, setMainUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [contacts, setContacts] = useState<User[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [receiver, setReceiver] = useState<User | Channel | null>(null);
    const [friends, setFriends] = useState<User | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const [tkhar, setTkhar] = useState("");

    const [isUserJoinedChannel, setIsUserJoinedChannel] = useState<boolean>(
        false
    );
    const [onlineGames, setOnlineGames] = useState([]);


    return (
        <AppContext.Provider
            value={{
                state: {
                    login,
                    friends,
                    mainUser,
                    messages,
                    contacts,
                    channels,
                    receiver,
                    isUserJoinedChannel,
                    // eventsSocket,
                    // chatSocket,
                    users,
                    onlineGames,
                    tkhar
                },
                setLogin,
                setMessages,
                setContacts,
                setChannels,
                setReceiver,
                setFriends,
                setMainUser,
                setIsUserJoinedChannel,
                setOnlineGames,
                setUsers,
                setTkhar
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

const AppConsumer = AppContext.Consumer;

export default AppProvider;
// export { AppConsumer };