import { combineReducers } from 'redux';
import reports from './reportsReducer';

const rootReducer = combineReducers({
	reports
});

export default rootReducer;