import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
    label,
    btnTypeClass,
    content,
    selected,
    values,
    onItemSelect
}) => {
    return(
        <div className="dropdown">
            <button type="button" id={`dropdown${content}`} className={`btn btn-${btnTypeClass} dropdown-toggle`} 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selected || label}
            </button>
            <div className="dropdown-menu" aria-labelledby={`dropdown${content}`}>
                {values.map((value, i) => 
                    <a
                        key={i}
                        href="#"
                        className={"dropdown-item" + (selected === value ? " active" : "")}
                        onClick={onItemSelect}>{value}</a>
                )}
            </div>
        </div>
    );
};

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    btnTypeClass: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    selected: PropTypes.any,
    values: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

export default React.memo(Dropdown);
