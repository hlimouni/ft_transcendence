import React, { useRef, useEffect, useState, useContext } from "react";
import { GameOver } from "./GameOver";
import { Data, StateGame} from "./Data/Data";
import { drawGame } from "./Data/DrawCanvas";
import { GameObj } from "./Data/gameObject";
import socket from "./Data/Socket";
import { AppContext } from "../../context/AppContext";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/GameStyle.module.css"

interface GameProps {
	data: Data;
	currentState: StateGame;
	setCurrentState: (state: StateGame) => void;
	setIsGame?: (isGame: boolean) => void;
	gameContainer?: any;
}

export function Game(props: GameProps) {
	const { data, currentState, setCurrentState, setIsGame } = props;
	const { state } = useContext(AppContext);
	const router = useRouter();
	const canvasRef: any = useRef();
	const initialState: GameObj = {
		ball: {
			ball_x: data.get_Ball_X(),
			ball_y: data.get_Ball_Y(),
		},
		paddle: {
			paddle_left: data.get_PddleLeft_Y(),
			paddle_right: data.get_PddleRight_Y(),
		},
		score: {
			playerOne_Score: data.get_Score_One(),
			playerTwo_Score: data.get_Score_Two(),
		},
		currentState: data?.get_State(),
		isWin: data.get_Winner(),
	};

	const [gameState, setGameState] = useState(initialState);

	const [changeData, setChangeData] = useState([
		data.get_Width(),
		data.get_Height(),
	]);

	function responseGame() {
	
		if (!props.gameContainer.current) return;
		const new_width = (props.gameContainer.current.clientWidth * 80) / 100;
		data.set_Width(new_width);
		data.set_Height(new_width * 0.45);
		data.set_Trace_X(data.get_Width());
		data.set_Paddle_Height(data.get_Height());
		data.set_Right_Pddle_X(data.get_Width());

		data.set_PddleLeft_Y(
			data.get_Height() / 2 - data.get_Paddle_Height() / 2
		);
		data.set_PddleRight_Y(
			data.get_Height() / 2 - data.get_Paddle_Height() / 2
		);
		data.set_Ball_X(data.get_Width() / 2);
		data.set_Ball_Y(data.get_Height() / 2);

		if (
			data.get_TypeRes() !== 1 &&
			props.gameContainer.current.clientWidth > 1200
		) {
			data.set_Paddle_width(10);
			data.set_ball_Radius(10);
			data.set_borderHeight(15);
			data.set_TypeRes(1);
		} else if (
			data.get_TypeRes() !== 2 &&
			props.gameContainer.current.clientWidth > 800 &&
			props.gameContainer.current.clientWidth <= 1200
		) {
			data.set_Paddle_width(8);
			data.set_ball_Radius(8);
			data.set_borderHeight(10);
			data.set_TypeRes(2);
		} else if (
			data.get_TypeRes() !== 4 &&
			props.gameContainer.current.clientWidth <= 450
		) {
			data.set_Paddle_width(6);
			data.set_ball_Radius(6);
			data.set_borderHeight(5);
			data.set_TypeRes(0);
		}

		setChangeData([data.get_Width(), data.get_Height()]);
	}
	useEffect(() => {
		const canvas: any = canvasRef.current;
		if (canvas !== undefined) {
			const context = canvas.getContext("2d");

			drawGame(context, data);
		}
	}, [changeData]);

	useEffect(() => {
		window.addEventListener("resize", responseGame);
	}, []);

	useEffect(() => {
		const canvas: any = canvasRef.current;
		if (canvas !== undefined) {
			const context = canvas.getContext("2d");
			const new_x = (gameState.ball.ball_x / 1200) * canvas.clientWidth;
			const new_y = (gameState.ball.ball_y / 600) * canvas.clientHeight;
			data.set_Ball_X(new_x);
			data.set_Ball_Y(new_y);
			const new_paddle_leftY =
				(canvas.clientHeight * gameState.paddle.paddle_left) / 600;
			const new_paddle_rightY =
				(canvas.clientHeight * gameState.paddle.paddle_right) / 600;
			data.set_PddleLeft_Y(new_paddle_leftY);
			data.set_PddleRight_Y(new_paddle_rightY);
			data.set_Score_One(gameState.score.playerOne_Score);
			data.set_Score_Two(gameState.score.playerTwo_Score);
			data.set_State(gameState.currentState);
			data.set_Winner(gameState.isWin);
			drawGame(context, data);

			if (data.get_State() === StateGame.OVER) {
				setCurrentState(StateGame.OVER);
			}

			socket.on("gameState", (newState: any) => {
				setGameState(newState);
			});
		}

		return () => {
			socket.off("gameState");
		};
	}, [gameState, currentState]);

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.code === "ArrowUp") {
				socket.emit("up", "down");
			} else if (e.code === "ArrowDown") {
				socket.emit("down", "down");
			}
		});
		document.addEventListener("keyup", (e) => {
			if (e.code === "ArrowUp") {
				socket.emit("up", "up");
			} else if (e.code === "ArrowDown") {
				socket.emit("down", "up");
			}
		});

		responseGame();

		return () => {
			socket.off("up");
			socket.off("down");
		};
	}, []);

	return (
		<div style={{ width: "100%", height: "100%", position:"relative"}}>
			{currentState === StateGame.WAIT ? (
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<h1
						className={styles.waitOp}
						
					>
						WAITING FOR OPPENENT...
					</h1>
					<LinearProgress color="inherit" />
				</div>
			) : (
				<div
					className={styles.gameContainer}
				>
					<div
						className={styles.userInfos}
					>
						<div className={styles.flexImageGame}>
							<div className={styles.avatar1}>
								<img
									src={data.get_userOne().avatar}
									alt="user avatar"
									
									className={styles.images}
								/>
							</div>
							<div className={styles.userName} style={{fontFamily:"'Press Start 2P', cursive"}}>
								{data.get_userOne().username}
							</div>
						</div>
						<div className={styles.score}>
							<h1>
									{data.get_Score_Two()}
							</h1>
							<h1>:</h1>
							<h1>
									{data.get_Score_One()}
							</h1>

						</div>
						<div className={styles.flexImageGame}>
							<div className={styles.userName} style={{fontFamily:"'Press Start 2P', cursive"}}>
								{data.get_userTwo().username}
							</div>
							<div className={styles.avatar2}>
							<img
									src={data.get_userTwo().avatar}
									alt="user avatar"
									className={styles.images}
								/>
							</div>
						</div>
					</div>
					<canvas
						width={data.get_Width()}
						height={data.get_Height()}
						ref={canvasRef}
					></canvas>
				</div>
			)}
			{(currentState === StateGame.OVER)  && (
					<div className={styles.gameResultContainer}>
						<GameOver 
						
						data={data}
						setIsGame={setIsGame}
						setCurrentState={setCurrentState}
						/>
					</div>				
			)}
		</div>
	);
}

export default Game;
