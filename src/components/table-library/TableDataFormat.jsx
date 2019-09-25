import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';
import Dropdown from '../common/Dropdown.jsx';
import { typeFormatOptions } from '../../services/formatService';

const TableDataFormat = ({
    dataTypes,
    dataHeaders,
    formatOptions,
    onFormatApplied
}) => {
    const [column, setColumn] = useState('');
    const [format, setFormat] = useState({});
    const [formatApplied, setFormatApplied] = useState(false);
    
    function onColumnSelected({ target: { text }}) {
        setColumn(text);
        setFormat('');
    }

    function onColumnonFormatSelected({ target: { text }}) {
        setFormat(text);
    }

    function onApplyBtnClick() {
        const options = {
            ...formatOptions,
            [column]: format            
        };
        setFormatApplied(true);
        onFormatApplied(options);
    }

    function onClearAllBtnClick() {
        setColumn('');
        setFormat('');
        setFormatOptions({});
        setFormatApplied(false);
        onFormatApplied({});
    }

    return(
        <div className="dataformat-row">
            <Dropdown
                label="Select Column"
                btnTypeClass="outline-primary"
                content="dataType"
                selected={column}
                values={dataHeaders}
                onItemSelect={onColumnSelected} />
            {column !== '' && 
                <Dropdown 
                    label="Select Format"
                    btnTypeClass="outline-primary"
                    content="dataFormat"
                    selected={format || formatOptions[column]}
                    values={typeFormatOptions[dataTypes[column]]}
                    onItemSelect={onColumnonFormatSelected} />
            }
            {column !== '' && format !== '' &&
                <Button
                    btnTypeClass="success"
                    label="Apply"
                    onClick={onApplyBtnClick} />
            }
            {formatApplied &&
                <Button
                    btnTypeClass="danger"
                    label="Clear All"
                    onClick={onClearAllBtnClick} />}
        </div>
    );
};

TableDataFormat.propTypes = {
    dataTypes: PropTypes.object.isRequired,
	dataHeaders: PropTypes.array.isRequired,
    formatOptions: PropTypes.object.isRequired,
    onFormatApplied: PropTypes.func.isRequired
};

export default React.memo(TableDataFormat);
