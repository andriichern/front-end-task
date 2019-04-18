import React from 'react';

const TableHeader = ({ header, sorting, onclick }) => {
    function getDirectionIcon(direction) {
        if (!direction) {
            return '';
        } else if (direction === 'asc') {
            return 'caret down';
        } else if (direction === 'desc') {
            return 'caret up';
        }
    }

    return(
        <th>
            <a href="#" className={getDirectionIcon(sorting)} onClick={onclick}>{header}</a>
        </th>
    );
}

export default TableHeader;