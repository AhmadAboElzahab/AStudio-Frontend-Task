import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className='pagination'>
      {pageNumbers.map((page) => (
        <li key={page} className={currentPage === page ? 'active' : ''}>
          <button onClick={() => onPageChange(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
