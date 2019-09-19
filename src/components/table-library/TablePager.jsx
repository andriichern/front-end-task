import React, { useState } from 'react';
import Button from '../common/Button.jsx';

const TablePager = ({
    dataCount,
    columnCount,
    itemsPerPage,
    onPageChange
}) => {
    let pages;
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

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

        setCurrentPage(pageNumber - 1);
    }

    function onNextClick() {
        if (canGoNext()) {
            setCurrentPage(currentPageIndex + 1);
        }
    }

    function onPreviousClick() {
        if (canGoBack()) {
            setCurrentPage(currentPageIndex - 1);
        }
    }

    function setCurrentPage(currentPage) {
        setCurrentPageIndex(currentPage);
        onPageChange(currentPage);
    }

    return (
        <>
            <td>
                <Button
                    btnTypeClass='light'
                    label='Previous'
                    disabled={!canGoBack()}
                    onClick={onPreviousClick} />
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
                    onClick={onNextClick} />
            </td>
        </>
    );
};

export default TablePager;