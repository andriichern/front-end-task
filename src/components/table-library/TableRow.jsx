import React from 'react';
import TableCell from './TableCell.jsx';

const TableRow = ({
    rowData,
    dataKeys,
    replaceEmptyValues
}) => {
    return (
        <tr>
            {dataKeys.map((cellKey, i) => 
                <TableCell
                    key={i}
                    value={rowData[cellKey]} />)}
        </tr>
    );
};

export default TableRow;
