import React from 'react';
import TableCell from './TableCellComponent.jsx';

const TableRow = ({ rowData, showAll, settings }) => {
    return (
        <tr>
            {settings.map( ([propName, display], i) => (display || showAll) && <TableCell key={i} value={rowData[propName]}/> )}
        </tr>
    );
};

export default TableRow;