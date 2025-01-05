import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/movies-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { getSimilarMovies } from "../../api/tmdb-api";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Grid2 from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Carousel } from "react-responsive-carousel";
import SimilarMovieCard from "../similarMovieCard";

const TemplateMoviePage = ({ movie, children }) => {

  // Use the MUI theme and breakpoints to determine screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));  // Define mobile screen size
  
  const { data: ImagesData , error: ImagesError, isLoading: ImagesLoading, isError: ImagesIsError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  const { data: similarMoviesData, error: similarMoviesError, isLoading: similarMoviesLoading, isError: similarMoviesIsError } = useQuery(
    ['similar_movies', { id: movie.id }],
    getSimilarMovies
  );

  if (ImagesLoading || similarMoviesLoading) {
    return <Spinner />;
  }

  if (ImagesIsError) {
    return <h1>{ImagesError.message}</h1>;
  }

  if (similarMoviesIsError) {
    return <h1>{similarMoviesError.message}</h1>;
  }

  const images = ImagesData.posters 
  const similarMovies = similarMoviesData.results;

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{xs: 3}}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
                sx={{
                    height: "100vh",
                }}
                cols={1}
            >
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          </div>
        </Grid>

        <Grid size={{xs: 9}}>
          {children}
        </Grid>
        <Grid size={{xs: 12}}>
        <Typography variant="h5" component="h3" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
        Similar Movies
        </Typography>
        <Carousel showThumbs={false} autoPlay infiniteLoop centerMode centerSlidePercentage={isMobile ? 50: 20} showArrows stopOnHover>
          {similarMovies.map((m) => (
            <div key={m.id}>
              <Grid2 sx={{ padding: '14px' }}>
                <SimilarMovieCard movie={m} />
              </Grid2>
            </div>
          ))}
        </Carousel>
        </Grid>

      </Grid>
    </>
  );
};

export default TemplateMoviePage;