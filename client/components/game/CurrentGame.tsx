import { useEffect, useState } from "react";
import socket from "./Data/Socket";
import Game from "./Game";
import { data } from "./HomeGame";
import {MdLiveTv} from 'react-icons/md'
import { useRouter } from "next/router";
import { StateGame } from "./Data/Data";
import Image from "next/image";
import styles from "../../styles/GameStyle.module.css"


function CurrentGame(props: any) {
	const router = useRouter();
	const [check, setCheck] = useState(false);
	useEffect(() => {
		console.log("router : ", router);
		if (router.pathname === '/live/[gameId]') {
			setCheck(true);
		} else {
			setCheck(false);
		}
	}, [router]);
	
	const handleGame = () => {
		data.set_userOne(props.game.player_1);
		data.set_userTwo(props.game.player_2);
		socket.emit("watchers", props.game);
		setCheck(true);
	};

	return (
		<div className={styles.CurrentGame}>
			{!check ? (
					<div onClick={() => handleGame()}
						className={styles.userInfosCurrGame}
					>
						<div className={styles.card}>
							<div className={styles.flexImage}>
								<div className={styles.avatar1}>
									<Image
										loader={() => props.game.player_1.avatar}
										unoptimized={true}
										src={props.game.player_1.avatar}
										className={styles.images}
										width={200}
										height={200}
									/>
								</div>
								<div className={styles.userName} style={{fontFamily:"'Press Start 2P', cursive"}}>
									{props.game.player_1.username}
								</div>
							</div>
							<div>VS</div>
							<div className={styles.flexImage}>
								<div className={styles.avatar2}>
								<Image
										loader={() => props.game.player_1.avatar}
										unoptimized={true}
										src={props.game.player_2.avatar}
										className={styles.images}
										width={200}
										height={200}
									/>
								</div>
								<div className={styles.userName} style={{fontFamily:"'Press Start 2P', cursive"}}>
									{props.game.player_2.username}
								</div>
							</div>
						</div>
						<div className={styles.liveIcon}>
							<MdLiveTv />
						</div>
						<div className={styles.score}>
							<h1>
									{props.game.player_2.score}
							</h1>
							<h1>:</h1>
							<h1>
									{props.game.player_1.score}
							</h1>
						</div>	
					</div>
					
			) : (
				<Game data={data} gameContainer={props.gameContainer} setCurrentState={()=>{}} currentState={StateGame.PLAY} />
			)}
		</div>
	);
}

export default CurrentGame;