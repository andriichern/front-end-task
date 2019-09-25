import React from 'react';
import PropTypes from 'prop-types';
import * as sortOrder from  '../../utils/sortingOrder';

const TableHeader = ({
    header,
    sorting: { key, order },
    onClick
}) => {
    function getDirectionIcon() {
        if (!order) {
            return '';
        } else if (order === sortOrder.ASC) {
            return 'caret down';
        } else if (order === sortOrder.DESC) {
            return 'caret up';
        }
    }

    return(
        <th>
            <a 
                href="#"
                onClick={onClick}
            >
                {header}
                {key && key === header && <span className={getDirectionIcon()}></span>}
            </a>
        </th>
    );
}

TableHeader.propTypes = {
    header: PropTypes.string.isRequired,
    sorting: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default React.memo(TableHeader);
