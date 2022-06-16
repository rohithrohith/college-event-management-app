import s from '../css/addModerator.module.css';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { displayMsg } from '../utils';
import axios from 'axios';

const API_URI = 'http://localhost:5500/api/';

function AddModerator() {
	const [formData, setFormData] = useState({
		modName: '',
		modEmail: '',
		modPassword: '',
		confirmModPassword: '',
		branch: '-select-',
	});

	const change = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const submit = async (e) => {
		e.preventDefault();
		if (formData.branch === '-select-') displayMsg('Please select the branch');
		else {
			if (formData.modPassword !== formData.confirmModPassword)
				displayMsg("Passwords doesn't match");
			else {
				try {
					console.log('try');
					const res = await axios.post(`${API_URI}users/`, formData, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					});
					if (res) {
						setFormData({
							modEmail: '',
							modName: '',
							modPassword: '',
							confirmModPassword: '',
							branch: '-select-',
						});
						document.getElementById('form').reset();
						displayMsg(
							res.data.message === 'success'
								? `Moderator ${res.data.name} added`
								: res.data.message
						);
					}
				} catch (err) {
					displayMsg(err.response.data.message);
				}
			}
		}
	};
	return (
		<div>
			<h1>AddModerator</h1>
			<form method='post' id='form' onSubmit={submit} className={s.add_form}>
				<div className={s.form_data}>
					<label htmlFor='modName' className={s.form_label}>
						Name
					</label>
					<input
						type='text'
						value={formData.modName}
						name='modName'
						placeholder='Enter faculty name'
						required
						className={s.form_input}
						onChange={change}
						id='mod-name'
					/>
				</div>
				<div className={s.form_data}>
					<label htmlFor='mod-email' className={s.form_label}>
						E-mail
					</label>
					<input
						type='email'
						placeholder='Enter faculty email'
						value={formData.modEmail}
						name='modEmail'
						required
						onChange={change}
						className={s.form_input}
						id='mod-email'
					/>
				</div>
				<div className={s.form_data}>
					<label htmlFor='mod-password' className={s.form_label}>
						Password
					</label>
					<input
						type='password'
						name='modPassword'
						value={formData.modPassword}
						onChange={change}
						placeholder='Enter faculty password'
						required
						className={s.form_input}
					/>
				</div>
				<div className={s.form_data}>
					<label htmlFor='mod-password' className={s.form_label}>
						Confirm password
					</label>
					<input
						type='password'
						name='confirmModPassword'
						value={formData.confirmModPassword}
						onChange={change}
						placeholder='Confirm password'
						required
						className={s.form_input}
					/>
				</div>
				<div>
					<label htmlFor='branch' className={s.form_label}>
						Branch
					</label>
					<select
						name='branch'
						defaultValue={formData.branch}
						id='branch'
						required
						onChange={change}
						className={s.select_input}
					>
						<option className={s.select_option} value='-select-' disabled>
							-select-
						</option>
						<option className={s.select_option} value='CSE'>
							CSE
						</option>
						<option className={s.select_option} value='ISE'>
							ISE
						</option>
						<option className={s.select_option} value='ECE'>
							ECE
						</option>
						<option className={s.select_option} value='ME'>
							ME
						</option>
						<option className={s.select_option} value='AE'>
							AE
						</option>
						<option className={s.select_option} value='MT'>
							MT
						</option>
						<option className={s.select_option} value='EEE'>
							EEE
						</option>
						<option className={s.select_option} value='AI/ML'>
							AI/ML
						</option>
						<option className={s.select_option} value='CIV'>
							CIV
						</option>
					</select>
				</div>

				<button type='submit' className={s.form_btn}>
					<FaUserPlus style={{ marginRight: '10px' }} />
					Add moderator
				</button>
			</form>
		</div>
	);
}

export default AddModerator;
