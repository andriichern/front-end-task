import * as actions from '../actionTypes';

export default function reportsReducer(state = [], action) {
	if (action.type === actions.LOAD_REPORTS_SUCCESS) {
		return action.reports;
	} else {
		return state;
	}
}
