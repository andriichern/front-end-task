import * as actions from '../actionTypes';

export default function reportsReducer(state = {}, action) {
	if (action.type === actions.LOAD_TYPES_SUCCESS) {
		return {
			...action.types,
		}
	}
	
	return state;
}