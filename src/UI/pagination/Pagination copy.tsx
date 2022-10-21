import { useEffect, useState } from "react";

import { Page } from "../../models/Page";

type PaginationProps = {
  onPageClick: (page: number) => void,
  page: Page,
  totalCount: number,
}
type PageInfo = {
  pageNumber: number, 
  name: string,
}

const Pagination = ({onPageClick, page, totalCount}: PaginationProps) => {
const [pages, setPages] = useState<PageInfo[]>([]);

  useEffect(() => {
    generatePagination(page.page, totalCount, page.count);
  },[page, totalCount]);

  const generatePagination = (page: number, totalCount: number, count: number) => {
    const pages: PageInfo[] = [];
    const pageCntShow = 10;

    const pageCntTotal = Math.ceil(totalCount / count);
    const startPage = (Math.floor((page - 1) / pageCntShow) * pageCntShow + 1);
    const endPage = Math.min(pageCntTotal, (startPage + pageCntShow) - 1);

    if (startPage > pageCntShow) {
      pages.push({ pageNumber: 1, name: 'first' });
      pages.push({ pageNumber: startPage - pageCntShow, name: 'prev' });
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ pageNumber: i, name: i.toString() });
    }

    if (endPage < pageCntTotal) {
      pages.push({ pageNumber: startPage + pageCntShow, name: 'next' });
      pages.push({ pageNumber: pageCntTotal, name: 'last' });
    }

    setPages(pages);
  }

  const iClass = (name: string): string | null => {
    switch (name) {
      case 'first':
        return 'first';
      case 'prev':
        return 'prev';
      case 'next':
        return 'next';
      case 'last':
        return 'last';
    }
    return null;
  }
  
  const pageList = pages.map(pageItem => 
    <li key={pageItem.pageNumber} className={`${page.page === pageItem.pageNumber ? 'on' : ''}`}>
      {!iClass(pageItem.name) && <a onClick={() => onPageClick(pageItem.pageNumber) }>{pageItem.name}</a>}
      {iClass(pageItem.name) && <a onClick={() => onPageClick(pageItem.pageNumber) } className={pageItem.name}></a>}
    </li>
    )

  return (
    <div className="paging">
      <ul>
        {pageList}
      </ul>
    </div>
  );
}

export default Pagination;