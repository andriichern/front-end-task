import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as reportActions from '../store/actions/reportsActions';
import * as filters from '../services/filterService';
import { formatData } from '../services/formatService';
import Spinner from '../components/common/Spinner.jsx'
import TableComponent from '../components/table-library/Table.jsx';
import TableSettings from '../components/table-library/TableSettings.jsx';

const TableLibraryPage = ({ types, headers, reports, ...props }) => {
	const headerEntries = Object.entries(headers);
	const [filter, setFilter] = useState({});
	const [showAll, setShowAll] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [formatSettings, setFormatSettings] = useState({});
	const [shouldReplaceEmpty, setShouldReplaceEmpty] = useState(false);

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
			const formatted = formatData(reports, types, formatSettings)
			const filteredData = filters.filterData(formatted, types, filter);
			setTableData(filteredData);
		}
	}, [reports, filter, formatSettings, shouldReplaceEmpty]);

	function hasData() {
		return reports.length !== 0;
	}
	
	function handleFormatAdded(settings) {
        if (settings.type && settings.format) {
			setFormatSettings(settings);			
        }
	}
	
	function handleShowAll() {
        setShowAll(prevValue => {
			return !prevValue;			
		});
	}

	function handleReplaceEmpty() {
		setShouldReplaceEmpty(prevValue => {
			return !prevValue;
		})
	}

	function handleFilter(filter) {
		setFilter(filter);
	}	

	return (
		<>
			<TableSettings
				headers={tableHeaders}
				onFilter={handleFilter}
				onShowAll={handleShowAll}
				onFormat={handleFormatAdded}
				onReplaceEmpty={handleReplaceEmpty} />
			{!hasData() 
				? (<Spinner />)
				: (<TableComponent
					headers={tableHeaders}
					columns={tableData}
					shouldReplaceEmpty={shouldReplaceEmpty} />)}
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
