import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as reportActions from '../../store/actions/reportsActions';
import * as filters from '../../services/filterService';
import Spinner from '../common/Spinner.jsx'
import TableComponent from './TableComponent.jsx';
import TableSettings from './TableSettingsComponent.jsx';

const TableLibraryPage = ({ types, headers, reports, ...props }) => {
	const headerEntries = Object.entries(headers);
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
			const filteredHeaders = filters.filterHeaders(headerEntries, showAll);
			setTableHeaders(filteredHeaders);			
		}		
	}, [showAll, headers]);

	useEffect(() => {
		if (hasData()) {
			const filteredData = filters.filterData(reports, types, filter);
			setTableData(filteredData);
		}
	}, [reports, filter]);

	function hasData() {
		return reports.length !== 0;
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
		types: state.types,
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