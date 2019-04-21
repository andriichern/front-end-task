import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRowComponent.jsx';
import TableHeader from './TableHeaderComponent.jsx';
import sortData from '../../services/sortingService';
import * as sortOrder from '../../utils/sortingOrder';

const TableComponent = ({ headers, columns }) => {
    const [sortSettings, setSortSettings] = useState({});
    const [columnsData, setColumnsData] = useState(columns);

    useEffect(() => {
        setColumnsData(columns)
    }, [columns]);

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
        setColumnsData(sortData(columnsData, sortSettings));
    }    

    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    {headers.map((header, i) =>
                        <TableHeader 
                            key={i}
                            header={header}
                            sorting={sortSettings}
                            onclick={handleSort} />
                    )}
                </tr>
            </thead>
            <tbody>        
                {columnsData.map((columnObj, i) => 
                    <TableRow 
                        key={i}
                        rowData={columnObj}
                        dataKeys={headers} />
                )}
            </tbody>
        </table>
    );
}

TableComponent.propTypes = {
    headers: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default TableComponent;