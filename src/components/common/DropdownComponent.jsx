import React from 'react';

const Dropdown = ({ label, buttonStyle, content, selected, values, onItemSelect }) => {
    return(
        <div className="dropdown">
            <button type="button" id={'dropdown' + content} className={`btn btn-outline-${buttonStyle} dropdown-toggle`} 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selected || label}
            </button>
            <div className="dropdown-menu" aria-labelledby={'dropdown' + content}>
                {values.map((value, i) => 
                    <a
                        key={i}
                        href="#"
                        className={"dropdown-item" + (selected === value ? ' active' : '')}
                        onClick={onItemSelect}>{value}</a>
                )}
            </div>
        </div>
    );
};

export default Dropdown;