import React from 'react';
import ShowAll from '../common/ShowAllComponent.jsx';
import Filter from '../common/FilterComponent.jsx';
import DataFormat from '../common/DataFormatComponent.jsx';

const TableSettings = ({ headers, onShowAll, onFilter }) => {

    function onFormat(format) {
        console.log(format);
    }

    return(
        <>
            <DataFormat onFormatSelected={onFormat} />
            <ShowAll onChange={onShowAll} />
            <Filter headers={headers} onFilter={onFilter} />
        </>
    );
};

export default TableSettings;