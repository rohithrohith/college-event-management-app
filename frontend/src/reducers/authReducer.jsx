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
		role: ' ',
		isVerified: null,
		isApproved: null,
		branch: null,
		participatedEvents: null,
	},
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case STORE_USER: {
			if (
				action.accountData.role === 'MODERATOR' ||
				action.accountData.role === 'ADMIN'
			) {
				const newState = {
					...state,
					signedIn: {
						name: action.accountData.name,
						email: action.accountData.email,
						role: action.accountData.role,
						isVerified: true,
						token: action.accountData.token,
					},
				};
				return newState;
			} else {
				const newState = {
					...state,
					signedIn: {
						name: action.accountData.name,
						email: action.accountData.email,
						role: action.accountData.role,
						isVerified: action.accountData.isVerified,
						token: action.accountData.token,
						participatedEvents: action.accountData.participatedEvents,
					},
				};
				return newState;
			}
		}
		case VERIFY_OTP: {
			const newState = {
				...state,
				signedIn: { isVerified: action.data.isVerified },
			};
			console.log(newState);
			return newState;
		}
		case GET_USER: {
			const newState = {
				...state,
				currentUser: {
					name: action.user.name,
					email: action.user.email,
					role: action.user.role,
					isVerified:
						action.user.role === 'STUDENT' ? action.user.isVerified : true,
					isApproved:
						action.user.role === 'STUDENT' ? action.user.isApproved : true,
					branch: action.user.branch,
					participatedEvents:
						action.user.role === 'STUDENT'
							? action.user.participatedEvents.length !== 0
								? action.user.participatedEvents
								: null
							: null,
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
