import { STORE_USER, VERIFY_OTP, GET_USER } from './types';
import axios from 'axios';
import { displayMsg } from '../utils';
const API_URI = 'http://localhost:5500/api/students/';

export const signinUser = (user) => {
	return async (dispatch) => {
		let account;
		if (user.role === 'student') {
			try {
				account = await axios.post(API_URI + 'login', user);
			} catch (err) {
				displayMsg(err.response.data.message);
			}
		} else {
			try {
				account = await axios.post(
					'http://localhost:5500/api/users/' + 'login',
					user
				);
			} catch (err) {
				displayMsg(err.response.data.message);
			}
		}

		if (account) {
			const accountData = account.data;
			dispatch({ type: STORE_USER, accountData });
		}
	};
};

export const verifyStudent = (otp, email) => async (dispatch) => {
	let res;
	try {
		res = await axios.put(API_URI + 'verify/' + email, { otp });
		const data = res.data;
		dispatch({ type: VERIFY_OTP, data });
	} catch (err) {
		const msg = err.response.data.message;
		if (msg == 'No OTP') {
			const data = { isVerified: null };
			dispatch({ type: VERIFY_OTP, data });
		} else {
			displayMsg(msg);
		}
	}
};

export const registerStudent = (data) => async (dispatch) => {
	try {
		const res = await axios.post(API_URI, data);
		window.location.pathname = '/';
	} catch (err) {
		displayMsg(err.response.data.message);
	}
};

export const getUser = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:5500/api/users/profile', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		dispatch({ type: GET_USER, user: res.data });
	} catch (err) {
		let msg = null;
		try {
			msg = err.response.data.message;
		} catch (err2) {
			msg = err.message;
		}

		if (msg === 'Not authorized!') {
			console.log(msg);
			window.location.pathname = '/';
		} else if (msg === 'Network Error') {
			displayMsg(msg);
		}
	}
};
