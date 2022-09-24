import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ProfileStyle from '../../styles/Profile.module.css';
import { AppContext } from '../../context/AppContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ScoreStats(props: any) {
  const { state } = useContext(AppContext);
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
					let scores: number[] = [];
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

const options = {
  responsive: true,
  scales: {
    y: {
        ticks: {
            precision: 0,
        }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Your Last 5 games',
    },
  },
};

const labels = ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'];

const dataMap: any = {};

lastScores.forEach((element, index) => {
  dataMap[`Game ${index + 1}`] = element;
});


const data = {
  labels,
  datasets: [
    {
      hoverBackgroundColor: 'rgba(108, 93, 211, .4)',
      hoverBorderColor: 'rgba(108, 93, 211, 1)',
      label: 'Score',
      data: dataMap,
      backgroundColor: 'rgba(76, 77, 84, .5)',
    },
  ],
};


  return <div className={ProfileStyle.scores}><Bar options={options} data={data} /></div>;
}
