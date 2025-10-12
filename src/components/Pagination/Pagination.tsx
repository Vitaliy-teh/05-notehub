import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) return null;

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
    />
  );
};
