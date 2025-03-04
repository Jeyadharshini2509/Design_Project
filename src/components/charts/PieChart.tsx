import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { StudentProgress } from '../../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartProps {
  progress: StudentProgress;
}

export const PieChart: React.FC<PieChartProps> = ({ progress }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Current Domain Progress Distribution',
      },
    },
  };

  const data = {
    labels: progress.domains.map(domain => domain.domain),
    datasets: [
      {
        label: 'Current Score',
        data: progress.domains.map(domain => domain.score),
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(79, 70, 229, 0.7)',
          'rgba(67, 56, 202, 0.7)',
          'rgba(55, 48, 163, 0.7)',
          'rgba(49, 46, 129, 0.7)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(79, 70, 229)',
          'rgb(67, 56, 202)',
          'rgb(55, 48, 163)',
          'rgb(49, 46, 129)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};