import * as actions from '../actionTypes';

export function loadTypesSuccess(types) {
	return { type: actions.LOAD_TYPES_SUCCESS, types };
}