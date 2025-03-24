import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const StudentProgressPie = ({ student }) => {
  const data = {
    labels: ['Cognitive', 'Motor', 'Social'],
    datasets: [{
      data: [
        student.progress.cognitive.filter(t => t.status === 'completed').length,
        student.progress.motor.filter(t => t.status === 'completed').length,
        student.progress.social.filter(t => t.status === 'completed').length
      ],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B']
    }]
  };

  return <Pie data={data} />;
};

export default StudentProgressPie;