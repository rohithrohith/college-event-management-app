import s from '../css/otpVerify.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux';
import { verifyStudent } from '../actions/authActions';
import { displayMsg } from '../utils';

function OtpVerify() {
	const userData = useSelector((state) => state.user.signedIn);
	const [otp, setOtp] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { email } = useParams();

	useEffect(() => {
		if (userData.isVerified == null) {
			navigate('/');
		} else if (userData.isVerified == false) {
			navigate('/verify/' + userData.email);
		} else if (userData.isVerified == true) {
			displayMsg('E-mail verified login now');
			navigate('/');
		}
	}, [userData.isVerified]);

	const change = (e) => {
		setOtp((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		try {
			e.target.nextSibling.focus();
		} catch (err) {}
	};

	const submitOtp = (e) => {
		e.preventDefault();
		const enteredOtp = parseInt(`${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}`);
		const email = window.location.pathname.split('/')[2];
		dispatch(verifyStudent(enteredOtp, email));
	};
	return (
		<>
			<div className={s.otp_form_container}>
				<div className={s.otp_form_card}>
					<h1>Verify your E-mail</h1>
					<span>Enter the 4 digit OTP sent to your E-mail</span>
					<form onSubmit={submitOtp} method='post'>
						<div className={s.otp_form}>
							<input
								type='text'
								pattern='[0-9]'
								onChange={change}
								placeholder='0'
								maxLength='1'
								className={s.otp_input}
								name='otp1'
								autoFocus
								required
							/>
							<input
								type='text'
								pattern='[0-9]'
								placeholder='0'
								maxLength='1'
								className={s.otp_input}
								onChange={change}
								name='otp2'
								required
							/>
							<input
								type='text'
								pattern='[0-9]'
								placeholder='0'
								maxLength='1'
								className={s.otp_input}
								name='otp3'
								onChange={change}
								required
							/>
							<input
								type='text'
								pattern='[0-9]'
								placeholder='0'
								maxLength='1'
								className={s.otp_input}
								name='otp4'
								onChange={change}
								required
							/>
						</div>
						<input type='submit' className={s.submit_btn} value='Submit' />
					</form>
				</div>
			</div>
		</>
	);
}

export default connect(null, { verifyStudent })(OtpVerify);
