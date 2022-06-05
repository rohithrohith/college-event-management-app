import { useParams } from 'react-router-dom';
import s from '../css/addEvent.module.css';

function UpdateEvent() {
	const { id } = useParams();
	return (
		<div>
			<h1>Update {id}</h1>
			<form method='post' className={s.add_form}>
				<div className={s.form_data}>
					<label htmlFor='title' className={s.form_label}>
						Title
					</label>
					<input
						type='text'
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
						name='event-desc'
						className={`${s.form_input} ${s.textarea}`}
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
						name='end-date'
						id='end-date'
					/>
				</div>
				<div style={{ marginTop: '20px' }}>
					<label htmlFor='event-date' className={s.form_label}>
						Event date
					</label>
					<input
						type='date'
						className={s.date_input}
						name='event-date'
						id='event-date'
					/>
				</div>
				<input type='submit' value='Update Event' className={s.form_btn} />
			</form>
		</div>
	);
}

export default UpdateEvent;
