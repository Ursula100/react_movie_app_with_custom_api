import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import img from '../../images/person-profile-placeholder.png'
import { Link } from "react-router-dom";
import { styled } from '@mui/system';

const ImageWrapper = styled('div')({
    height: 300,
    '& img': {
      width: '100%',
      height: 'auto', // Maintains aspect ratio
      maxHeight: '100%', // Ensures image does not exceed the container height
    },
  });

export default function CastCard({cast}) {
    return (
        <Card>
            <Link to={`/person/${cast.id}`} style={{color: 'inherit' }}>
        <ImageWrapper>
        <img
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
              : img
          }
          alt={cast.name}
        />
      </ImageWrapper>
        <CardContent>
            <Grid container>
            <Grid size={{xs: 12}}>
                <Typography variant="h6" component="p">
                {cast.name}
                </Typography>
            </Grid>
            <Grid size={{xs: 12}}>
                <Typography variant="p" component="p">
                {cast.character}
                </Typography>
            </Grid>
            </Grid>
        </CardContent>
        </Link>
        </Card>
    );
}