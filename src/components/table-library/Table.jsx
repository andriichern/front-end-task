import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow.jsx';
import TableHeader from './TableHeader.jsx';
import TablePager from './TablePager.jsx';

const Table = ({
    dataHeaders,
    dataColumns,
    sorting,
    dataCount,
    pageIndex,
    itemsPerPage,
    onHeaderClick,
    onPageIndexChange,
}) => {
    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    {dataHeaders.map((header, i) =>
                        <TableHeader 
                            key={i}
                            header={header}
                            sorting={sorting}
                            onClick={onHeaderClick} />
                    )}
                </tr>
            </thead>
            <tbody>        
                {dataColumns.map((columnObj, i) => 
                    <TableRow 
                        key={i}
                        rowData={columnObj}
                        dataHeaders={dataHeaders} />
                )}
            </tbody>
            {dataCount >= itemsPerPage && 
                <tfoot className='table-footer'>
                    <tr>
                        <TablePager 
                            dataCount={dataCount}
                            columnCount={dataHeaders.length}
                            itemsPerPage={itemsPerPage}
                            currentPageIndex={pageIndex}
                            onPageIndexChange={onPageIndexChange}
                        />                    
                    </tr>
                </tfoot>
            }
        </table>
    );
}

Table.propTypes = {
    dataHeaders: PropTypes.array.isRequired,
    dataColumns: PropTypes.array.isRequired,
    sorting: PropTypes.object.isRequired,
    dataCount: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onHeaderClick: PropTypes.func.isRequired,
    onPageIndexChange: PropTypes.func.isRequired
};

export default React.memo(Table);
