import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ProfileStyle from '../../styles/Profile.module.css'
import React, { useContext, useState, useEffect } from 'react'
import { ScoreStats } from './scoreStat'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'


ChartJS.register(ArcElement, Tooltip, Legend);


export function WinStats(props: any) {

  const { state } = useContext(AppContext);

  const [losses, setLosses] = useState(0);
  const [wins, setWins] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
		fetchMatchs();
		state.eventsSocket.on("UPDATE_DATA", () => {
			fetchMatchs();
		});
	}, []);


	async function fetchMatchs() {
		console.log("fetch matches ::->");
		try {
			axios
				.get(`${process.env.SERVER_HOST}/users/${props.id}/MatchesHistory`, {
					withCredentials: true,
				})
				.then((res) => {
					// setFriendsIds([...res.data].map((user)=>  user.id));
					console.log("matchs : ", res);
					setMatches(res.data);
					///
					let winScore = 0;
					let loseScore = 0;
					console.log("all matches : ", res.data);
					[...res.data]?.forEach((match) => {
						if (match) {
							if (match.scoreFirst > match.scoreSecond) {
								if (match.firstPlayer === props.id)
									winScore += 1;
								else loseScore += 1;
							} else {
								if (match.secondPlayer === props.id)
									winScore += 1;
								else {
									loseScore += 1;
								}
							}
						}
					});
					setWins(winScore);
					setLosses(loseScore);

          // setWins(3);
          // setLosses(2);
				});
		} catch {
			console.log("CANT GET ALL matches ");
		}
	}

  const data = {
    labels: ['Games Won', 'Games Lost', ],
    datasets: [
      {
        label: 'Win Stats',
        data: [wins, losses,],
        backgroundColor: [
          'rgba(108, 93, 211, .4)',
          'rgba(76, 77, 84, .2)',
        ],
        borderColor: [
          'rgba(108, 93, 211, 1)',
          'rgba(76, 77, 84, .8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <div className={ProfileStyle.winStats}>
    <Doughnut data={data}/>
    </div>;
}
