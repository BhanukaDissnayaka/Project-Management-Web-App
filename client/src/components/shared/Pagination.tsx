import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  currentPage: number;
  goToPage: (page: number) => void;
}

const CustomPagination = ({
  pagination,
  currentPage,
  goToPage,
}: PaginationProps) => {
  const totalPages = pagination.totalPages;

  if (totalPages <= 1) return null; // no pagination needed

  // Calculate page numbers to display around current page
  const pageNumbers: (number | "ellipsis")[] = [];

  const delta = 2; // how many pages to show around current
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  pageNumbers.push(1); // first page always

  if (left > 2) pageNumbers.push("ellipsis"); // gap between 1 and left

  for (let i = left; i <= right; i++) {
    pageNumbers.push(i);
  }

  if (right < totalPages - 1) pageNumbers.push("ellipsis"); // gap between right and last

  if (totalPages > 1) pageNumbers.push(totalPages); // last page always

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
          </PaginationItem>
        )}

        {pageNumbers.map((p, idx) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={() => goToPage(p as number)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => goToPage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
