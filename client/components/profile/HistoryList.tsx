import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import HistoryGame from "./HistoryGame";
import { WinStats } from "./winStat";

const HistoryList = (props: any) => {
	const [games, setGames] = useState<any[]>([]);
	const { state } = useContext(AppContext);
	const [lastScores, setLastScores] = useState<number[]>([]);
	useEffect(() => {
		fetchAllGames();
		state.eventsSocket.on("UPDATE_DATA", () => {
			fetchAllGames();
		});
	}, []);

	async function fetchAllGames() {
		try {
			axios
				.get(`${process.env.SERVER_HOST}/users/${props.id}/MatchesHistory`, {
					withCredentials: true,
				})
				.then((res) => {
					console.log("History matchs : ", res);
					setGames(res.data);
					let scores: number[] = [];
					console.log("all games : ", res.data);
					[...res.data.slice(-5)]?.forEach((game) => {
						if (game) {
							if (game.firstPlayer === props.id) {
								scores.push(game.scoreFirst);
							} else if (game.secondPlayer === props.id) {
								scores.push(game.scoreSecond);
							}
						}
					});
					setLastScores(scores);
					console.log("last 5 scores", lastScores);
				});
		} catch {
			console.log("CANT GET ALL games ");
		}
	}
	return (
		<div
		className="profile-data"
		style={{
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-start",
			gap: "20px",
		}}
		>
			<WinStats {...state.mainUser}/>
			<div style={{minWidth: "46rem",}}>
				<div >
					<h4 style={{marginTop: '0'}}>Games History</h4>
				</div>
				<div style={{display: "flex", flexDirection: "column", gap: "2em"}}>
					{games?.map((game) => {
						//
						return (
							<HistoryGame game={{ ...game }} key={game.id} />
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HistoryList;
