import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Candidate } from '../types/candidate';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = '#fff';
ChartJS.defaults.borderColor = '#444';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Current Vote Results',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Value'
      },
      min: 0,
      ticks: {
        // forces step size to be 50 units
        stepSize: 1
      }
    }
  }
};

type Props = {
  candidates: Candidate[];
};

function VotesChart({ candidates }: Props) {
  const labels = candidates.map((c: any) => `${c.name}, ${c.id}`);
  const votes = candidates.map((c: any) => c.voteCount);
  const data = {
    labels,
    datasets: [
      {
        label: 'Votes',
        data: votes,
        borderWidth: 2,
        backgroundColor: '#712CF9cc',
        borderColor: '#8c54fc',
        color: '#ffffff',
      },
    ],
  };

  return <Bar data={data} options={options} />;
}

export default VotesChart;
