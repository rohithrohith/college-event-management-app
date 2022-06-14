import { useParams } from 'react-router-dom';
import s from '../css/event.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEvent } from '../actions/eventsActions';
import { displayMsg } from '../utils';

function Event() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const event = useSelector((state) => state.events.event[0]);
	const user = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		dispatch(getEvent(id));
	}, []);

	const participate = async (id, branch) => {
		console.log(id, branch);
		try {
			const res = await axios.post(
				'http://localhost:5500/api/events/participate',
				{
					eventId: id,
					branch,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
		} catch (err) {
			displayMsg(err.response.data.message);
		}
	};
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
					{user && user.role === 'STUDENT' && (
						<button
							className={s.register_btn}
							onClick={() => {
								participate(event._id, user.branch);
							}}
						>
							Participate
						</button>
					)}
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
