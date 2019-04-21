import React from 'react';
import ShowAll from '../common/ShowAllComponent.jsx';
import Filter from '../common/FilterComponent.jsx';

const TableSettings = ({ headers, onShowAll, onFilter }) => {
    return(
        <>
            <Filter headers={headers} onFilter={onFilter} />
            <ShowAll onChange={onShowAll} />
        </>
    );
};

export default TableSettings;