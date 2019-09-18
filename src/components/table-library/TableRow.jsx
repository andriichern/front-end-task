import React from 'react';
import TableCell from './TableCell.jsx';

const TableRow = ({
    rowData,
    dataKeys
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

export default React.memo(TableRow);
