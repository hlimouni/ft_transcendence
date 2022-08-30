import axios from "axios";
import { eventsSocket } from "../context/sockets";
import { User, Channel } from "./interfaces";

export function isContact(reciever: User | Channel): reciever is User {
  return (reciever as User).userName !== undefined;
}

export function checkMessage(input: string) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] != " ") return false;
  }
  return true;
}

export function addFriend(sender: string, target: string) {
  //remove sender plzplz
  // console.log("send friend request : ", target , "   ", sender);
  try {
    axios
      .post(
        `${process.env.SERVER_HOST}/users/send`,
        { id: target },
        { withCredentials: true }
      )
      .then((data) => {
        eventsSocket.emit("SEND_FRIEND_REQUEST", {
          sender: sender,
          target: target,
        });
      });
  } catch (error) {}
}
export function acceptFriendRequest(accpter: string, relatedUserId: string) {
  console.log("accept friend request ");
  try {
    axios
      .post(
        `${process.env.SERVER_HOST}/users/accept`,
        { id: relatedUserId },
        { withCredentials: true }
      )
      .then((data) => {
        eventsSocket.emit("ACCEPT_FREIND_REQUEST", {
          accpter,
          relatedUserId,
        });
      });
  } catch (error) {
    console.log(error);
  }
}
export function unfriend(denier: string, relatedUserId: string) {
  try {
    axios
      .post(
        `${process.env.SERVER_HOST}/users/unfriend`,
        { id: relatedUserId },
        { withCredentials: true }
      )
      .then((data) => {
        eventsSocket.emit("DENY_FREIND_REQUEST", {
          denier,
          relatedUserId,
        });
      });
  } catch (error) {}
}
export function blockUser(blocker: string, relatedUserId: string) {
  console.log("block user", blocker, " uuu :", relatedUserId);
  try {
    axios
      .post(
        `${process.env.SERVER_HOST}/users/block`,
        { id: relatedUserId },
        { withCredentials: true }
      )
      .then((data) => {
        eventsSocket.emit("BLOCK_A_USER", {
          blocker,
          target: relatedUserId,
        });
      });
  } catch (error) {}
}
export function unBlockUser(unblocker: string, relatedUserId: string) {
  try {
    axios
      .post(
        `${process.env.SERVER_HOST}/users/unblock`,
        { id: relatedUserId },
        { withCredentials: true }
      )
      .then((data) => {
        eventsSocket.emit("UNBLOCK_A_USER", {
          unblocker,
          target: relatedUserId,
        });
      });
  } catch (error) {
    console.log(error);
  }
}
