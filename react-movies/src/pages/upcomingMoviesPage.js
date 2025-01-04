import React, { useState } from "react";
import { getUpcomingMovies } from "../api/movies-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'
import MoviePagination from "../components/MoviePagePagination";

const UpcomingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1); // Manage the current page state

  const {  data, error, isLoading, isError }  = useQuery(['upcoming', currentPage],() => getUpcomingMovies(currentPage))

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Update the page when user clicks on a pagination button
  };

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const totalPages=500;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <>
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />
      }}
    />
    
    {/* Pagination reusable component */}
    <MoviePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default UpcomingMoviesPage;