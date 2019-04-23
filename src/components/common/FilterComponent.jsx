import React, { useState } from 'react';
import operators from '../../utils/filterOperators';
import Dropdown from './DropdownComponent.jsx';

const Filter = ({ headers, onFilter }) => {
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
                    label='Filter By'
                    buttonStyle='outline-info'
                    content='filterKey'
                    selected={key}
                    values={headers}
                    onItemSelect={onFilterKeySelect} />
                <Dropdown
                    label='Operator'
                    buttonStyle='outline-info'
                    content='filterOperator'
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
                <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={onClearClick}>Clear</button>
                <button 
                    className="btn btn-outline-success"
                    type="button"
                    onClick={onFilterClick}>Filter</button>                
            </div>
        </div>
    );
};

export default Filter;