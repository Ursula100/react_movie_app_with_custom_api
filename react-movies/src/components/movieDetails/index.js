import React, { useState } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationIcon from '@mui/icons-material/MonetizationOn';
import StarRate from '@mui/icons-material/StarRate';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { useQuery } from 'react-query';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Spinner from '../spinner';
import MovieReviews from '../movieReviews';
import Grid2 from '@mui/material/Grid';
import CastCard from '../castCard';
import { getMovieCredits } from '../../api/tmdb-api';

const root = {
  display: 'flex',
  justifyContent: 'start',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {

  // Use the MUI theme and breakpoints to determine screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));  // Define mobile screen size

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: creditsData, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery(
    ['movie_credits', { id: movie.id }],
    getMovieCredits
  );

  if (creditsLoading) {
    return <Spinner />;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }
  const { cast, crew } = creditsData;

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ marginTop: '14px', fontWeight: 'bold' }}>
        Overview
      </Typography>

      <Typography variant="h6" component="p" sx={{ marginBottom: '20px' }}>
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={{ ...chip }} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} sx={{ ...chip }} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} sx={{ ...chip }} />
        <Chip label={`Released: ${movie.release_date}`} sx={{ ...chip }} />
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Typography variant="h5" component="h3" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
        Crew
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        {crew.slice(0, 10).map((member) => (
          <li key={member.credit_id}>
            <Chip label={`${member.name} - ${member.job}`} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Typography variant="h5" component="h3" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
        Cast
      </Typography>
      <Carousel showThumbs={true} autoPlay infiniteLoop centerMode centerSlidePercentage={isMobile ? 33: 20} showArrows stopOnHover >
        {cast.slice(0, 10).map((c) => (
          <div key={c.id}>
            <Grid2 sx={{ padding: "14px" }}>
              <CastCard cast={c} />
            </Grid2>
          </div>
        ))}
        {/*<div>
          <Typography variant="h5" component="h5" sx={{ textAlign: 'center', padding: '20px'}}>
            <a href="/">View All</a>
          </Typography>
        </div>*/}
      </Carousel>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em',
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
