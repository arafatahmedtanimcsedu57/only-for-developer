import type { SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  page: number;
  setPage: (value: SetStateAction<number>) => void;
}

const TablePagination = ({ page, setPage }: TablePaginationProps) => {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page + 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
