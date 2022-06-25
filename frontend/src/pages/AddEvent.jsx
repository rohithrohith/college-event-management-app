import s from '../css/addEvent.module.css';
import { FaFileUpload, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { displayMsg } from '../utils';
import axios from 'axios';

const API_URI = 'http://localhost:5500/api/';

function AddEvent() {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		lastDate: '',
		eventOn: '',
		eventThumb: '',
	});

	const loadFile = (event) => {
		console.log(event.target.files[0]);
		var reader = new FileReader();
		reader.onload = function () {
			var output = document.getElementById('output');
			output.src = reader.result;
			document.getElementById('file-choose-text').textContent = 'Change';
			document.getElementById('preview-text').style.display = 'block';
			setFormData((prevState) => ({
				...prevState,
				[event.target.name]: event.target.files[0],
			}));
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const change = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const submit = async (e) => {
		e.preventDefault();
		if (
			parseInt(new Date(formData.lastDate).getTime()) <
				parseInt(new Date().getTime()) ||
			parseInt(new Date(formData.eventOn).getTime()) <
				parseInt(new Date().getTime()) ||
			parseInt(new Date(formData.lastDate).getTime()) >
				parseInt(new Date(formData.eventOn).getTime())
		)
			displayMsg('Events date sequence is wrong!');
		else {
			if (formData.description.split(' ').length < 100) {
				displayMsg('Description must contain 100 words!');
			} else {
				const data = new FormData();
				data.append('title', formData.title);
				data.append('description', formData.description);
				data.append('eventOn', formData.eventOn);
				data.append('lastDate', formData.lastDate);
				data.append('eventThumb', formData.eventThumb);
				try {
					const res = await axios.post(
						`http://localhost:5500/api/events/`,
						data,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					);
					if (res) {
						displayMsg(`Event ${formData.title} added successfully`);
						setFormData({
							title: '',
							description: '',
							lastDate: '',
							eventOn: '',
							eventThumb: '',
						});
						document.getElementById('event-thumb').value = '';
						document.getElementById('output').src = '';
						document.getElementById('file-choose-text').textContent =
							'Choose thumbnail';
						document.getElementById('preview-text').style.display = 'none';
					}
				} catch (err) {
					displayMsg(err);
				}
			}
		}
	};

	return (
		<div>
			<h1>Add new event</h1>
			<form
				method='post'
				className={s.add_form}
				id='form'
				onSubmit={submit}
				encType='multipart/form-data'
			>
				<div className={s.form_data}>
					<label htmlFor='title' className={s.form_label}>
						Title
					</label>
					<input
						type='text'
						placeholder='Enter event title'
						onChange={change}
						className={s.form_input}
						name='title'
						value={formData.title}
						required
					/>
				</div>
				<div className={s.form_data}>
					<label htmlFor='event-desc' className={s.form_label}>
						Event desc
					</label>
					<textarea
						name='description'
						onChange={change}
						value={formData.description}
						required
						className={`${s.form_input} ${s.textarea}`}
						id='event-desc'
						placeholder='Provide atleast 100 word description for the event'
					></textarea>
				</div>
				<div className={s.form_data}>
					<label htmlFor='event-thumb' className={s.form_label}>
						Add Thumbnail
					</label>
					<div className={s.file_input_container}>
						<div className={s.file_input_overlay}>
							<h3 id='file-choose-text'>Choose thumbnail</h3>
							<FaFileUpload />
						</div>
						<input
							type='file'
							required
							name='eventThumb'
							className={s.file_input}
							onChange={loadFile}
							id='event-thumb'
						/>
					</div>
					<span
						style={{ marginTop: '10px', display: 'none' }}
						id='preview-text'
					>
						Selected thumbnail
					</span>
				</div>
				<div>
					<img id='output' className={s.preview_img} />
				</div>
				<div>
					<label htmlFor='end-date' className={s.form_label}>
						Registration last date
					</label>
					<input
						type='date'
						onChange={change}
						value={formData.lastDate}
						required
						className={s.date_input}
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
						className={s.date_input}
						value={formData.eventOn}
						onChange={change}
						required
						name='eventOn'
						id='event-date'
					/>
				</div>
				<button type='submit' className={s.form_btn}>
					<FaPlus style={{ marginRight: '10px', fontSize: '12px' }} />
					Add Event
				</button>
			</form>
		</div>
	);
}

export default AddEvent;
