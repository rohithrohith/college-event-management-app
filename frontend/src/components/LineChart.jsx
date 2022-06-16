import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function LineChart({ data }) {
	const values = Object.values(data);
	const labels = Object.keys(data);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Number of participants',
				data: values,
				borderColor: 'gb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Event participation among different branches',
			},
		},
	};

	return (
		<>
			<Line data={chartData} options={options} />
		</>
	);
}

export default LineChart;
