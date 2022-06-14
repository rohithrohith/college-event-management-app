import { Link } from 'react-router-dom';
import { FaChartLine, FaEdit, FaTimes } from 'react-icons/fa';

function AdminEvent({ style, event, sl }) {
	const showStats = (e) => {
		// e.preventDefault();
		document.getElementById('stats-container').style.display = 'flex';
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
						to={`#${event._id}`}
						className={style.stats_btn}
						onClick={(e) => {
							showStats(e);
						}}
					>
						<FaChartLine className={style.action_icon} />
						Stats
					</Link>
					<Link to={`/admin/event/${event._id}`} className={style.stats_btn}>
						<FaEdit className={style.action_icon} />
						Edit
					</Link>
				</span>
			</div>
			<div className={style.stats_container} id='stats-container'>
				<div className={style.stats_card}>
					<div className={style.stats_header}>
						<h3 title='title' className={style.stats_card_title}>
							Event title Lorem ipsum
						</h3>
						<FaTimes
							style={{ cursor: 'pointer' }}
							onClick={() => {
								document.getElementById('stats-container').style.display =
									'none';
							}}
						/>
					</div>
					<div className={style.stats_body}>Body</div>
					<div className={style.stats_footer}>Footer</div>
				</div>
			</div>
		</div>
	);
}

export default AdminEvent;
