import React from 'react';
import Pagination from '@mui/material/Pagination';


function PaginationComponent({ totalPages, currentPage, onPageChange }) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />

  );
}

export default PaginationComponent;
