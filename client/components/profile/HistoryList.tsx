import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import HistoryCard from "./HistoryCard";
import HistoryGame from "./HistoryGame";
import { WinStats } from "./winStat";

const HistoryList = (props: any) => {
	const [games, setGames] = useState<any[]>([]);
	const { state } = useContext(AppContext);
	// const [lastGames, setLastGames] = useState<any[]>([]);
	const [lastScores, setLastScores] = useState<number[]>([]);
	useEffect(() => {
		fetchLastGames();
		state.eventsSocket.on("UPDATE_DATA", () => {
			fetchLastGames();
		});
	}, []);

	async function fetchLastGames() {
		console.log("fetch games ::->");
		try {
			axios
				.get(`${process.env.SERVER_HOST}/users/${props.id}/MatchesHistory`, {
					withCredentials: true,
				})
				.then((res) => {
					// setFriendsIds([...res.data].map((user)=>  user.id));
					console.log("History matchs : ", res);
					setGames(res.data);
					// setLastGames(res.data.slice(-5));
					// console.log("last games sliced", lastGames);
					///
					let scores: number[] = [];
					console.log("all games : ", res.data);
					[...res.data.slice(-5)]?.forEach((match) => {
						if (match) {
							if (match.firstPlayer === props.id) {
								scores.push(match.scoreFirst);
							} else if (match.secondPlayer === props.id) {
								scores.push(match.scoreSecond);
							}
						}
					});
					setLastScores(scores);
					console.log("last 5 scores", lastScores);
					///
				});
		} catch {
			console.log("CANT GET ALL games ");
		}
	}
	console.log("sliced: ", lastScores)
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
					{games?.map((match) => {
						//
						return (
							<HistoryGame game={{ ...match }} key={match.id} />
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HistoryList;
