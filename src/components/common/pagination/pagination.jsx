import React, { useState, useEffect } from 'react';
import './pagination.scss';
import { Icon } from 'antd';

function Pagination({ data, onChangePage, limit }) {
  const [pager, setPager] = useState({})

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    setPage(1)
    const totalArray = data.slice(pager.startIndex, pager.endIndex + 1)
    if(totalArray.length > 0) {
      setPage(pager.currentPage)
    } else {
      setPage(pager.currentPage - 1)
      if(data.length !== pager.endIndex) {
        setPage(1)
      }
    }
  }, [data])

  const setPage = (page) => {
    var items = data;
    var pagers = pager;

    if (page < 1 || !page) {
      return;
    }

    pagers = getPager(items.length, page, limit);
    var pageOfItems = items.slice(pagers.startIndex, pagers.endIndex + 1);

    setPager({...pagers})

    onChangePage(pageOfItems)
  }

  const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  if (!pager.pages || pager.pages.length <= 1) {
    return null;
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
        <span onClick={() => setPage(pager.currentPage - 1)}><Icon type="left" /></span>
      </li>

      <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
        <span onClick={() => setPage(1)}><Icon type="double-left" /></span>
      </li>
      {pager.pages.map((page, index) =>
        <li key={index} className={`page-item ${pager.currentPage === page ? 'active' : ''}`}>
          <span className="number-item" onClick={() => setPage(page)}>{page}</span>
        </li>
      )}
      <li className={`page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
        <span onClick={() => setPage(pager.totalPages)}><Icon type="double-right" /></span>
      </li>

      <li className={`page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
        <span onClick={() => setPage(pager.currentPage + 1)}><Icon type="right" /></span>
      </li>
    </ul>
  );
}

export default Pagination;
