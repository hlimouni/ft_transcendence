import style from "../../styles/GameOver.module.css";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { StateGame } from "./Data/Data";
import { Button } from "@mui/material";
import styles from "../../styles/GameStyle.module.css"
import Image from "next/image";
export function GameOver({ data, setIsGame, setCurrentState }: any) {

	// const { state } = useContext(AppContext);

	return (
		<div >
			{ data.get_Winner() ? (
					<div className="g-o-lost" style={{width:"100%", height:"100%", display:"flex",
					justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"80px"}}>
						<div style={{position: "relative", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: '50px'}} >
							<p className={styles.overTitle}>`🤬👾 GameOver 👾🤬`</p>
						</div>
						<div className="game-over-button">
							<button
								style={{background:"red"}}
								className={styles.overBtn}
								onClick={
									() => {
										setIsGame(false);
										setCurrentState(StateGame.WAIT);
										data.set_State(StateGame.WAIT);
									}
								}>
									Back To Game
							</button>
						</div>
					</div>
				):(
					<div className="g-o-win" style={{width:"100%", height:"100%", display:"flex",
								justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"80px"}}>
						<div style={{position: "relative", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: '50px'}} >
							<p className={styles.overTitle}>`🎉🥳 You Win 🥳🎉`</p>
						</div>
						<div className="game-over-button">
							<button
								style={{background:"green", color:"white"}}
								className={styles.overBtn}
								onClick={
									() => {
										setIsGame(false);
										setCurrentState(StateGame.WAIT);
										data.set_State(StateGame.WAIT);
								}
							}>
								Back To Game
							</button>
						</div>
					</div>
				)
			}
		</div>
	);
}
