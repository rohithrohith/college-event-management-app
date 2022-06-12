import { useParams } from 'react-router-dom';
import s from '../css/event.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEvent } from '../actions/eventsActions';

function Event() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const event = useSelector((state) => state.events.event[0]);
	useEffect(() => {
		dispatch(getEvent(id));
	}, []);
	return (
		<>
			{event && (
				<>
					<h1 className={s.event_title}>{event.title}</h1>
					<hr className={s.divider} />
					<div className={s.date}>
						<b>Event on: {event.eventOn.split('T')[0]}</b>
					</div>
					<div className={s.date}>
						<b>Last date to register: {event.lastDate.split('T')[0]}</b>
					</div>
					<div className={s.event_desc}>{event.description}</div>
					<Link to='/' className={s.register_btn}>
						Register
					</Link>
				</>
			)}
			{!event && (
				<>
					<div>
						<h1 style={{ color: 'rgba(0,0,0,0.7)' }}>Event not found</h1>
						<Link
							to={'/home'}
							style={{
								display: 'block',
								padding: '10px',
								background: 'var(--dark)',
								color: 'var(--light)',
								width: 'fit-content',
								marginTop: '10px',
								borderRadius: '5px',
							}}
						>
							Back to home
						</Link>
					</div>
				</>
			)}
		</>
	);
}

export default connect(null, { getEvent })(Event);

{
	/* <div>
			
		</div> */
}
