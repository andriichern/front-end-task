import * as actions from '../actionTypes';

export default function reportsReducer(state = {}, action) {
	if (action.type === actions.LOAD_HEADERS_SUCCESS) {
		return {
			...action.headers,
		}
	} else {
		return state;
	}
}