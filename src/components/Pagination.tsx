import React from "react";

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasNext,
  hasPrev,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={!hasPrev}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};
