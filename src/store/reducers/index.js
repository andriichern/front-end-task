import { combineReducers } from 'redux';
import headers from './headersReducer';
import reports from './reportsReducer';

export const rootReducer = combineReducers({
	headers,
	reports
});

export default rootReducer;