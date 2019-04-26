import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as dataActions from '../store/actions/dataActions';
import * as sortOrder from '../utils/sortingOrder';
import * as filters from '../services/filterService';
import sortData from '../services/sortingService';
import formatData from '../services/formatService';
import Spinner from '../components/common/Spinner.jsx'
import TableComponent from '../components/table-library/Table.jsx';
import TableSettings from '../components/table-library/TableSettings.jsx';


const TableLibraryPage = ({ types, headers, data, ...props }) => {
	const headerEntries = Object.entries(headers);
	const [filter, setFilter] = useState({});
	const [formats, setFormats] = useState([]);
	const [sorting, setSorting] = useState({});
	const [showAll, setShowAll] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [shouldReplaceEmpty, setShouldReplaceEmpty] = useState(false);

	useEffect(() => {
        if (!hasData()) {
			props.load100();
		}
	}, [data]);

	useEffect(() => {
		if (hasData()) {
			const filteredHeaders = filters.filterHeaders(headerEntries, showAll);
			setTableHeaders(filteredHeaders);			
		}		
	}, [showAll, headers]);

	useEffect(() => {
		if (hasData()) {
			formatAndFilterData(data);
		}
	}, [data, filter, formats, sorting, shouldReplaceEmpty]);

	function formatAndFilterData(data) {
		const filteredData = filters.filterData(data, types, filter);
		const formatted = formatData(filteredData, types, formats)
		setTableData(sortData(formatted, types, sorting));
	}

	function hasData() {
		return data.length !== 0;
	}
	
	function handleFormatAdded(settings) {
        if (settings.type && settings.format) {
			setFormats([ settings, ...formats ]);
        }
	}

	function handleClearAllFormatting() {
		setFormats([]);
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
		setFilter({ ...filter });
	}

	function handleSort({ target: { text: key }}) {
        if (!sorting || sorting.key !== key) {
            sorting.key = key;
            sorting.order = sortOrder.ASC;
        } else {
            if (sorting.order === sortOrder.ASC) {
                sorting.order = sortOrder.DESC;
            } else {
                sorting.order = sortOrder.ASC;
            }
        }
        
        setSorting({ ...sorting });
    }  

	return (
		<>
			<TableSettings
				headers={tableHeaders}
				onFilter={handleFilter}
				onShowAll={handleShowAll}
				onFormat={handleFormatAdded}
				onFormatClear={handleClearAllFormatting}
				onReplaceEmpty={handleReplaceEmpty} />
			{!hasData() 
				? (<Spinner />)
				: (<TableComponent
					headers={tableHeaders}
					columns={tableData}
					sorting={sorting}
					shouldReplaceEmpty={shouldReplaceEmpty}
					onHeaderClick={handleSort} />)}
		</>
	);
}

function mapStateToProps(state) {
	return {
		types: state.types,
		headers: state.headers,
		data: state.data
	}
}

const mapDispatchToProps = {
	load100: dataActions.loadData100,
	load1000: dataActions.loadData1000,
	load10000: dataActions.loadData10000
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TableLibraryPage);
