import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PagesMenu() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const { totalPages, currentPage, setCurrentPage } = ctx;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(...[1, 2, 3, 4, 5, "...", totalPages]);
      } else if (currentPage > totalPages - 3) {
        pages.push(
          ...[
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ]
        );
      } else {
        pages.push(
          ...[
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
          ]
        );
      }
    }
    return pages;
  };

  return (
    <div className="mb-6 flex justify-center">
      <Pagination>
        <PaginationContent className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage <= 1}
              className={`${
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => setCurrentPage(Number(page))}
                  isActive={currentPage === page}
                  className="min-w-[32px] px-2 sm:px-3 py-1 rounded-md transition hover:bg-gray-200"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              aria-disabled={currentPage >= totalPages}
              className={`${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-gray-200"
              }`}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PagesMenu;
