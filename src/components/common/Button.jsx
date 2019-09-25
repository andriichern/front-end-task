import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    btnTypeClass,
    label,
    disabled = false,
    onClick
}) => {
    return(
        <button 
            className={`btn btn-${btnTypeClass}`}
            type="button"
            disabled={disabled}
            onClick={onClick}>{label}</button>
    );
};

Button.propTypes = {
    btnTypeClass: PropTypes.string.isRequired,
    label: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default React.memo(Button);
