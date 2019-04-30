import { LOAD_DATA_SUCCESS } from '../actionTypes';

export default function headersReducer(state = {}, action) {
	if (action.type === LOAD_DATA_SUCCESS) {
		return action.headers;
	}
	
	return state;
}
