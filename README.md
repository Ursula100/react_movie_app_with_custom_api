# Assignment 2 - Web API.

Name: Ursula Tamen

[YouTube Demo](https://youtu.be/76z9rz9Ho4I)

## Features.

- Further extension of API and intergration with react movies app

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

create an `.env` file in movies-api root folder and insert the following variables

______________________
NODE_ENV=development

PORT=8080

HOST=mongoDB=YourMongoURL

seedDb=true

secret=YourJWTSecret

TMDB_KEY=YourTMDBKey

REACT_APP_MOVIES_API_KEY=AUserTokenthatWillServeAsAPublicKey
______________________

create an `.env` file in react-movies root and insert the following variables
______________________

REACT_APP_MOVIES_API_KEY=AUserTokenthatWillServeAsAPublicKey
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

### API (MongoDB) Endpoints
- /api/movies | GET | Retrieve a paginated list of movies from the MongoDB database.
- /api/movies/{movieid} | GET | Retrieve detailed information about a specific movie using the movie ID from MongoDB.

### API Authentication Endpoints
- /api/users | POST | User login
- /api/users?action=register | POST | Create a user

### API (TMDB) Endpoints
- /api/movies/tmdb/discover | GET | Retrieve a paginated list of movies discovered from TMDB.
- /api/movies/tmdb/upcoming | GET | Retrieve a paginated list of upcoming movies from TMDB.
- /api/movies/tmdb/now_playing | GET | Retrieve a paginated list of movies currently playing in theaters from TMDB.
- /api/movies/tmdb/movie/{movieid} | GET | Retrieve detailed information about a specific movie using the movie ID from TMDB.
- /api/movies/tmdb/movie/{movieid}/images | GET | Retrieve images associated with a specific movie using the movie ID from TMDB.
- /api/movies/tmdb/movie/{movieid}/reviews | GET | Retrieve reviews for a specific movie using the movie ID from TMDB.
- /api/movies/tmdb/movie/{movieid}/reviews | POST | Create a new review for a specific movie using the movie ID from TMDB.
- /api/movies/tmdb/movie/{movieid}/similar | GET | Retrieve movies similar to a specific movie using the movie ID from TMDB.
- /api/movies/tmdb/movie/{movieid}/credits | GET | Retrieve cast and crew details for a specific movie using the movie ID from TMDB.
- /api/movies/tmdb/person/{personid}/movie_credits | GET | Retrieve movie credits for a specific person using the person ID from TMDB.
- /api/movies/tmdb/genres | GET | Retrieve a list of available movie genres from TMDB.

## Security and Authentication

### Authentication Mechanism
The API implements a JWT-based authentication system to secure access to endpoints.
- Only authorized users can perform actions such as accessing protected routes or modifying resources.
#### Details of Implementation
Token Generation:
Users authenticate themselves using their credentials (username and password) via the login endpoint.
Upon successful authentication, a JSON Web Token (JWT) is generated and sent to the client.
Token Verification:
Protected routes are secured using middleware that verifies the JWT in the Authorization header.
If the token is invalid or missing, the request is denied.
Local Storage of Token:
The token is stored in window.localStorage and attached to requests via the Authorization header as Bearer <token>.

### Public vs. Protected Endpoints
All endpoints require authentication. Most use API key REACT_APP_MOVIES_API_KEY which helps with unprotected pages such as the home page which still call endpoints. REACT_APP_MOVIES_API_KEY, which is securely stored in the .env file. To do these an "admin user" can be created and its token used. This helps keeep certain pages public.

Protected pages are secured and require a the visiting user's valid JWT token.

Protected Pages:
- Favorites page
- Add movie review page


### Middleware for Securing Routes
The API uses a custom middleware to secure routes.

### Security:
Environment Variables:
Keys like JWT_SECRET and MOVIES_API_PUBLIC_KEY are stored in environment variables to avoid hardcoding sensitive information.
Password Hashing:
User passwords are hashed using bcrypt before storing them in the database, ensuring password security even in the event of a data breach. 

## Integrating with React App

All calls are made to the API

## Independent learning (if relevant)

[N/A]
