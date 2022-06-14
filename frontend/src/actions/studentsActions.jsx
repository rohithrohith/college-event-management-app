import { GET_BRANCH_STUDENTS } from './types';
import axios from 'axios';
import { displayMsg } from '../utils';
const API_URI = 'http://localhost:5500/api/students/';

export const getBranchStudents = (branch) => async (dispatch) => {
	try {
		const students = await axios.get(API_URI + `branch/${branch}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		if (students) {
			dispatch({ type: GET_BRANCH_STUDENTS, students: students.data });
		}
	} catch (err) {
		displayMsg(err);
	}
};
