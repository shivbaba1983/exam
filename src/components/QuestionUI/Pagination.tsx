import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  currentIndex: number;
  total: number;
  onJump: (index: number) => void;
}

const Pagination = ({ currentIndex, total, onJump }: PaginationProps) => {
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
      <button
        className="page-nav"
        onClick={() => onJump(0)}
        disabled={currentIndex === 0}
      >
        First
      </button>

      {pages.map((i) => (
        <button
          key={i}
          className={`page-number ${i === currentIndex ? 'active' : ''}`}
          onClick={() => onJump(i)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="page-nav"
        onClick={() => onJump(total - 1)}
        disabled={currentIndex === total - 1}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
