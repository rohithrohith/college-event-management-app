import { Link } from 'react-router-dom';

function EventRow({ style, event }) {
	return (
		<>
			<div className={style.event}>
				<div className={style.event_details}>
					<div className={style.event_title}>{event.title}</div>
					<span>-{event.eventOn.split('T')[0]}</span>
				</div>
				<span className={style.event_actions}>
					<Link to={`/event/${event.id}`} className={style.view_link}>
						View
					</Link>
				</span>
			</div>
		</>
	);
}

export default EventRow;
