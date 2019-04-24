import { combineReducers } from 'redux';
import headers from './headersReducer';
import reports from './reportsReducer';
import types from './typesReducer';

export const rootReducer = combineReducers({
	headers,
	reports,
	types
});

export default rootReducer;
