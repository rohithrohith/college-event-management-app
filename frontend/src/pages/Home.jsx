import s from '../css/home.module.css';
import Event from '../components/Event';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions';
import { useEffect } from 'react';

function Home() {
	const events = useSelector((state) => state.events.events);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEvents());
	}, []);

	return (
		<div style={{ height: '100%' }}>
			<h2>Recent events</h2>

			{user && user.role === 'student' && user.isApproved && (
				<>
					<div className={s.recent_events}>
						{events &&
							events.map((event) => (
								<Event style={s} event={event} key={event._id} />
							))}
					</div>
				</>
			)}
			{user && user.role === 'student' && !user.isApproved && (
				<>
					<div
						style={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<h1
							style={{
								textAlign: 'center',
								width: '100%',
								color: '#ccc',
								fontSize: '50px',
							}}
						>
							Please wait till your branch moderator approves your account to
							view events.
						</h1>
					</div>
				</>
			)}
			{user && user.role === 'moderator' && (
				<>
					<div className={s.recent_events}>
						{events &&
							events.map((event) => (
								<Event style={s} event={event} key={event._id} />
							))}
					</div>
				</>
			)}
		</div>
	);
}

export default connect(null, { getEvents })(Home);
