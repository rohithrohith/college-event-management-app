import s from '../css/adminHome.module.css';
import EventTable from '../components/EventTable';

function AdminHome() {
	const sort = (e) => {
		console.log(e.target.value);
	};
	return (
		<div className={s.admin_home}>
			<div className={s.dashboard_header}>
				<h1>Events</h1>
				<div className={s.sort_by}>
					<span
						style={{
							color: 'var(--dark)',
							marginRight: '10px',
							fontSize: '14px',
						}}
					>
						Sort By:
					</span>
					<select id='sort-by' className={s.sort_by_select} onChange={sort}>
						<option value='title' className={s.sort_option}>
							Title
						</option>
						<option value='date' className={s.sort_option}>
							Date
						</option>
					</select>
				</div>
			</div>
			<EventTable style={s} />
		</div>
	);
}

export default AdminHome;
