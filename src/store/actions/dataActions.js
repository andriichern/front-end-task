import * as actions from '../actionTypes';
import * as dataService from '../../services/dataService';
import getDataKeysAndTypes from '../../services/dataKeysService'

export function loadData100() {
	return function (dispatch) {
		loadData(dispatch, 100);
	}
}

export function loadData1000() {
	return function (dispatch) {
		loadData(dispatch, 1000);
	}
}

export function loadData10000() {
	return function (dispatch) {
		loadData(dispatch, 10000);
	}
}

function loadDataSuccess(data) {
	return { type: actions.LOAD_DATA_SUCCESS, ...data };
}

function loadData(dispatch, count) {
	const method = `getReports${count}`;
	const data = dataService[method]();
	const [headers, types] = getDataKeysAndTypes(data);

	dispatch(loadDataSuccess({ data, types, headers }));
}
