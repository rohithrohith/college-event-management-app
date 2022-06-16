import { FETCH_EVENT, FETCH_EVENTS, STORE_USER } from './types';
import axios from 'axios';
import { displayMsg } from '../utils';
const API_URI = 'http://localhost:5500/api/events/';

export const getEvents = (options) => async (dispatch) => {
	let url = API_URI;
	if (options) {
		if (options.sort) {
			if (options.sort === 'A-Z') {
				url += `?sort=title&order=1`;
			} else if (options.sort === 'Z-A') {
				url += `?sort=title&order=-1`;
			} else if (options.sort === 'date-latest') {
				url += `?sort=createdAt&order=-1`;
			} else if (options.sort === 'date-oldest') {
				url += `?sort=createdAt&order=1`;
			}
			if (options.page && options.limit) {
				url += `&page=${options.page}&limit=${options.limit}`;
			}
		} else if (options.page >= 0 && options.limit) {
			url += `?page=${options.page}&limit=${options.limit}`;
		}
	}
	try {
		const res = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: FETCH_EVENTS,
			events: res.data.events,
			count: res.data.eventsCount,
		});
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
