import React, { useState } from 'react';
import operators from '../../utils/filterOperators';
import Dropdown from '../common/Dropdown.jsx';
import Button from '../common/Button.jsx';

const TableFilter = ({ headers, onFilter }) => {
    const [key, setFilterKey] = useState('');
    const [operator, setFilterOperator] = useState('');
    const [criteria, setFilterCriteria] = useState('');

    function onFilterKeySelect({ target: { text }}) {
        setFilterKey(text);
    }

    function onFilterOperatorSelect({ target: { text }}) {
        setFilterOperator(text);
    }

    function onInputChange({ target: { value }}) {
        setFilterCriteria(value);
    }

    function onClearClick() {
        setFilterKey('');
        setFilterOperator('');
        setFilterCriteria('');
        onFilter({});
    }
    
    function onFilterClick() {
        onFilter({ key, operator, criteria });
    }

    return(
        <div className="input-group">
            <div className="input-group-prepend">
                <Dropdown
                    label="Filter By"
                    btnTypeClass="outline-info"
                    content="FilterKey"
                    selected={key}
                    values={headers}
                    onItemSelect={onFilterKeySelect} />
                <Dropdown
                    label="Operator"
                    btnTypeClass="outline-info"
                    content="FilterOperator"
                    selected={operator}
                    values={operators}
                    onItemSelect={onFilterOperatorSelect} />
            </div>            
            <input 
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
                placeholder="Filter Text"
                value={criteria}
                onChange={onInputChange} />
            <div className="input-group-append">
                <Button
                    btnTypeClass="outline-secondary"
                    label="Clear"
                    onClick={onClearClick} />
                <Button
                    btnTypeClass="outline-success"
                    label="Apply"
                    onClick={onFilterClick} />                
            </div>
        </div>
    );
};

export default TableFilter;
