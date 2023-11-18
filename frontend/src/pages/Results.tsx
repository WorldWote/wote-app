import React from 'react';
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
import useCandidates from '../hooks/useCandidates';
import { Card } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#fff";
ChartJS.defaults.borderColor = "#444";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Current Vote Results',
    },
  },
};

function Results() {
  const { data: candidates } = useCandidates();
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
        color: '#ffffff'
      },
    ],
  };

  return (
    <Card className="w-100">
      <Card.Body>
        <Bar options={options} data={data} />
      </Card.Body>
    </Card>
  );
}

export default Results;
