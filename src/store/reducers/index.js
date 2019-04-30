import { combineReducers } from 'redux';
import data from './dataReducer';
import types from './typesReducer';
import headers from './headersReducer';

export const rootReducer = combineReducers({
	data,
	types,
	headers
});

export default rootReducer;
