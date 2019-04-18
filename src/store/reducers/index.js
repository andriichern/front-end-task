import { combineReducers } from 'redux';
import reports from './reportsReducer';
import headers from './headersReducer';

const rootReducer = combineReducers({
	reports,
	headers
});

export default rootReducer;