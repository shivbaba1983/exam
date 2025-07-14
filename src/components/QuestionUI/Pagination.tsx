import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  currentIndex: number;
  total: number;
  onJump: (index: number) => void;
}

const Pagination = ({ currentIndex, total, onJump }: PaginationProps) => {
  // Display a sliding window of page numbers, e.g. 10 pages at a time
  const maxVisible = 10;
  let start = 0;
  if (currentIndex >= maxVisible / 2) {
    start = Math.min(currentIndex - Math.floor(maxVisible / 2), total - maxVisible);
    if (start < 0) start = 0;
  }

  const pages = [];
  for (let i = start; i < Math.min(total, start + maxVisible); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((i) => (
        <button
          key={i}
          className={`page-number ${i === currentIndex ? 'active' : ''}`}
          onClick={() => onJump(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
