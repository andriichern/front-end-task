import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell.jsx';

const TableRow = ({
    rowData,
    dataHeaders
}) => {
    return (
        <tr>
            {dataHeaders.map((cellKey, i) => 
                <TableCell
                    key={i}
                    value={rowData[cellKey]} />)}
        </tr>
    );
};

TableRow.propTypes = {
    rowData: PropTypes.object.isRequired,
    dataHeaders: PropTypes.array.isRequired
};

export default React.memo(TableRow);
