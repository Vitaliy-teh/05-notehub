import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage?: number;
}

export const Pagination = ({ pageCount, onPageChange, currentPage }: PaginationProps) => {
  if (pageCount <= 1) return null;

  
  const forcePage = typeof currentPage === "number" ? currentPage - 1 : undefined;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      pageClassName=""
      pageLinkClassName=""
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      forcePage={forcePage}
    />
  );
};
