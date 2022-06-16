import {
	Chart,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data }) {
	const values = Object.values(data);
	const labels = Object.keys(data);
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Total number of participants',
				data: values,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 23, 122, 0.2)',
					'rgba(200, 159, 90, 0.2)',
					'rgba(120, 18, 200, 0.2)',
					'rgba(70, 230, 53, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 23, 122, 1)',
					'rgba(200, 159, 90, 1)',
					'rgba(120, 18, 200, 1)',
					'rgba(70, 230, 53, 1)',
				],
				borderWidth: 2,
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
			title: {
				display: true,
				text: 'Event participation among different branches',
			},
			legend: {
				position: 'top',
				labels: {
					fontSize: 20,
				},
			},
		},
	};
	return (
		<>
			<Bar data={chartData} options={options} />
		</>
	);
}

export default BarChart;
