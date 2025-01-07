import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Score {
  id: number;
  user_id: number;
  game_type: number;
  score: number;
  created_at: string;
}

interface GameScoresProps {
  scores: Score[];
}

const GAME_NAMES = {
  1: 'Memory Game',
  2: 'Reaction Game',
  3: 'Focus Game'
};

export default function GameScores({ scores }: GameScoresProps) {
  const getGameScores = (gameType: number) => {
    return scores
      .filter(score => score.game_type === gameType)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .slice(-10); // Get last 10 scores
  };

  const createChartData = (gameType: number) => {
    const gameScores = getGameScores(gameType);
    
    return {
      labels: gameScores.map((_, index) => `Game ${index + 1}`),
      datasets: [
        {
          label: GAME_NAMES[gameType as keyof typeof GAME_NAMES],
          data: gameScores.map(score => score.score),
          borderColor: gameType === 1 ? 'rgb(255, 99, 132)' : 
                      gameType === 2 ? 'rgb(54, 162, 235)' : 
                      'rgb(75, 192, 192)',
          backgroundColor: gameType === 1 ? 'rgba(255, 99, 132, 0.5)' : 
                         gameType === 2 ? 'rgba(54, 162, 235, 0.5)' : 
                         'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgb(120,126,142)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgb(120,126,142)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgb(120,126,142)',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Game Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((gameType) => (
          <div key={gameType} className="bg-[rgb(72,72,72)] p-4 rounded-lg">
            <Line data={createChartData(gameType)} options={chartOptions} />
          </div>
        ))}
      </div>
    </div>
  );
} 