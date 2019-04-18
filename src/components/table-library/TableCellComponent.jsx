import React from 'react';

const TableCell = ({ value }) => {

    function getValueFormat(val) {
        if (!!val === val) {
            return val ? "Yes" : "No";
        }

        return val;
    }

    return(
        <td>{getValueFormat(value)}</td>
    );
};

export default TableCell;