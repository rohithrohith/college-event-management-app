import { Link } from 'react-router-dom';
import { FaChartLine, FaEdit, FaTimes } from 'react-icons/fa';
import BarChart from './BarChart';
import LineChart from './LineChart';

function AdminEventRow({ style, event, sl }) {
	const showStats = (id) => {
		document.getElementById('stats-container-' + id).style.display = 'flex';
	};

	const showBarChart = (id) => {
		document
			.getElementById('line-chart-' + id)
			.classList.add(`${style.hide_chart}`);
		document
			.getElementById('bar-chart-' + id)
			.classList.remove(`${style.hide_chart}`);
	};
	const showLineChart = (id) => {
		document
			.getElementById('bar-chart-' + id)
			.classList.add(`${style.hide_chart}`);
		document
			.getElementById('line-chart-' + id)
			.classList.remove(`${style.hide_chart}`);
	};

	return (
		<div>
			<div className={style.event}>
				<span className={`${style.event_sl}  ${style.cell}`}>{sl}</span>
				<span className={`${style.event_name} ${style.cell}`}>
					<Link to={`/event/${event._id}`} className={style.event_link}>
						{event.title}
					</Link>
				</span>
				<span className={`${style.event_sl}  ${style.cell}`}>
					<Link
						to={`#stats${event._id}`}
						className={style.stats_btn}
						onClick={() => {
							showStats(event._id);
						}}
					>
						<FaChartLine className={style.action_icon} />
						Stats
					</Link>
					<Link to={`/event/${event._id}#edit`} className={style.stats_btn}>
						<FaEdit className={style.action_icon} />
						Edit
					</Link>
				</span>
			</div>
			<div
				className={style.stats_container}
				id={`stats-container-${event._id}`}
			>
				<div className={style.stats_card}>
					<div className={style.stats_header}>
						<h3 title='title' className={style.stats_card_title}>
							{event.title}
						</h3>
						<FaTimes
							style={{ cursor: 'pointer' }}
							onClick={() => {
								document.getElementById(
									`stats-container-${event._id}`
								).style.display = 'none';
							}}
						/>
					</div>
					<div className={style.stats_body}>
						<div
							className={`${style.barchart_container} ${style.hide_chart}`}
							id={`bar-chart-${event._id}`}
						>
							<BarChart data={event.participants} />
						</div>
						<div
							className={style.linechart_container}
							id={`line-chart-${event._id}`}
						>
							<LineChart data={event.participants} />
						</div>
					</div>
					<div className={style.stats_footer}>
						<button
							className={style.stats_footer_btn}
							onClick={() => showLineChart(event._id)}
						>
							Line chart
						</button>
						<button
							className={style.stats_footer_btn}
							onClick={() => showBarChart(event._id)}
						>
							Bar chart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminEventRow;
