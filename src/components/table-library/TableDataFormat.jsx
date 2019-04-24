import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import Dropdown from '../common/Dropdown.jsx';
import { allTypes } from '../../utils/dataTypes';
import { typeFormatOptions, AsIsFormat } from '../../services/formatService';

const TableDataFormat = ({ onFormat }) => {
    const [type, setType] = useState('');
    const [format, setFormat] = useState(AsIsFormat);
    
    function onTypeSelected({ target: { text }}) {
        setType(text);
        setFormat(AsIsFormat);
    }

    function onTypeFormatSelected({ target: { text }}) {
        setFormat(text);
    }

    function onFormatApplied() {
        onFormat({ type, format });
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
        </div>
    );
};

export default TableDataFormat;
