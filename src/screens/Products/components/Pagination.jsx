import React, { useEffect, useState } from 'react';
import './Pagination.css'
import { FaChevronCircleRight } from 'react-icons/fa';
import { PiCaretLeftFill, PiCaretLineLeftFill, PiCaretLineRightFill, PiCaretRightFill } from 'react-icons/pi';
import { BiLinkExternal } from 'react-icons/bi';

const Pagination = ({table, tablePageIndex, tablePageCount, setTablePageIndex}) => {

  const [pageInput, setPageInput] = useState(0);
  const [selectedRowCount, setSelectedRowCount] = useState(10);


  const handleFirstPageClick = () => {
    table.setPageIndex(0);
  }
  const handlePreviousPageClick = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
    }
  }
  const handleNextPageClick = () => {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  }
  const handleLastPageClick = () => {
    table.setPageIndex(table.getPageCount() - 1);
  }

  const handleGoToClick = () => {
    table.setPageIndex(pageInput - 1)
  }

  const handlePageSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedRowCount(value);
    table.setPageSize(value);
  };

  return (
    <div id='pagination-container'>
      <div id='pagination-rows-per-page'>
        Sayfa başına <select value={selectedRowCount} onChange={handlePageSizeChange}>
                       <option value={8}>8</option>
                       <option value={16}>16</option>
                       <option value={32}>32</option>
                       <option value={64}>64</option>
                     </select> satır
      </div>
      <div id='pagination-go-to'>
        Şu sayfaya git: 
        <input
          id='pagination-go-to-input'
          type='number'
          max={tablePageCount}
          min={1}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
        />
        <button 
          id='pagination-go-to-button'
          title='Sayfaya git'
          onClick={handleGoToClick}
        >
          <BiLinkExternal/>
        </button>
      </div>
      <button 
        className='pagination-button'
        onClick={handleFirstPageClick}
        title='İlk sayfaya git'
      >
        <PiCaretLineLeftFill/>
      </button>
      <div 
        className='pagination-button'
        onClick={handlePreviousPageClick}
        title='Bir önceki sayfaya git'
      >
        <PiCaretLeftFill/>
      </div>
      <div id='pagination-number-section'>
          {tablePageCount === 0 ?
            0
            :
            tablePageIndex + 1
          }. sayfa (toplam {tablePageCount} sayfa)
      </div>
      <div 
        className='pagination-button'
        onClick={handleNextPageClick}
        title='Bir sonraki sayfaya git'
      >
        <PiCaretRightFill/>
      </div>
      <div 
        className='pagination-button'
        onClick={handleLastPageClick}
        title='Son sayfaya git'
      >
        <PiCaretLineRightFill/>
      </div>
    </div>
  );
}

export default Pagination;