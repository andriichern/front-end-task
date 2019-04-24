import React from 'react';

const TableCell = ({ value, replaceEmptyValue }) => {

    function getValueFormat(val) {
        if (!!val === val) {
            return val.toString();
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
