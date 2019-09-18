import React from 'react';

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

export default Button;
