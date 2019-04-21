import React from 'react';

/* <div className="input-group">
    <div className="input-group-prepend">
        <div className="input-group-text">
            <input type="checkbox" aria-label="Show All Columns checkbox" />
        </div>
    </div>
    <label>Show All Columns</label>
</div> */

const TableSettings = ({ onChange }) => {
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

export default TableSettings;