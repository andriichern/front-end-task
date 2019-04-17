import React from 'react';
import PropTypes from 'prop-types';

const TableComponent = ({
    headers = [],
    columns = []
}) => {
    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    {headers.length > 0 && headers.map((header, i) => <th key={'header_' + i}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {columns.length > 0 && columns.map((column, j) => {
                <tr key={'column_' + j}>
                    {Object.keys(column).map(entry => <td>{'cell_' + entry}</td>)}
                </tr>
            })}
            </tbody>
        </table>
    );
}

TableComponent.propTypes = {
    headers: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default TableComponent;