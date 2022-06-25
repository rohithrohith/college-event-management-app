import s from '../css/adminHome.module.css';
import AdminEventRow from '../components/AdminEventRow';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions';
import Pagination from '../components/Pagination';

function AdminHome() {
	const events = useSelector((state) => state.events.events);
	const eventsCount = useSelector((state) => state.events.eventsCount);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEvents({ limit: 3, page: 1 }));
	}, []);

	const sort = (e) => {
		dispatch(getEvents({ sort: e.target.value, page: 1, limit: 3 }));
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
					<select
						style={{ color: 'grey' }}
						id='sort-by'
						className={s.sort_by_select}
						defaultValue='sort'
						onChange={sort}
					>
						<option
							style={{ color: 'grey' }}
							className={s.sort_option}
							disabled
						>
							sort
						</option>
						<option value='A-Z' className={s.sort_option}>
							Title (A-Z)
						</option>
						<option value='Z-A' className={s.sort_option}>
							Title (Z-A)
						</option>
						<option value='date-latest' className={s.sort_option}>
							Date(latest first)
						</option>
						<option value='date-oldest' className={s.sort_option}>
							Date(oldest first)
						</option>
					</select>
				</div>
			</div>
			{events && (
				<div className={s.event_list_container}>
					<div className={s.event_list_head}>
						<span className={s.column}>Sl.no</span>
						<span className={s.column}>Title</span>
						<span className={s.column}>Actions</span>
					</div>

					<div className={s.row}>
						{events.map((event, index) => (
							<AdminEventRow
								style={s}
								event={event}
								sl={index + 1}
								key={event._id}
							/>
						))}
					</div>
				</div>
			)}
			{!events && (
				<h2
					style={{
						color: 'white',
						borderRadius: '5px',
						marginTop: '10px',
						padding: '10px',
						background: 'grey',
					}}
					id='loading-text'
				>
					Loading Events...
				</h2>
			)}

			{events && events.length === 0 && (
				<div className={s.row}>
					<h3
						style={{
							color: 'white',
							borderRadius: '5px',
							marginTop: '10px',
							padding: '10px',
							background: 'grey',
						}}
						id='noevent-text'
					>
						No events show! Create one
					</h3>
				</div>
			)}
			<Pagination total={eventsCount} limit={3} s={s} />
		</div>
	);
}

export default connect(null, { getEvents })(AdminHome);
