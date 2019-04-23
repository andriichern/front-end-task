import React from 'react';

const TableCell = ({ value, replaceEmptyValue }) => {

    function getValueFormat(val) {
        if (!!val === val) {
            return val ? 'Yes' : 'No';
        }

        if (!val && replaceEmptyValue) {
            return ' --- ';
        }

        return val;
    }

    return(
        <td>{getValueFormat(value)}</td>
    );
};

export default TableCell;