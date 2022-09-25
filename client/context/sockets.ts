import io from "socket.io-client";

export const eventsSocket = io(`${process.env.SERVER_HOST}/events`, {
	withCredentials: true,
});
export const chatSocket = io(`${process.env.SERVER_HOST}/chat`, {
	withCredentials: true,
});