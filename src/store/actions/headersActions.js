import * as actions from '../actionTypes';

export function loadHeadersSuccess(headers) {
	return { type: actions.LOAD_HEADERS_SUCCESS, headers };
}
