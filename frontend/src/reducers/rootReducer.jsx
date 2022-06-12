import eventsReducer from './eventsReducer';
import studentsReducer from './studentsReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	students: studentsReducer,
	events: eventsReducer,
	user: authReducer,
});

export default rootReducer;
