import { GET_BRANCH_STUDENTS, APPROVE_STUDENT } from '../actions/types';

const initState = {
	newStudents: null,
	approvedStudents: null,
};

const studentsReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_BRANCH_STUDENTS: {
			let newState = {
				...state,
			};

			newState = {
				...state,
				newStudents:
					action.students.notYetApprovedStudents.length !== 0
						? action.students.notYetApprovedStudents
						: null,
				approvedStudents:
					action.students.approvedStudents.length !== 0
						? action.students.approvedStudents
						: null,
			};
			return newState;
		}
		default:
			return state;
	}
};

export default studentsReducer;
