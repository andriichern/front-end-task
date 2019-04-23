import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableRow from './TableRow.jsx';
import TableHeader from './TableHeader.jsx';
import sortData from '../../services/sortingService';
import * as sortOrder from '../../utils/sortingOrder';

const TableComponent = ({
    types,
    headers,
    columns,
    shouldReplaceEmpty
}) => {
    const [sortSettings, setSortSettings] = useState({});
    const [columnsData, setColumnsData] = useState(columns);

    useEffect(() => {
        setColumnsData(columns);
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
        setColumnsData(sortData(columnsData, types, sortSettings));
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
                        dataKeys={headers}
                        replaceEmptyValues={shouldReplaceEmpty} />
                )}
            </tbody>
        </table>
    );
}

TableComponent.propTypes = {
    headers: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	return {
		types: state.types
	}
}

export default connect(mapStateToProps)(TableComponent);