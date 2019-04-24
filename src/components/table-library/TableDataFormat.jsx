import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import Dropdown from '../common/Dropdown.jsx';
import { allTypes } from '../../utils/dataTypes';
import { typeFormatOptions } from '../../services/formatService';

const TableDataFormat = ({ onFormat, onClearAll }) => {
    const [type, setType] = useState('');
    const [format, setFormat] = useState('');
    const [formatApplied, setFormatApplied] = useState(false);
    
    function onTypeSelected({ target: { text }}) {
        setType(text);
        setFormat('');
    }

    function onTypeFormatSelected({ target: { text }}) {
        setFormat(text);
    }

    function onFormatApplied() {
        onFormat({ type, format });
        setFormatApplied(true);
    }

    function onClearAllBtn() {
        setType('');
        setFormat('');
        setFormatApplied(false);
        onClearAll();
    }

    return(
        <div className="dataformat-row">
            <Dropdown
                label="Select Type"
                btnTypeClass="outline-primary"
                content="dataType"
                selected={type}
                values={allTypes}
                onItemSelect={onTypeSelected} />
            {type !== '' && 
                <Dropdown 
                    label="Select Format"
                    btnTypeClass="outline-primary"
                    content="dataFormat"
                    selected={format}
                    values={typeFormatOptions[type]}
                    onItemSelect={onTypeFormatSelected} />
            }
            {type !== '' && format !== '' &&
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

export default TableDataFormat;
