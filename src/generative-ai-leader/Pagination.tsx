import React, { useState, useEffect } from 'react';
import './Pagination.scss';

interface PaginationProps {
  currentIndex: number;
  total: number;
  onJump: (index: number) => void;
}

const Pagination = ({ currentIndex, total, onJump }: PaginationProps) => {
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

  const prev = Math.max(currentIndex - 1, 0);
  const next = Math.min(currentIndex + 1, total - 1);

  const displayPages = Array.from(
    new Set([
      currentIndex - 1,
      currentIndex,
      currentIndex + 1,
    ])
  ).filter((i) => i >= 0 && i < total);

  return (
    <div className="pagination">
      <button
        className="page-nav"
        onClick={() => onJump(0)}
        disabled={currentIndex === 0}
      >
        First
      </button>

      {displayPages.map((i) => (
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
