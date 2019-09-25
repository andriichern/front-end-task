import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './Table.jsx';
import TableSettings from './TableSettings.jsx';
import Spinner from '../common/Spinner.jsx';
import pageData from '../../services/pagingService';
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
    const [pageIndex, setPageIndex] = useState(0);
    const [dataCount, setDataCount] = useState(data.length);
    const [displayData, setDisplayData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [shouldReplaceEmpty, setShouldReplaceEmpty] = useState(false);
    
    const filteredHeaders = filters.filterHeaders(dataHeaders, showAll);

	useEffect(() => {
        formatAndFilterData();
	}, [data, filter, formats, sorting, shouldReplaceEmpty, pageIndex, itemsPerPage]);

	function formatAndFilterData() {
        if (!displayData.length) {
            const paged = pageData(data, itemsPerPage, pageIndex);
            
            setDisplayData(paged);
        } else {
            const filteredData = filters.filterData(data, dataTypes, filter);
            const sorted = sortData(filteredData, dataTypes, sorting);
            
            const paged = pageData(sorted, itemsPerPage, pageIndex);
            const formatted = formatData(paged, dataTypes, formats, shouldReplaceEmpty);
            
            setDisplayData(formatted);
            setDataCount(filteredData.length);
        }
        setLoading(false);
	}

    function handleFormatApplied(formatOptions) {
        setFormats({ ...formatOptions });
    }
    
    function handleFilterApplied(filter) {
        setFilter({ ...filter });
        setPageIndex(0);
	}
	
	function handleShowAllChanged() {
        setShowAll(prevValue => {
			return !prevValue;
		});
	}

	function handleReplaceEmptyChanged() {
		setShouldReplaceEmpty(prevValue => {
			return !prevValue;
		});
    }
    
    function handlePageCountChanged(itemsPerPageCount) {
        setItemsPerPage(itemsPerPageCount);
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

    function handlePageIndexChange(pageIndex) {
        setPageIndex(pageIndex);
    }

    return(
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <TableSettings
                        dataTypes={dataTypes}
                        dataHeaders={filteredHeaders}
                        formatOptions={formats}
                        itemsPerPage={itemsPerPage}
                        onFilterApplied={handleFilterApplied}
                        onFormatApplied={handleFormatApplied}
                        onShowAllChanged={handleShowAllChanged}
                        onPageCountChange={handlePageCountChanged}
                        onReplaceEmptyChanged={handleReplaceEmptyChanged} />
                    <Table
                        dataHeaders={filteredHeaders}
                        dataColumns={displayData}
                        sorting={sorting}
                        dataCount={dataCount}
                        pageIndex={pageIndex}
                        itemsPerPage={itemsPerPage}
                        onHeaderClick={handleSort}
                        onPageIndexChange={handlePageIndexChange} />
                </>
            )}
        </>
    );
};

TableComponent.propTypes = {
    dataTypes: PropTypes.object.isRequired,
	dataHeaders: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};

export default React.memo(TableComponent);
