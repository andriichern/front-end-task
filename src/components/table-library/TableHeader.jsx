import React from 'react';
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

export default React.memo(TableHeader);
