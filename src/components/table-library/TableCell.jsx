import React from 'react';
import PropTypes from 'prop-types';

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

TableCell.propTypes = {
    value: PropTypes.any
};

export default React.memo(TableCell);
