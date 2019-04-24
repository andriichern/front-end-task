import React from 'react';

const Checkbox = ({
    label,
    classList='',
    onChange
}) => {
    return(
        <div className={`form-group form-check ${classList}`}>
            <input 
                id="showAll"
                type="checkbox"
                aria-label="Show All Columns checkbox"
                className="form-check-input" 
                onChange={onChange} />
            <label
                className="form-check-label"
                htmlFor="showAll">{label}</label>
        </div>
    );
};

export default Checkbox;
