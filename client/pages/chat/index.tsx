/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import React, { useContext, useEffect  } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

import Chat from "../../components/chat/Chat";

export default function ChatPage() {
	const { state, setMainUser } = useContext(AppContext);

	useEffect(() => {
		fetchMainUser();
	}, []);

	async function fetchMainUser() {
		axios
			.get(`${process.env.SERVER_HOST}/users/me`, { withCredentials: true })
			.then((res) => {
				if (res.status === 200) {
					setMainUser({ ...res.data });
				}
			})
			.catch(() => {
				Router.push("/");
			});
	}

	return (
		<div className="profile-content">{state.mainUser && <Chat />}</div>
	);
}
