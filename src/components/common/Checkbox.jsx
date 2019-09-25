import React from 'react';
import PropTypes from 'prop-types';

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

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    classList: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default React.memo(Checkbox);
