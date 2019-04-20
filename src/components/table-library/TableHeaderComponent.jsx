import React from 'react';
import * as sortOrder from  '../../utils/sortingOrder';

const TableHeader = ({ header, sorting: { key, order }, onclick }) => {
    function getDirectionIcon() {
        if (!order) {
            return '';
        } else if (order === sortOrder.ASC) {
            return 'down';
        } else if (order === sortOrder.DESC) {
            return 'up';
        }
    }

    return(
        <th>
            <a 
                href="#"                
                onClick={onclick}
            >
                {header}
                {key && key === header && <span className={"caret " + getDirectionIcon()}></span>}
            </a>
        </th>
    );
}

export default TableHeader;