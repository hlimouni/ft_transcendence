import { useRouter } from "next/router";
import * as React from "react";
import CurrentGame from "../../../components/game/CurrentGame";
import { AppContext } from "../../../context/AppContext";

export interface IAppProps {}

export default function LiveIndex(props: IAppProps) {
	const router = useRouter();
	const { gameId } = router.query;
	const { state } = React.useContext(AppContext);
	let data: any = null;
	data = state.onlineGames[Number(gameId)];
    
	const gameContainer = React.useRef(null);
	return (
		<div
			ref={gameContainer}
			style={{
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "center",
				padding: "10px",
			}}
		>
			<div
				style={{ width: "100%", height: "100%" }}
				ref={gameContainer}
			>
				<CurrentGame
					game={data}
					gameContainer={gameContainer}
				/>
			</div>
		</div>
	);
}
