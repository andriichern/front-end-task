import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as reportActions from '../../store/actions/reportsActions';
import Spinner from '../common/Spinner.jsx'
import TableComponent from './TableComponent.jsx';
import TableSettings from './TableSettingsComponent.jsx';

const TableLibraryPage = ({ headers, reports, ...props }) => {
	const [filter, setFilter] = useState({});
	const [showAll, setShowAll] = useState(false);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
        if (!hasData()) {
			props.load100();
		}
	}, [reports]);

	useEffect(() => {
		if (hasData()) {
			filterHeaders();			
		}		
	}, [showAll, headers]);

	useEffect(() => {
		if (hasData()) {
			filterData();
		}
	}, [reports, filter]);

	function hasData() {
		return reports.length !== 0;
	}
	
	function filterHeaders() {
		let filtered = [];
		const headerEntries = Object.entries(headers);
		headerEntries.map(([key, display]) => {
			if (display || showAll) {
				filtered.push(key);
			}
		})
		setTableHeaders(filtered);
	}
	
	function filterData() {
		const { key, text } = filter;
		let result;
		if (key && text) {
			result = reports.filter(report => report[key] && report[key].includes(text));
		} else {
			result = reports;
		}
		setTableData(result);
	}

	function handleFilter(filter) {
		setFilter(filter);
	}

	function handleShowAll () {
        setShowAll(prevValue => {
			return !prevValue;			
		});
	}

	return (
		<>
		{!hasData() 
			? (<Spinner />) 
			: (<>
				<TableSettings
					headers={tableHeaders}
					onShowAll={handleShowAll}
					onFilter={handleFilter} />
				<TableComponent 
					headers={tableHeaders}
					columns={tableData} />
			</>)}
		</>
	);
}

function mapStateToProps(state) {
	return {
		headers: state.headers,
		reports: state.reports
	}
}

const mapDispatchToProps = {
	load100: reportActions.loadReports100,
	load1000: reportActions.loadReports1000,
	load10000: reportActions.loadReports10000
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TableLibraryPage);