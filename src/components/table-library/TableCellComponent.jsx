import React from 'react';

const TableCell = ({ value }) => {

    function getValueFormat(val) {
        if (!!val === val) {
            return val ? 'Yes' : 'No';
        }

        if (!val) {
            return ' --- ';
        }

        return val;
    }

    return(
        <td>{getValueFormat(value)}</td>
    );
};

export default TableCell;