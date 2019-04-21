import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRowComponent.jsx';
import TableHeader from './TableHeaderComponent.jsx';
import TableSettings from './TableSettingsComponent.jsx';
import sortData from '../../services/sortingService';
import * as sortOrder from '../../utils/sortingOrder';

const TableComponent = ({ headers, columns }) => {
    const headerEntries = Object.entries(headers);
    const [sortSettings, setSortSettings] = useState({});
    const [data, setColumnsData] = useState(columns);
    const [showAll, setShowAll] = useState(false);

    // useEffect(() => {
    //     if (!sortSettings.key) {
    //         sortSettings.key = Object.keys(columns[0])[0];
    //         sortSettings.order = sortOrder.ASC;

    //         setColumnsData(sortData(columns, sortSettings));
    //     }
    // }, [columns]);
    
    function handleSort({ target: { text: key }}) {
        if (!sortSettings || sortSettings.key !== key) {
            sortSettings.key = key;
            sortSettings.order = sortOrder.ASC;
        } else {
            if (sortSettings.order === sortOrder.ASC) {
                sortSettings.order = sortOrder.DESC;
            } else {
                sortSettings.order = sortOrder.ASC;
            }
        }
        
        setSortSettings(sortSettings);
        setColumnsData(sortData(data, sortSettings));
    }

    function handleShowAll () {
        setShowAll(prevValue => {
            return !prevValue;
        })
    }

    return(
        <>
            <TableSettings onChange={handleShowAll} />
            <table className='table table-hover'>
                <thead>
                    <tr>
                        {headerEntries.map( ([header, display], i) => (display || showAll) && 
                            <TableHeader 
                                key={i}
                                header={header}
                                sorting={sortSettings}
                                onclick={handleSort} />
                        )}
                    </tr>
                </thead>
                <tbody>        
                    {data.map((columnObj, i) => 
                        <TableRow 
                            key={i}
                            rowData={columnObj}
                            showAll={showAll}
                            settings={headerEntries} />
                    )}
                </tbody>
            </table>
        </>
    );
}

TableComponent.propTypes = {
    headers: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
};

export default TableComponent;