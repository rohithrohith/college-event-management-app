import s from '../css/participatedEvents.module.css';
import EventRow from '../components/EventRow';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getUser } from '../actions/authActions';
import { useEffect } from 'react';

function ParticipatedEvents() {
	const dispatch = useDispatch();
	const participatedEvents = useSelector(
		(state) => state.user.currentUser.participatedEvents
	);
	useEffect(() => {
		dispatch(getUser());
	}, []);
	return (
		<div>
			<h1>Events you participated</h1>

			<div className={s.events_list}>
				{participatedEvents &&
					participatedEvents.map((event) => (
						<EventRow event={event} style={s} key={event.id} />
					))}
				{!participatedEvents && (
					<h2 style={{ color: 'grey' }}>
						You haven't participated in any events
					</h2>
				)}
			</div>
		</div>
	);
}

export default connect(null, { getUser })(ParticipatedEvents);
