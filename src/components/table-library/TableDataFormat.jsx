import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import Dropdown from '../common/Dropdown.jsx';
import { typeFormatOptions } from '../../services/formatService';

const TableDataFormat = ({
    types,
    headers,
    onFormat,
    onClearAll
}) => {
    const [column, setColumn] = useState('');
    const [format, setFormat] = useState({});
    const [formatOptions, setFormatOptions] = useState({});
    const [formatApplied, setFormatApplied] = useState(false);
    
    function onColumnSelected({ target: { text }}) {
        setColumn(text);
        setFormat('');
    }

    function onColumnonFormatSelected({ target: { text }}) {
        setFormat(text);
    }

    function onFormatApplied() {
        const options = {
            ...formatOptions,
            [column]: format            
        };
        setFormatApplied(true);
        setFormatOptions(options);
        onFormat(options);
    }

    function onClearAllBtn() {
        setColumn('');
        setFormat('');
        setFormatOptions({});
        setFormatApplied(false);
        onClearAll();
    }

    return(
        <div className="dataformat-row">
            <Dropdown
                label="Select Column"
                btnTypeClass="outline-primary"
                content="dataType"
                selected={column}
                values={headers}
                onItemSelect={onColumnSelected} />
            {column !== '' && 
                <Dropdown 
                    label="Select Format"
                    btnTypeClass="outline-primary"
                    content="dataFormat"
                    selected={format || formatOptions[column]}
                    values={typeFormatOptions[types[column]]}
                    onItemSelect={onColumnonFormatSelected} />
            }
            {column !== '' && format !== '' &&
                <Button
                    btnTypeClass="success"
                    label="Apply"
                    onClick={onFormatApplied} />
            }
            {formatApplied && <Button
                btnTypeClass="danger"
                label="Clear All"
                onClick={onClearAllBtn} />}
        </div>
    );
};

export default React.memo(TableDataFormat);
