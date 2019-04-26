import * as actions from '../actionTypes';
import { loadTypesSuccess } from './typesActions';
import { loadHeadersSuccess } from './headersActions';
import * as dataService from '../../services/dataService';
import getDataKeysAndTypes from '../../services/dataKeysService'

export function loadData100() {
	return function (dispatch) {
		loadReports(dispatch, 100);
	}
}

export function loadData1000() {
	return function (dispatch) {
		loadReports(dispatch, 1000);
	}
}

export function loadData10000() {
	return function (dispatch) {
		loadReports(dispatch, 10000);
	}
}

function loadDataSuccess(data) {
	return { type: actions.LOAD_DATA_SUCCESS, data };
}

function loadReports(dispatch, count) {
	const method = `getReports${count}`;
	const data = dataService[method]();
	const [headers, types] = getDataKeysAndTypes(data);

	dispatch(loadDataSuccess(data));
	dispatch(loadTypesSuccess(types));
	dispatch(loadHeadersSuccess(headers));
}
