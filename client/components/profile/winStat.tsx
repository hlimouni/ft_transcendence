import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ProfileStyle from '../../styles/Profile.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Games Won', 'Games Lost', ],
  datasets: [
    {
      label: 'Win Stats',
      data: [2, 1,],
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

export function WinStats() {
  return <div className={ProfileStyle.winStats}>
    <Doughnut data={data}/>
    </div>;
}
