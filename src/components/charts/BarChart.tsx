import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { StudentProgress } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  progress: StudentProgress;
}

export const BarChart: React.FC<BarChartProps> = ({ progress }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Domain Progress Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const labels = progress.domains.map(domain => domain.domain);

  const data = {
    labels,
    datasets: [
      {
        label: 'Current Score',
        data: progress.domains.map(domain => domain.score),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Previous Score',
        data: progress.domains.map(domain => domain.previousScore),
        backgroundColor: 'rgba(156, 163, 175, 0.7)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};