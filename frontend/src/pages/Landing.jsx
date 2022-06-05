import styles from '../css/landing.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Landing() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		role: 'student',
	});

	const { email, password, role } = formData;

	const change = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const submit = (e) => {
		e.preventDefault();
	};

	const changeToFacultySignin = () => {
		document
			.getElementById('student-category-btn')
			.classList.remove(`${styles.active}`);
		document
			.getElementById('faculty-category-btn')
			.classList.add(`${styles.active}`);
		document.getElementById('student-signin-btn').style.display = 'none';
		document.getElementById('faculty-signin-btn').style.display = 'block';
		document.querySelector('#foot-link').textContent = '';
		setFormData((prevState) => ({
			...prevState,
			role: 'faculty',
		}));
	};

	const changeToStudentSignin = () => {
		document
			.getElementById('faculty-category-btn')
			.classList.remove(`${styles.active}`);
		document
			.getElementById('student-category-btn')
			.classList.add(`${styles.active}`);
		document.getElementById('faculty-signin-btn').style.display = 'none';
		document.getElementById('student-signin-btn').style.display = 'block';
		document.querySelector(
			'#foot-link'
		).textContent = `Doesn't have an account? Sign Up`;
		setFormData((prevState) => ({
			...prevState,
			role: 'student',
		}));
	};

	const signForm = (
		<div onSubmit={submit} className={styles.form_container}>
			<form className={styles.form}>
				<div className={styles.form_data}>
					<label htmlFor='student-email' className={styles.form_label}>
						E-mail
					</label>
					<input
						type='email'
						id='student-email'
						name='email'
						value={email}
						className={styles.form_input}
						placeholder='ex: harry.19.bece@acharya.ac.in'
						onChange={change}
						required
					/>
				</div>
				<div className='form-data'>
					<label htmlFor='student-password' className={styles.form_label}>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='student-password'
						value={password}
						className={styles.form_input}
						onChange={change}
						placeholder='Enter your password'
						required
					/>
				</div>
				<input type='hidden' name='role' value={role} />
				<Link to='/register' id='foot-link' className={styles.foot_link}>
					Doesn't have an account? Sign Up
				</Link>
				<input
					type='submit'
					value='Student Sign In'
					id='student-signin-btn'
					className={styles.form_btn}
					// onClick={studentSubmit}
				/>
				<input
					type='submit'
					value='Faculty Sign In'
					id='faculty-signin-btn'
					className={`${styles.form_btn} ${styles.faculty_signin_btn}`}
					// onClick={facultySubmit}
				/>
			</form>
		</div>
	);
	return (
		<div style={{ height: '100%' }}>
			<div className={styles.top_header}>
				<Link to='/home' className={styles.appname}>
					College Event management
				</Link>
			</div>
			<div className={styles.landing_content}>
				<div className={styles.form_box}>
					<div className={styles.header}>
						<h1>Sign In</h1>
						<h2>Welcome again!</h2>
					</div>
					<div className={styles.body}>
						<div className={styles.form_card}>
							<div className={styles.card_header}>
								<button
									type='button'
									id='student-category-btn'
									onClick={changeToStudentSignin}
									className={`${styles.category_btn} ${styles.active}`}
								>
									Student
								</button>
								<button
									type='button'
									onClick={changeToFacultySignin}
									id='faculty-category-btn'
									className={styles.category_btn}
								>
									Faculty
								</button>
							</div>
							<div className={styles.card_body}>{signForm}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Landing;
