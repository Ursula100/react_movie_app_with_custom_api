import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Card, CardMedia, CardContent } from "@mui/material";
import img from '../../images/person-profile-placeholder.png'


const PersonDetails = ({ person, credits }) => {
  return (
    <Paper sx={{ padding: '20px', margin: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img
            src={person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : img}
            alt={person.name}
            style={{ width: '100%', borderRadius: '8px', objectFit: 'contain' }}
          />
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Known For</Typography>
            <Typography variant="body1">{person.known_for_department || "Not available"}</Typography>
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Also Known As</Typography>
            {person.also_known_as && person.also_known_as.length > 0 ? (
              person.also_known_as.map((alias, index) => (
                <Chip key={index} label={alias} sx={{ margin: '2px' }} />
              ))
            ) : (
              <Typography variant="body1">Not available</Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Date of Birth</Typography>
            <Typography variant="body1" >{person.birthday || "Not Available"}</Typography>
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Place of Birth</Typography>
            <Typography variant="body1">{person.place_of_birth || "Not Available"}</Typography>
          </Box>
        </Grid>
        
        {/* Right Column: Two-thirds of the screen */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h2" >
            {person.name}
          </Typography>
          <Typography variant="body1" gutterBottom> {/*gutterBottom to add bottom margin*/}
           {person.biography ? person.biography : "Biography is not available at the moment."}
          </Typography>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Movie Credits</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto' }}>
              {credits.cast.map((movie) => (
                <Card key={movie.id} sx={{ minWidth: 150, marginRight: '10px' }}>
                  <Link to={`/movies/${movie.id}`} style={{color: 'inherit' }}>
                    <CardMedia
                      component="img"
                      image={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img}
                      alt={movie.title}
                      sx={{ height: 225, objectFit: 'contain' }}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {movie.title}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonDetails;