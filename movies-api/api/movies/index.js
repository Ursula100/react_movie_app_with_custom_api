import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import {getGenres, getUpcomingMovies, getNowPlayingMovies, getMovie, getDiscoverMovies, getMovieImages, getMovieReviews, getSimilarMovies, getMovieCredits} from '../tmdb-api';  
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details from mongo database
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));



/*Endpoints from TMDB*/

router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const { page } = req.query; // Extract page from query parameters
    const discoverMovies = await getDiscoverMovies(page);
    res.status(200).json(discoverMovies);
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const { page } = req.query; // Extract page from query parameters
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/now_playing', asyncHandler(async (req, res) => {
    const { page } = req.query; // Extract page from query parameters
    const nowPlayingMovies = await getNowPlayingMovies(page);
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie({ queryKey: ['movie', { id }] });
    res.status(200).json(movie);
}));

router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages({ queryKey: ['movie', { id }] });
    res.status(200).json(images);
}));

router.get('/tmdb/movie/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews({ queryKey: ['movie', { id }] });
    res.status(200).json(reviews);
}));

router.get('/tmdb/movie/:id/similar', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movies = await getSimilarMovies({ queryKey: ['movie', { id }] });
    res.status(200).json(movies);
}));

router.get('/tmdb/movie/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movies = await getMovieCredits({ queryKey: ['movie', { id }] });
    res.status(200).json(movies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

export default router;
