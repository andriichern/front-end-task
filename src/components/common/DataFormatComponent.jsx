import React, { useState } from 'react';
import * as types from '../../utils/dataTypes';
import Dropdown from './DropdownComponent.jsx';

const DataFormat = ({ onFormatSelected }) => {
    const [type, setType] = useState('');
    const [format, setFormat] = useState(types.AsIsFormat);
    
    function onTypeSelected({ target: { text }}) {
        setType(text);
        setFormat(types.AsIsFormat);
    }

    function onTypeFormatSelected({ target: { text }}) {
        setFormat(text);
        onFormatSelected({ type, format });
    }

    return(
        <div className="dataformat-row">
            <Dropdown
                label='Select Type'
                buttonStyle='outline-primary'
                content='dataType'
                selected={type}
                values={types.allTypes}
                onItemSelect={onTypeSelected} />
            {type !== '' && <Dropdown 
                label='Select Format'
                buttonStyle='outline-primary'
                content='dataFormat'
                selected={format}
                values={types.typeFormatOptions[type]}
                onItemSelect={onTypeFormatSelected} />}
            {type !== '' && <button className="btn btn-success">Save</button>}
        </div>
    );
};

export default DataFormat;