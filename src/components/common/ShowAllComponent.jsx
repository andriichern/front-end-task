import React from 'react';

const ShowAll = ({ onChange }) => {
    return(
        <div className="form-group form-check">
            <input 
                id="showAll"
                type="checkbox"
                aria-label="Show All Columns checkbox"
                className="form-check-input" 
                onChange={onChange} />
            <label
                className="form-check-label"
                htmlFor="showAll">Show All Columns</label>
        </div>
    );
};

export default ShowAll;