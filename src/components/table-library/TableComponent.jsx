import React, { useState, useEffect } from 'react';
import Table from './Table.jsx';
import TableSettings from './TableSettings.jsx';
import Spinner from '../common/Spinner.jsx';
import sortData from '../../services/sortingService';
import formatData from '../../services/formatService';
import * as sortOrder from '../../utils/sortingOrder';
import * as filters from '../../services/filterService';

const TableComponent = ({
	dataTypes,
	dataHeaders,
    data
}) => {
    const [filter, setFilter] = useState({});
	const [formats, setFormats] = useState({});
    const [sorting, setSorting] = useState({});
    const [loading, setLoading] = useState(true);
	const [showAll, setShowAll] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [shouldReplaceEmpty, setShouldReplaceEmpty] = useState(false);

    useEffect(() => {
        if (dataHeaders.length !== 0) {
            const filteredHeaders = filters.filterHeaders(dataHeaders, showAll);
            setTableHeaders(filteredHeaders);            
        }
	}, [dataHeaders, showAll]);

	useEffect(() => {
        formatAndFilterData();
	}, [data, filter, formats, sorting, shouldReplaceEmpty]);

	function formatAndFilterData() {
        if (!tableData.length) {
            setTableData(data);
        } else {
            const filteredData = filters.filterData(data, dataTypes, filter);
            const formatted = formatData(filteredData, dataTypes, formats, shouldReplaceEmpty);
            setTableData(sortData(formatted, dataTypes, sorting));
        }
        setLoading(false);
	}

    function handleFormatAdded(settings) {
        setFormats({ ...settings });
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
		});
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

    return(
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <TableSettings
                        headers={tableHeaders}
                        onFilter={handleFilter}
                        onShowAll={handleShowAll}
                        onFormat={handleFormatAdded}
                        onFormatClear={handleClearAllFormatting}
                        onReplaceEmpty={handleReplaceEmpty} />
                    <Table
                        headers={tableHeaders}
                        columns={tableData}
                        sorting={sorting}
                        shouldReplaceEmpty={shouldReplaceEmpty}
                        onHeaderClick={handleSort} />
                </>
            )}
        </>
    );
};

export default TableComponent;
