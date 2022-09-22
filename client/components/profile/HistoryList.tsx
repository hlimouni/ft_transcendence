import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import HistoryCard from "./HistoryCard";
import { WinStats } from "./winStat";

const HistoryList = (props: any) => {
	const [matches, setMatches] = useState<any[]>([]);
	const { state } = useContext(AppContext);
	const [lastGames, setLastGames] = useState<any[]>([]);
	const [lastScores, setLastScores] = useState<number[]>([]);
	useEffect(() => {
		fetchLastGames();
		state.eventsSocket.on("UPDATE_DATA", () => {
			fetchLastGames();
		});
	}, []);

	async function fetchLastGames() {
		console.log("fetch matches ::->");
		try {
			axios
				.get(`${process.env.SERVER_HOST}/users/${props.id}/MatchesHistory`, {
					withCredentials: true,
				})
				.then((res) => {
					// setFriendsIds([...res.data].map((user)=>  user.id));
					console.log("History matchs : ", res);
					setMatches(res.data);
					setLastGames(res.data.slice(-5));
					console.log("last games sliced", lastGames);
					///
					let scores = Array(5).fill(0);
					console.log("all matches : ", res.data);
					[...lastGames]?.forEach((match) => {
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
			console.log("CANT GET ALL matches ");
		}
	}

	return (
		<div
		className="profile-data"
		style={{
			flexDirection: "column",
			justifyContent: "flex-start",
			gap: "20px",
		}}
		>
			<WinStats {...state.mainUser}/>

			<div className="friends-label" style={{ height: "65%" }}>
				<div className="friends-label-header">
					<h4>Match History</h4>
				</div>
				<div className="list-of-friends">
					{matches?.map((match) => {
						//
						return (
							<HistoryCard match={{ ...match }} key={match.id} />
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HistoryList;
