import React, { useState } from 'react';

const Filter = ({ headers, onFilter }) => {
    const [key, setFilterKey] = useState('');
    const [text, setFilterText] = useState('');

    function onFilterKeySelect({ target: { text }}) {
        setFilterKey(text)
    }

    function onInputChange({ target: { value }}) {
        setFilterText(value);
    }

    function onClearClick() {
        setFilterKey('');
        setFilterText('');
        onFilter({});
    }
    
    function onFilterClick() {
        onFilter({ key, text });
    }

    return(
        <div className="input-group">
            <div className="input-group-prepend dropleft">
                <button type="button" id="dropdownMenuButton" className="btn btn-outline-secondary dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {key || 'Filter By'}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {headers.map((header, i) => 
                        <a
                            key={i}
                            href="#"
                            className={"dropdown-item" + (key === header ? ' active' : '')}
                            onClick={onFilterKeySelect}>{header}</a>
                    )}
                </div>
            </div>
            <input 
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
                placeholder="Filter Text"
                value={text}
                onChange={onInputChange} />
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={onClearClick}>Clear</button>
                <button 
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={onFilterClick}>Filter</button>                
            </div>
        </div>
    );
};

export default Filter;