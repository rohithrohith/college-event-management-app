import { useParams } from 'react-router-dom';
import s from '../css/event.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getEvent } from '../actions/eventsActions';
import { displayMsg, getBase64String } from '../utils';
import EditEvent from '../components/EditEvent';

function Event() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const event = useSelector((state) => state.events.event);
	const user = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		dispatch(getEvent(id));
	}, [event]);
	if (
		window.location.hash === '#edit' &&
		user &&
		user.role === 'ADMIN' &&
		document.getElementById('edit-window')
	) {
		document.getElementById('edit-window').style.display = 'flex';
	}

	const participate = async (id, branch, eventOn) => {
		try {
			const res = await axios.post(
				'http://localhost:5500/api/events/participate',
				{
					eventId: id,
					branch,
					eventDate: eventOn,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (res) {
				displayMsg('Registered for the event');
				navigate('/participated');
			}
		} catch (err) {
			displayMsg(err.response.data.message);
		}
	};
	return (
		<div>
			{event &&
				user.isApproved &&
				event.map((event) => (
					<div key={event._id}>
						<div className={s.edit_container} id='edit-window'>
							<EditEvent event={event} />
						</div>
						<div className={s.event_thumb_div}>
							<img
								src={`data:${
									event.thumbnail.contentType
								};base64,${getBase64String(event.thumbnail.data.data)}`}
								alt={event.thumbnail.name}
								className={s.event_thumb_img}
							/>
						</div>

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
									participate(
										event._id,
										user.branch,
										event.eventOn.split('T')[0]
									);
								}}
							>
								Participate
							</button>
						)}
						{user && user.role === 'ADMIN' && (
							<Link
								to='#edit'
								className={s.register_btn}
								onClick={() =>
									(document.getElementById('edit-window').style.display =
										'flex')
								}
							>
								Edit
							</Link>
						)}
					</div>
				))}
			{event && !user.isApproved && (
				<>
					<div>
						<h1 style={{ color: 'rgba(0,0,0,0.7)' }}>
							Please wait till your branch moderator approves your account to
							view events.
						</h1>
					</div>
				</>
			)}
			{!event && (
				<>
					<div>
						<h1 style={{ color: 'rgba(0,0,0,0.7)' }}>Loading event...</h1>
					</div>
				</>
			)}
			{event && event.length === 0 && (
				<>
					<div>
						<h1 style={{ color: 'rgba(0,0,0,0.7)' }}>Event not found</h1>
						<Link
							to={
								user.role === 'STUDENT' || user.role === 'MODERATOR'
									? '/home'
									: '/admin'
							}
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
		</div>
	);
}

export default connect(null, { getEvent })(Event);

{
	/* <div>
			
		</div> */
}
