import React from 'react';
import TableCell from './TableCellComponent.jsx';

const TableRow = ({ rowData, dataKeys }) => {
    return (
        <tr>
            {dataKeys.map((cellKey, i) => <TableCell key={i} value={rowData[cellKey]}/> )}
        </tr>
    );
};

export default TableRow;