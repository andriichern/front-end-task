import React from 'react';

const TableCell = ({ value }) => {

    function getValueFormat(val) {
        if (!!val === val) {
            return val.toString();
        }

        return val;
    }

    return(
        <td>{getValueFormat(value)}</td>
    );
};

export default TableCell;
