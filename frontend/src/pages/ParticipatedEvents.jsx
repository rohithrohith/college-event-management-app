import s from '../css/participatedEvents.module.css';
import EventRow from '../components/EventRow';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ParticipatedEvents() {
	const participatedEvents = useSelector(
		(state) => state.user.currentUser.participatedEvents
	);
	useEffect(() => {
		console.log('PE ', participatedEvents);
	}, [participatedEvents]);
	return (
		<div>
			<h1>Events you participated</h1>

			<div className={s.events_list}>
				{participatedEvents &&
					participatedEvents.map((event) => (
						<EventRow event={event} style={s} key={event.id} />
					))}
				{/* {participatedEvents && participatedEvents.map((event) => event.title)} */}
				{!participatedEvents && (
					<h2 style={{ color: 'grey' }}>
						You haven't participated in any events
					</h2>
				)}
			</div>
		</div>
	);
}

export default ParticipatedEvents;
