import React, { useState, useEffect } from 'react';
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
    start = Math.min(
      currentIndex - Math.floor(maxVisible / 2),
      total - maxVisible
    );
    if (start < 0) start = 0;
  }

  const pages = [];
  for (let i = start; i < Math.min(total, start + maxVisible); i++) {
    pages.push(i);
  }

  const [inputValue, setInputValue] = useState((currentIndex + 1).toString());

  const jumpToPage = (value: string) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 1 && num <= total) {
      onJump(num - 1);
    } else {
      setInputValue((currentIndex + 1).toString());
    }
  };

  useEffect(() => {
    setInputValue((currentIndex + 1).toString());
  }, [currentIndex]);

  return (
    <div className="pagination">
      <button
        className="page-nav"
        onClick={() => onJump(0)}
        disabled={currentIndex === 0}
      >
        First
      </button>

      {start > 0 && <span className="ellipsis">...</span>}

      {pages.map((i) => (
        <button
          key={i}
          className={`page-number ${i === currentIndex ? 'active' : ''}`}
          onClick={() => onJump(i)}
        >
          {i + 1}
        </button>
      ))}

      {start + maxVisible < total && <span className="ellipsis">...</span>}

      <button
        className="page-nav"
        onClick={() => onJump(total - 1)}
        disabled={currentIndex === total - 1}
      >
        Last
      </button>

      <div className="page-jump">
        <label htmlFor="pageInput">Go to page:</label>
        <input
          id="pageInput"
          type="number"
          min={1}
          max={total}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => jumpToPage(inputValue)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              jumpToPage(inputValue);
              e.currentTarget.blur();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;