import React from "react";
import { Button } from "@furever/ui/components/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="ghost"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isCurrentPage = page === currentPage;

          return (
            <Button
              key={page}
              variant={isCurrentPage ? "default" : "ghost"}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 p-0 ${
                isCurrentPage
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="ghost"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Button>
    </div>
  );
}
