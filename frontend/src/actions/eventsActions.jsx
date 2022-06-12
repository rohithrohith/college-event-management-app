import { FETCH_EVENT, FETCH_EVENTS, STORE_USER } from './types';
import axios from 'axios';
import { displayMsg } from '../utils';
const API_URI = 'http://localhost:5500/api/events/';

export const getEvents = () => async (dispatch) => {
	try {
		const res = await axios.get(API_URI, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		dispatch({ type: FETCH_EVENTS, events: res.data.events });
		dispatch({ type: STORE_USER, accountData: res.data.user });
	} catch (err) {
		displayMsg(err.response.message);
	}
};

export const getEvent = (id) => async (dispatch) => {
	try {
		const res = await axios.get(API_URI + String(id), {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		dispatch({ type: FETCH_EVENT, event: res.data });
	} catch (err) {}
};
