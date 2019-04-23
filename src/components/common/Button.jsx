import React from 'react';

const Button = ({
    btnTypeClass,
    label,
    onClick
}) => {
    return(
        <button 
            className={`btn btn-${btnTypeClass}`}
            type="button"
            onClick={onClick}>{label}</button>
    );
};

export default Button;