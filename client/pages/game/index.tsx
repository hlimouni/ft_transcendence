import axios from "axios";
import React, { useContext, useEffect } from "react";
import { HomeGame } from "../../components/game/HomeGame";
import { AppContext } from "../../context/AppContext";
import styles from "../../styles/GameStyle.module.css"

export function PingPong(props: any) {
	const { state, setMainUser } = useContext(AppContext);
	useEffect(() => {
		if (state.mainUser) {
			axios
				.get(`${process.env.SERVER_HOST}/users/me`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status === 200) {
						setMainUser({ ...res.data });
					}
				})
				.catch(() => {
					
				});
		}
	}, []);

	return (
		<div className={styles.gameHomeContainer}>
			{state.mainUser && <HomeGame />}
		</div>
	);
}

export default PingPong;
