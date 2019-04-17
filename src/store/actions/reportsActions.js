import * as actions from '../actionTypes';
import * as reportService from '../../services/reportService';
import { getReportKeysForHeader } from '../../services/reportKeysService'

export function loadReportsSuccess(reports) {
	return { type: actions.LOAD_REPORTS_SUCCESS, reports };
}

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

function loadReports(dispatch, count) {
	const method = `getReports_${count}`;
	const reports = reportService[method]();
	const headers = getReportKeysForHeader(data);

	dispatch(loadReportsSuccess({ headers, reports }));
}
