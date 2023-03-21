import ReactPaginate from 'react-paginate';

const Pagination = ({ itemsLength, setItemOffset, itemsPerPage }) => {
  const pageCount = Math.ceil(itemsLength / itemsPerPage);
  
  const handlePageChange = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemsLength;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      onPageChange={handlePageChange}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< Previous"
      nextLabel="Next >"
      breakLabel="..."
      containerClassName="pagination justify-content-center m-4"
      pageClassName="page-item"
      previousClassName="page-item"
      nextClassName="page-item"
      breakClassName="page-item"
      pageLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      breakLinkClassName="page-link"
      activeLinkClassName="active"
    />
  );
}

export default Pagination;