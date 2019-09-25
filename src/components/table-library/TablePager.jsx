import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';

const TablePager = ({
    dataCount,
    columnCount,
    itemsPerPage,
    currentPageIndex,
    onPageIndexChange
}) => {
    let pages;

    function countPages() {
        if (dataCount > 0) {
            const remainder = dataCount % itemsPerPage;
            pages = Math.floor(dataCount / itemsPerPage);
            
            if (remainder !== 0) {
                pages++;
            }

            return pages;
        }

        return 0;
    }

    function canGoNext() {
        return currentPageIndex < pages - 1;
    }

    function canGoBack() {
        return currentPageIndex > 0;
    }

    function onPageBtnClick({ target: { innerText: page } }) {
        const pageNumber = parseInt(page);

        onPageIndexChange(pageNumber - 1);
    }

    function onNextBtnClick() {
        if (canGoNext()) {
            onPageIndexChange(currentPageIndex + 1);
        }
    }

    function onPreviousBtnClick() {
        if (canGoBack()) {
            onPageIndexChange(currentPageIndex - 1);
        }
    }

    return (
        <>
            <td>
                <Button
                    btnTypeClass='light'
                    label='Previous'
                    disabled={!canGoBack()}
                    onClick={onPreviousBtnClick} />
            </td>
            <td colSpan={columnCount - 2}>
                {[...Array(countPages())].map((page, i) => {
                    return <Button
                        key={i}
                        btnTypeClass={'light btn-page' + (currentPageIndex === i ? ' active' : '')}
                        label={i + 1}
                        onClick={onPageBtnClick} />
                })}
            </td>
            <td>
                <Button
                    btnTypeClass='light'
                    label='Next'
                    disabled={!canGoNext()}
                    onClick={onNextBtnClick} />
            </td>
        </>
    );
};

TablePager.propTypes = {
    dataCount: PropTypes.number.isRequired,
    columnCount: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    onPageIndexChange: PropTypes.func.isRequired
};

export default React.memo(TablePager);