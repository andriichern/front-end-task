import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';

const TableDataLoad = ({
    loadData100,
    loadData1000,
    loadData10000
}) => {
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
};

TableDataLoad.propTypes = {
    loadData100: PropTypes.func.isRequired,
    loadData1000: PropTypes.func.isRequired,
    loadData10000: PropTypes.func.isRequired
};

export default React.memo(TableDataLoad);