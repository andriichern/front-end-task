import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown.jsx';
import Checkbox from  '../common/Checkbox.jsx';
import TableFilter from './TableFilter.jsx';
import TableDataFormat from './TableDataFormat.jsx';

const TableSettings = ({
    dataTypes,
    dataHeaders,
    formatOptions,
    itemsPerPage,
    onFilterApplied,
    onFormatApplied,
    onShowAllChanged,
    onPageCountChange,
    onReplaceEmptyChanged,
}) => {
    const pageCountOptions = [20, 40, 60, 80, 100];

    function onItemsCountPerPageChanged({ target: { text: value }}) {
        onPageCountChange(parseInt(value));
    }

    return(
        <div className="row table-settings-container">
            <TableDataFormat
                dataTypes={dataTypes}
                dataHeaders={dataHeaders}
                formatOptions={formatOptions}
                onFormatApplied={onFormatApplied} />
            <Checkbox
                name="replaceEmpty"
                label="Replace Empty Values"
                classList="flex-checkbox-center"
                onChange={onReplaceEmptyChanged} />
            <Checkbox 
                name="showAll"
                label="Show All Columns"
                classList="flex-checkbox-center"
                onChange={onShowAllChanged} />
            <Dropdown 
                label="Select Count"
                btnTypeClass="outline-primary"
                content="dataCount"
                selected={itemsPerPage}
                values={pageCountOptions}
                onItemSelect={onItemsCountPerPageChanged} />
            <TableFilter
                dataHeaders={dataHeaders}
                onFilterApplied={onFilterApplied} />
        </div>
    );
};

TableSettings.propTypes = {
    dataTypes: PropTypes.object.isRequired,
    dataHeaders: PropTypes.array.isRequired,
    formatOptions: PropTypes.object.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onFilterApplied: PropTypes.func.isRequired,
    onFormatApplied: PropTypes.func.isRequired,
    onShowAllChanged: PropTypes.func.isRequired,
    onPageCountChange: PropTypes.func.isRequired,
    onReplaceEmptyChanged: PropTypes.func.isRequired,
};

export default React.memo(TableSettings);
