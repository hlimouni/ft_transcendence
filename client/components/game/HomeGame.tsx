import { useContext, useEffect, useRef, useState } from "react";
import { Data, StateGame } from "./Data/Data";
import socket from "./Data/Socket";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import styles from "../../styles/GameStyle.module.css"
import Themes from "./Themes"
import {GiPingPongBat} from 'react-icons/gi' 

import Game from "./Game";
import { useRouter } from "next/router";

//NOTE - Initiale data and Information about all Game like (ball, paddle, score, width, height, canvas)
export let data = new Data(1200, 600);

export function HomeGame() {
	const router = useRouter();
	const [isGame, setIsGame] = useState(false);
	const [currentState, setCurrentState] = useState(data.get_State());
	const { state, setMainUser } = useContext(AppContext);

	const handleGame = async () => {
		setCurrentState(StateGame.WAIT);
		//fetch userInfos (datas)
		const res = await axios.get(`${process.env.SERVER_HOST}/users/me`, {
			withCredentials: true,
		});
		// check if player in game
		if (res.data.isPlaying) return;
		// else he can join match.
		socket.emit("join_match", {
			user: res.data,
		});
		socket.on("Playing", (payload: any) => {
			if (payload.playing) {
				data.set_userOne(payload.first);
				data.set_userTwo(payload.second);
				data.set_State(StateGame.PLAY);
			}
			setCurrentState(StateGame.PLAY);
		});
		setIsGame(true);
	};

	const gameContainer = useRef(null);

	useEffect(() => {
		return () => {
			socket.emit("STOP_GAME");
			setTimeout(() => {
				setIsGame(false);
				setCurrentState(StateGame.WAIT);
				data.set_State(StateGame.WAIT);
			}, 200);
		};
	}, []);

	return (
		<div ref={gameContainer} className={styles.container}>
					{!isGame ? (
						<div className={styles.contents}>
							<div className={styles.gamePict}>
								<img className={styles.pictpong}
									src="/pp.jpg"
									alt="Ping Pong Game"
								/>
							</div>
							<div className={styles.gameContent}>
								<div className={styles.gameText}>
									<Themes data={data} />
								</div>

									<button className={styles.btnplay}
										onClick={handleGame}
									>
										<GiPingPongBat style={{color:"white"}}/> Play <GiPingPongBat style={{color:"white"}}/>
									</button>
							</div>
						</div>
					) : (
							<Game
								gameContainer={gameContainer}
								data={data}
								currentState={currentState}
								setCurrentState={setCurrentState}
								setIsGame={setIsGame}
							/>
						
					)}
		</div>
	);
}
