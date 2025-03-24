import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SectionGrowthChart = ({ data }) => {
  const chartData = {
    labels: data.map(section => section.ageGroup),
    datasets: [{
      label: 'Average Progress %',
      data: data.map(section => section.avgProgress),
      backgroundColor: '#3B82F6'
    }]
  };

  return <Bar data={chartData} />;
};

export default SectionGrowthChart;