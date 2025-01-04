import React from 'react';
import Pagination from '@mui/material/Pagination';

const MoviePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
      />
    </div>
  );
};

export default MoviePagination;
