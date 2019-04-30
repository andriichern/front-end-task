import { LOAD_DATA_SUCCESS } from '../actionTypes';

export default function typesReducer(state = {}, action) {
	if (action.type === LOAD_DATA_SUCCESS) {
		return action.types;
	}
	
	return state;
}
