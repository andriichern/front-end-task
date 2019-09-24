import React from 'react';

const Checkbox = ({
    name,
    label,
    classList='',
    onChange
}) => {
    return(
        <div className={`form-group form-check ${classList}`}>
            <input 
                id={name}
                type="checkbox"
                aria-label="Show All Columns checkbox"
                className="form-check-input"
                onChange={onChange} />
            <label
                className="form-check-label"
                htmlFor={name}>{label}</label>
        </div>
    );
};

export default Checkbox;
