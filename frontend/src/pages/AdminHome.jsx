import s from '../css/adminHome.module.css';
import AdminEvent from '../components/AdminEventRow';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions';

function AdminHome() {
	const events = useSelector((state) => state.events.events);
	const dispatch = useDispatch();

	let sl = 0;

	useEffect(() => {
		dispatch(getEvents());
	}, []);

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
			<div className={s.event_list_container}>
				<div className={s.event_list_head}>
					<span className={s.column}>Sl.no</span>
					<span className={s.column}>Title</span>
					<span className={s.column}>Actions</span>
				</div>
				{events &&
					events.map((event) => (
						<AdminEvent style={s} event={event} sl={sl + 1} key={event._id} />
					))}
			</div>
		</div>
	);
}

export default connect(null, { getEvents })(AdminHome);
