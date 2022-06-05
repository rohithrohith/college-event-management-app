import s from '../css/addModerator.module.css';

function AddModerator() {
	return (
		<div>
			<h1>AddModerator</h1>
			<form method='post' className={s.add_form}>
				<div className={s.form_data}>
					<label htmlFor='mod-name' className={s.form_label}>
						Name
					</label>
					<input
						type='text'
						name='mod-name'
						placeholder='Enter faculty name'
						required
						className={s.form_input}
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
						name='mod-email'
						required
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
						name='mod-password'
						placeholder='Enter faculty password'
						required
						className={s.form_input}
					/>
				</div>
				<div>
					<label htmlFor='branch' className={s.form_label}>
						Branch
					</label>
					<select name='branch' id='branch' className={s.select_input}>
						<option className={s.select_option} selected value=''>
							-Select-
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
						<option className={s.select_option} value='MI'>
							MI
						</option>
					</select>
				</div>

				<input type='submit' value='Add moderator' className={s.form_btn} />
			</form>
		</div>
	);
}

export default AddModerator;
