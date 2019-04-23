import React, { useState } from 'react';
import Checkbox from  '../common/Checkbox.jsx';
import TableFilter from './TableFilter.jsx';
import TableDataFormat from './TableDataFormat.jsx';

const TableSettings = ({
    headers,
    onFormat,
    onReplaceEmpty,
    onShowAll,
    onFilter
}) => {
    return(
        <div className="row table-settings-container">
            <TableDataFormat onFormat={onFormat} />
            <Checkbox 
                label="Replace Empty Values"
                classList="flex-checkbox-center"
                onChange={onReplaceEmpty} />
            <Checkbox 
                label="Show All Columns"
                classList="flex-checkbox-center"
                onChange={onShowAll} />
            <TableFilter headers={headers} onFilter={onFilter} />
        </div>
    );
};

export default TableSettings;