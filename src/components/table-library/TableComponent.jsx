import React, { useState, useEffect } from 'react';
import Table from './Table.jsx';
import TableSettings from './TableSettings.jsx';
import Spinner from '../common/Spinner.jsx';
import pageData from '../../services/pagingService';
import sortData from '../../services/sortingService';
import formatData from '../../services/formatService';
import * as sortOrder from '../../utils/sortingOrder';
import * as filters from '../../services/filterService';

const TableComponent = ({
	types,
	dataHeaders,
    data
}) => {
    const [filter, setFilter] = useState({});
	const [formats, setFormats] = useState({});
    const [sorting, setSorting] = useState({});
    const [loading, setLoading] = useState(true);
	const [showAll, setShowAll] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [dataCount, setDataCount] = useState(data.length);
    const [displayData, setDisplayData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [shouldReplaceEmpty, setShouldReplaceEmpty] = useState(false);
    
    const filteredHeaders = filters.filterHeaders(dataHeaders, showAll);

	useEffect(() => {
        formatAndFilterData();
	}, [data, filter, formats, sorting, shouldReplaceEmpty, pageIndex]);

	function formatAndFilterData() {
        if (!displayData.length) {
            const paged = pageData(data, itemsPerPage, pageIndex);
            
            setDisplayData(paged);
        } else {
            const filteredData = filters.filterData(data, types, filter);
            const sorted = sortData(filteredData, types, sorting);
            
            const paged = pageData(sorted, itemsPerPage, pageIndex);
            const formatted = formatData(paged, types, formats, shouldReplaceEmpty);
            
            setDisplayData(formatted);
            setDataCount(filteredData.length);
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
        setPageIndex(0);
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

    function handlePageChange(pageIndex) {
        setPageIndex(pageIndex);
    }

    return(
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <TableSettings
                        types={types}
                        headers={filteredHeaders}
                        onFilter={handleFilter}
                        onShowAll={handleShowAll}
                        onFormat={handleFormatAdded}
                        onFormatClear={handleClearAllFormatting}
                        onReplaceEmpty={handleReplaceEmpty} />
                    <Table
                        headers={filteredHeaders}
                        columns={displayData}
                        sorting={sorting}
                        dataCount={dataCount}
                        itemsPerPage={itemsPerPage}
                        pageIndex={pageIndex}
                        onHeaderClick={handleSort}
                        onPageChange={handlePageChange} />
                </>
            )}
        </>
    );
};

export default React.memo(TableComponent);
