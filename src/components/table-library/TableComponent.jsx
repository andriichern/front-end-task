import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRowComponent.jsx';
import TableHeader from './TableHeaderComponent.jsx';

const TableComponent = ({ headers, columns }) => {
    const headerEntries = Object.entries(headers);
    let sorting = {}

    function hadleHeaderClick({ target: { text: column }}) {
        if (!sorting || sorting.column !== column) {
            sorting.column = column;
            sorting.direction = 'asc';
        } else if (sorting.column === column) {
            if (sorting.direction === 'asc') {
                sorting.direction = 'desc';
            } else if (sorting.direction === 'desc') {
                sorting.direction = 'asc';
            }
        }
    }

    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    {headerEntries.map( ([header, display], i) => display && 
                        <TableHeader 
                            key={i}
                            header={header}
                            sorting={sorting.direction}
                            onclick={hadleHeaderClick} />
                    )}
                </tr>
            </thead>
            <tbody>
                {columns.map((columnObj, i) => <TableRow key={i} rowData={columnObj} settings={headerEntries} />)}
            </tbody>
        </table>
    );
}

TableComponent.propTypes = {
    headers: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
};

export default TableComponent;