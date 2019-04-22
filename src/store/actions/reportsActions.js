import * as actions from '../actionTypes';
import { loadTypesSuccess } from './typesActions';
import { loadHeadersSuccess } from './headersActions';
import * as reportService from '../../services/reportService';
import { getReportKeysAndTypes } from '../../services/reportKeysService'

export function loadReports100() {
	return function (dispatch) {
		loadReports(dispatch, 100);
	}
}

export function loadReports1000() {
	return function (dispatch) {
		loadReports(dispatch, 1000);
	}
}

export function loadReports10000() {
	return function (dispatch) {
		loadReports(dispatch, 10000);
	}
}

function loadReportsSuccess(reports) {
	return { type: actions.LOAD_REPORTS_SUCCESS, reports };
}

function loadReports(dispatch, count) {
	const method = `getReports${count}`;
	const reports = reportService[method]();
	const [headers, types] = getReportKeysAndTypes(reports);

	dispatch(loadTypesSuccess(types));
	dispatch(loadHeadersSuccess(headers));
	dispatch(loadReportsSuccess(reports));
}
