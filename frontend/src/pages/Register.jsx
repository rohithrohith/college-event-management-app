import styles from '../css/landing.module.css';
import { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { registerStudent } from '../actions/authActions';
import { displayMsg } from '../utils';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		branch: '-select-',
	});

	const dispatch = useDispatch();

	const { name, email, password, confirmPassword, branch } = formData;

	const change = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const submit = (e) => {
		e.preventDefault();
		if (formData.branch === '-select-') displayMsg('Please select the branch');
		else {
			if (formData.password !== formData.confirmPassword)
				displayMsg("Passwords doesn't match");
			else {
				dispatch(registerStudent(formData));
			}
		}
	};

	const studentRegisterForm = (
		<div className={styles.form_container}>
			<form action='/' className={styles.form} onSubmit={submit}>
				<div className={styles.form_data}>
					<label htmlFor='student-name' className={styles.form_label}>
						Name
					</label>
					<input
						type='text'
						id='student-name'
						className={styles.form_input}
						onChange={change}
						name='name'
						value={name}
						placeholder='ex: Harry'
						required
					/>
				</div>
				<div className={styles.form_data}>
					<label htmlFor='student-email' className={styles.form_label}>
						E-mail
					</label>
					<input
						type='email'
						id='student-email'
						onChange={change}
						name='email'
						className={styles.form_input}
						placeholder='ex: harry.19.bece@acharya.ac.in'
						value={email}
						required
					/>
				</div>
				<div className={styles.form_data}>
					<label htmlFor='student-password' className={styles.form_label}>
						Password
					</label>
					<input
						type='password'
						id='student-password'
						name='password'
						className={styles.form_input}
						placeholder='Enter your password'
						onChange={change}
						value={password}
						required
					/>
				</div>
				<div className={styles.form_data}>
					<label
						htmlFor='student-confirm-password'
						className={styles.form_label}
					>
						Confirm password
					</label>
					<input
						type='password'
						id='student-confirm-password'
						name='confirmPassword'
						className={styles.form_input}
						placeholder='Confirm your password'
						onChange={change}
						value={confirmPassword}
						required
					/>
				</div>
				<div className={styles.form_data}>
					<label htmlFor='branch' className={styles.form_label}>
						Branch
					</label>
					<select
						onChange={change}
						name='branch'
						id='branch'
						type='select'
						defaultValue={branch}
						required
						className={styles.select_input}
					>
						<option className={styles.select_option} value='-select-' disabled>
							-Select-
						</option>
						<option className={styles.select_option} value='CSE'>
							CSE
						</option>
						<option className={styles.select_option} value='ISE'>
							ISE
						</option>
						<option className={styles.select_option} value='ECE'>
							ECE
						</option>
						<option className={styles.select_option} value='ME'>
							ME
						</option>
						<option className={styles.select_option} value='AE'>
							AE
						</option>
						<option className={styles.select_option} value='MT'>
							MT
						</option>
						<option className={styles.select_option} value='EEE'>
							EEE
						</option>
						<option className={styles.select_option} value='AI/ML'>
							AI/ML
						</option>
						<option className={styles.select_option} value='CIV'>
							CIV
						</option>
					</select>
				</div>
				<input
					type='submit'
					value='Register'
					id='student-signup-btn'
					className={`${styles.form_btn} ${styles.student_signin_btn}`}
				/>
			</form>
		</div>
	);
	return (
		<div style={{ height: '100%' }}>
			<div className={styles.top_header}>
				<span to='/' className={styles.appname}>
					College Event management
				</span>
			</div>

			<div className={styles.register_content}>
				<div className={styles.form_box}>
					<div className={styles.header}>
						<h1>Register</h1>
						<h2>Join now to participate!</h2>
					</div>
					<div className={styles.body}>
						<div className={styles.card_body}>{studentRegisterForm}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default connect(null, { registerStudent })(Register);
