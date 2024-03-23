import { useState } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const maxVisiblePages = 5;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - halfMaxVisiblePages);
  let end = Math.min(start + maxVisiblePages - 1, totalPages);

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-center p-10'>
      <button
        className={`mr-2 h-10 pb-5 ${currentPage === 1 ? 'hidden' : ''}`}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <FaLongArrowAltLeft />
      </button>
      {start > 1 && (
        <>
          <span className='mr-2 cursor-pointer' onClick={() => onPageChange(1)}>
            1
          </span>
          <span className='mr-2'>...</span>
        </>
      )}
      {[...Array(end - start + 1)].map((_, index) => (
        <span
          key={start + index}
          className={`mr-2 cursor-pointer${start + index === currentPage ? ' font-bold text-lg scale-125 h-10 pb-20' : ''}`}
          onClick={() => {
            onPageChange(start + index);
            setCurrentPage(start + index);
          }}
        >
          {start + index}
        </span>
      ))}
      {end < totalPages && (
        <>
          <span className='mr-2'>...</span>
          <span className='mr-2 cursor-pointer' onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </span>
        </>
      )}
      <button
        className={`ml-2 h-10 pb-5 ${currentPage === totalPages ? 'hidden' : ''}`}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default Pagination;
