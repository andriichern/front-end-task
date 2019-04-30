import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow.jsx';
import TableHeader from './TableHeader.jsx';

const Table = ({
    headers,
    columns,
    sorting,
    shouldReplaceEmpty,
    onHeaderClick
}) => {
    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    {headers.map((header, i) =>
                        <TableHeader 
                            key={i}
                            header={header}
                            sorting={sorting}
                            onClick={onHeaderClick} />
                    )}
                </tr>
            </thead>
            <tbody>        
                {columns.map((columnObj, i) => 
                    <TableRow 
                        key={i}
                        rowData={columnObj}
                        dataKeys={headers} />
                )}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    headers: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default Table;
