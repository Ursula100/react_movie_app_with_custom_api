import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PersonPage from "./pages/personPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./components/protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/form" element={ <AddMovieReviewPage /> } /> 
              </Route>
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/now_playing" element={<NowPlayingMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/person/:id" element={<PersonPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
              <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={ <SignUpPage /> } />
            </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);