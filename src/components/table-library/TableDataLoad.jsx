import React from 'react';
import { connect } from 'react-redux';
import * as dataActions from '../../store/actions/dataActions';
import Button from '../common/Button.jsx';

const TableDataLoad = ({ load100, load1000, load10000 }) => {
    return(
        <div className="row">
            <Button
                btnTypeClass="success"
                label="Load Data 100"
                onClick={load100} />
            <Button
                btnTypeClass="success"
                label="Load Data 1000"
                onClick={load1000} />
            <Button
                btnTypeClass="success"
                label="Load Data 10000"
                onClick={load10000} />
        </div>
    );
}

const mapDispatchToProps = {
	load100: dataActions.loadData100,
	load1000: dataActions.loadData1000,
	load10000: dataActions.loadData10000
};

export default connect(
    null,
    mapDispatchToProps
)(TableDataLoad);