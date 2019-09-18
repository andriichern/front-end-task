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

    function canGoNext() {
        return currentPageIndex < pages - 1;
    }

    function canGoBack() {
        return currentPageIndex > 0;
    }

    function countPages() {
        const remainder = dataCount % itemsPerPage;
        pages = dataCount / itemsPerPage;
        
        if (remainder !== 0) {
            pages++;
        }

        return pages;
    }

    function onPageBtnClick({ target: { innerText: page } }) {
        const pageNumber = parseInt(page);
        const currentPage = pageNumber - 1;

        setCurrentPageIndex(currentPage);
        onPageChange(currentPage);
    }

    function onNextClick() {
        if (canGoNext()) {
            const currentPage = currentPageIndex + 1;

            setCurrentPageIndex(currentPage);
            onPageChange(currentPage);
        }        
    }

    function onPreviousClick() {
        if (canGoBack()) {
            const currentPage = currentPageIndex - 1;

            setCurrentPageIndex(currentPage);
            onPageChange(currentPage);
        }        
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