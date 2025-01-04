import React, { useState } from "react";
import { useQuery } from 'react-query';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import MoviePagination from "../components/MoviePagePagination";

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1); // Manage the current page state

  // Fetch movies for the current page using react-query
  const { data, error, isLoading, isError } = useQuery(
    ['discover', currentPage], // Add currentPage as part of the query key to refetch data when page changes
    () => getMovies(currentPage) // Fetch movies for the current page
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Update the page when user clicks on a pagination button
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  //const totalMovies = data.total_results; // Total number of movies
  //const totalPages = data.total_pages; //Total number of pages, I thout but the api response is that the max is 500 so ...
  const totalPages=500;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const addToFavorites = (movieId) => true;

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
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

export default HomePage;
