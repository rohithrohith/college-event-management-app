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
		dispatch(getEvents(null));
	}, []);

	return (
		<div style={{ height: '100%' }}>
			<h2>Recent events</h2>

			{user && user.role === 'STUDENT' && user.isApproved && (
				<>
					<div className={s.recent_events}>
						{events &&
							events.map((event) => (
								<Event style={s} event={event} key={event._id} />
							))}
						{!events && (
							<h2 style={{ color: 'grey', padding: '10px' }}>
								Loading Events...
							</h2>
						)}
					</div>
				</>
			)}
			{user && user.role === 'STUDENT' && !user.isApproved && (
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
			{user && user.role === 'MODERATOR' && (
				<>
					<div className={s.recent_events}>
						{events &&
							events.map((event) => (
								<Event style={s} event={event} key={event._id} />
							))}
						{!events && (
							<h2 style={{ color: 'grey', padding: '10px' }}>
								Loading Events...
							</h2>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default connect(null, { getEvents })(Home);
