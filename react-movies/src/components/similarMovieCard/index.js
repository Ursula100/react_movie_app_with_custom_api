import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import { styled } from '@mui/system';

const ImageWrapper = styled('div')({
    height: 500,
    '& img': {
      width: '100%',
      height: 'auto', // Maintains aspect ratio
      maxHeight: '100%', // Ensures image does not exceed the container height
    },
  });

export default function SimilarMovieCard({movie}) {
    return (
        <Card>
        <CardHeader
            title={
            <Typography variant="h5" component="p">
                {movie.title}{" "}
            </Typography>
            }
        />
        <ImageWrapper>
        <img
          src={
            movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : img
            }
            alt={movie.title}
            />
        </ImageWrapper>
        <CardContent >
            <Grid container>
            <Grid size={{xs: 12}}>
                <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
                </Typography>
            </Grid>
            <Grid size={{xs: 12}}>
                <Typography variant="h6" component="p">
                <StarRateIcon fontSize="small" />
                {"  "} {movie.vote_average}{" "}
                </Typography>
            </Grid>
            <Grid size={{xs: 12}}>
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
}