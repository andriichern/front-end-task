import React from 'react';
import Checkbox from  '../common/Checkbox.jsx';
import TableFilter from './TableFilter.jsx';
import TableDataFormat from './TableDataFormat.jsx';

const TableSettings = ({
    types,
    headers,
    onFormat,
    onFormatClear,
    onReplaceEmpty,
    onShowAll,
    onFilter
}) => {
    return(
        <div className="row table-settings-container">
            <TableDataFormat
                types={types}
                headers={headers}
                onFormat={onFormat}
                onClearAll={onFormatClear} />
            <Checkbox
                name="replaceEmpty"
                label="Replace Empty Values"
                classList="flex-checkbox-center"
                onChange={onReplaceEmpty} />
            <Checkbox 
                name="showAll"
                label="Show All Columns"
                classList="flex-checkbox-center"
                onChange={onShowAll} />
            <TableFilter headers={headers} onFilter={onFilter} />
        </div>
    );
};

export default React.memo(TableSettings);
