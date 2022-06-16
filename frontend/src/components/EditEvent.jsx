import { useState } from 'react';
import s from '../css/addEvent.module.css';
import axios from 'axios';
import { displayMsg } from '../utils';
import { useDispatch, connect } from 'react-redux';
import { getEvent } from '../actions/eventsActions';

const API_URI = 'http://localhost:5500/api/';

function EditEvent({ event }) {
	const [formData, setFormData] = useState(event);
	const dispatch = useDispatch();
	const change = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const submitChange = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`${API_URI}events/${event._id}`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (res) {
				dispatch(getEvent());
				document.getElementById('edit-window').style.display = 'none';
				window.location.hash = '';
			}
		} catch (err) {
			displayMsg(err.response.data.message);
		}
	};
	return (
		<>
			<>
				<div className={s.edit_card}>
					<h2 style={{ color: 'var(--primary)' }}>Update event</h2>
					<h1 style={{ textTransform: 'capitalize', marginTop: '10px' }}>
						{' '}
						{event.title}
					</h1>
					<form method='post' onSubmit={submitChange} className={s.add_form}>
						<div className={s.form_data}>
							<label htmlFor='title' className={s.form_label}>
								Title
							</label>
							<input
								type='text'
								required
								value={formData.title}
								onChange={change}
								placeholder='Enter event title'
								className={s.form_input}
								name='title'
							/>
						</div>
						<div className={s.form_data}>
							<label htmlFor='event-desc' className={s.form_label}>
								Event desc
							</label>
							<textarea
								name='description'
								className={`${s.form_input} ${s.textarea}`}
								value={formData.description}
								onChange={change}
								required
								id='event-desc'
								placeholder='Provide atleast 100 word description for the event'
							></textarea>
						</div>
						<div>
							<label htmlFor='end-date' className={s.form_label}>
								Registration last date
							</label>
							<input
								type='date'
								className={s.date_input}
								onChange={change}
								value={formData.lastDate.split('T')[0]}
								required
								name='lastDate'
								id='end-date'
							/>
						</div>
						<div style={{ marginTop: '20px' }}>
							<label htmlFor='event-date' className={s.form_label}>
								Event date
							</label>
							<input
								type='date'
								required
								className={s.date_input}
								onChange={change}
								value={formData.eventOn.split('T')[0]}
								name='eventOn'
								id='event-date'
							/>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<button
								type='submit'
								style={{ marginBottom: '0' }}
								className={s.form_btn}
							>
								Update Event
							</button>
							<button
								type='button'
								style={{ marginBottom: '0' }}
								className={`${s.form_btn} ${s.cancel_btn}`}
								onClick={() => {
									document.getElementById('edit-window').style.display = 'none';
									document.location.hash = '';
								}}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</>
		</>
	);
}

export default connect(null, { getEvent })(EditEvent);
