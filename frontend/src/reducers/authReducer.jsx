import {
	STORE_USER,
	VERIFY_OTP,
	GET_USER,
	REGISTER_STUDENT,
} from '../actions/types';

const initState = {
	signedIn: {
		name: null,
		email: null,
		role: null,
		isVerified: null,
		isApproved: null,
		token: null,
	},
	currentUser: {
		name: null,
		email: null,
		role: null,
		isVerified: null,
		isApproved: null,
	},
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case STORE_USER: {
			const newState = {
				...state,
				signedIn: {
					name: action.accountData.name,
					email: action.accountData.email,
					role: action.accountData.role,
					isVerified: action.accountData.isVerified,
					token: action.accountData.token,
				},
			};
			return newState;
		}
		case VERIFY_OTP: {
			const newState = {
				...state,
				signedIn: { isVerified: action.data.isVerified },
			};
			return newState;
		}
		case GET_USER: {
			console.log(action.student);
			const newState = {
				...state,
				currentUser: {
					name: action.student.name,
					email: action.student.email,
					role: action.student.role,
					isVerified: action.student.isVerified,
					isApproved: action.student.isApproved,
				},
			};
			return newState;
		}
		case REGISTER_STUDENT: {
			return state;
		}
		default:
			return state;
	}
};

export default authReducer;
