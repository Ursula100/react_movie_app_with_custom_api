import React, { useState } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import MoviePagination from "../components/MoviePagePagination";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const NowPlayingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1); // Manage the current page state

  const {  data, error, isLoading, isError }  = useQuery(['playing_now', currentPage], () => getNowPlayingMovies(currentPage))

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
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const addToFavorites = (movieId) => true;

  return (
    <>
    <PageTemplate
      title='Movies Playing Now'
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
    <MoviePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
    />
    </>
  );
};
export default NowPlayingMoviesPage;