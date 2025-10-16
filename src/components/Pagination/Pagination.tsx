// import ReactPaginate from "react-paginate";
// import css from "./Pagination.module.css";

// interface PaginationProps {
//   pageCount: number;
//   onPageChange: (selectedItem: { selected: number }) => void;
//   currentPage?: number;
// }

// export const Pagination = ({ pageCount, onPageChange, currentPage }: PaginationProps) => {
//   if (pageCount <= 1) return null;

  
//   const forcePage = typeof currentPage === "number" ? currentPage - 1 : undefined;

//   return (
//     <ReactPaginate
//       containerClassName={css.pagination}
//       pageClassName=""
//       pageLinkClassName=""
//       activeClassName={css.active}
//       breakLabel="..."
//       nextLabel=">"
//       previousLabel="<"
//       onPageChange={onPageChange}
//       pageRangeDisplayed={3}
//       pageCount={pageCount}
//       renderOnZeroPageCount={null}
//       forcePage={forcePage}
//     />
//   );
// };





import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};
