import { FETCH_EVENTS, FETCH_EVENT } from '../actions/types';

const initState = { events: [], event: {}, eventsCount: 0 };

const eventsReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_EVENTS: {
			const newState = {
				...state,
				events: [...action.events],
				eventsCount: action.count,
			};
			return newState;
		}
		case FETCH_EVENT: {
			const newState = { ...state, event: [action.event] };
			return newState;
		}
		default:
			return state;
	}
};

export default eventsReducer;
