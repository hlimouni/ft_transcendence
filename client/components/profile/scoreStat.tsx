import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5 (Last)'];

export const data = {
  labels,
  datasets: [
    {
      hoverBackgroundColor: 'rgba(108, 93, 211, .4)',
      hoverBorderColor: 'rgba(108, 93, 211, 1)',
      label: 'Score',
      data: {'Game 1': 2, 'Game 2': 2, 'Game 3': 5, 'Game 4': 1, 'Game 5 (Last)': 5},
      backgroundColor: 'rgba(76, 77, 84, .5)',
    },
  ],
};

export function ScoreStats(props: any) {
  return <div className={ProfileStyle.scores}><Bar options={options} data={data} /></div>;
}
