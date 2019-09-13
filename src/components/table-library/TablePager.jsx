import React, { useState } from 'react';
import Button from '../common/Button.jsx';

const TablePager = ({
    dataCount,
    columnCount,
    pageCount = 20,
    onPageClicked
}) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    function countPages() {
        const remainder = dataCount % pageCount;
        let pages = dataCount / pageCount;
        
        if (remainder !== 0) {
            pages++;
        }

        return pages;
    }

    function onPageBtnClick({ target: { innerText: page } }) {
        const pageNumber = parseInt(page);

        setCurrentPageIndex(pageNumber - 1);
        //onPageClicked(currentPageIndex);
    }

    function onNextClick() {
        setCurrentPageIndex(currentPageIndex + 1);
        //onPageClicked(currentPageIndex);
    }

    function onPreviousClick() {
        setCurrentPageIndex(currentPageIndex - 1);
        //onPageClicked(currentPageIndex);
    }

    return (
        <>
            <td>
                <Button
                    btnTypeClass='light'
                    label='Previous'
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
                    onClick={onNextClick} />
            </td>
        </>
    );
};

export default TablePager;