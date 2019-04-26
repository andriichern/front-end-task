import * as actions from '../actionTypes';

export default function dataReducer(state = [], action) {
	if (action.type === actions.LOAD_DATA_SUCCESS) {
		return action.data;
	} else {
		return state;
	}
}
