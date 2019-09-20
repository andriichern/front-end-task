import React from 'react';
import Button from '../common/Button.jsx';

const TableDataLoad = ({ loadData100, loadData1000, loadData10000 }) => {
    return(
        <div className="row">
            <Button
                btnTypeClass="success"
                label="Load Data 100"
                onClick={loadData100} />
            <Button
                btnTypeClass="success"
                label="Load Data 1000"
                onClick={loadData1000} />
            <Button
                btnTypeClass="success"
                label="Load Data 10000"
                onClick={loadData10000} />
        </div>
    );
}

export default React.memo(TableDataLoad);