import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/GameStyle.module.css";
import socket from "./Data/Socket";
import { AppContext } from "../../context/AppContext";
import Link from "next/link";
import CurrentGame from "./CurrentGame";
import {MdVideocamOff} from 'react-icons/md'
import {data} from "./HomeGame"

export function LiveGame() {
	const [games, setGames] = useState([]);
	const { state, setOnlineGames } = useContext(AppContext);

	useEffect(() => {
		socket.on("receive_games", (data: any) => {
			const tmp = JSON.parse(data);
			if (tmp.hasOwnProperty("games")) {
				setGames(tmp.games);
				setOnlineGames(tmp.games);
			}
		});
		return () => {
			socket.off("receive_games");
		};
	}, [games]);

	const gameContainer = useRef(null);
	return (
		<div
			ref={gameContainer}
			className={styles.liveContainer}
		>
			{games.length !== 0 ? (
				games.map((game, index) => {
					return (
						
						<Link
							href={{
								pathname: "live/[gameId]",
								query: {
									gameId: `${index}`,
								},
							}}
							key={index}
						>
							<a style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
								<CurrentGame
									index={index}
									key={index}
									data={data}
									game={game}
									gameContainer={gameContainer}
								/>
							</a>
							
						</Link>
					);
				})
			) : (
				<div
					className={styles.noMatch}
				>	<div><span className={styles.emoji1}>😏</span><span className={styles.emoji2}>🥴</span><span className={styles.emoji3}>🎃</span></div>
					<h1> <MdVideocamOff /> NoBody wanna Play</h1>
				</div>
			)}
		</div>
	);
}

export default LiveGame;
