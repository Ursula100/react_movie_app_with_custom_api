# 🎥 React Movie App – Custom API Integrated Edition

By Ursula Tamen  
[YouTube Demo](https://youtu.be/76z9rz9Ho4I)

This is the enhanced version of my full-stack React Movie App. It builds on the previous TMDB-powered frontend by integrating a custom-built backend API to manage movies, users, and reviews. The project offers full authentication, route protection, and a dynamic UI experience.

---

## ✨ Key Features

### 🎬 Frontend (React)
- Discover movies using TMDB endpoints (`/upcoming`, `/now_playing`, etc.)
- View full movie details including cast, similar titles, and reviews
- Responsive UI layout using Material UI and `react-responsive-carousel`
- Filter and sort movie lists by title, rating, or release date
- Pagination for discoverable and now playing movies
- Sticky headers for improved navigation
- Graceful handling of missing data (e.g. no biography fallback)

### 🔧 Backend (Node.js + Express + MongoDB)
- Custom REST API exposing MongoDB-stored movies and TMDB proxy endpoints
- JWT-based authentication with login/register routes
- Password hashing using bcrypt for secure storage
- Role-based route protection using middleware
- Secure .env usage for API keys, JWT secrets, and DB connection
- Public/private endpoint logic using admin-level token handling

---

## 🛠 Setup Requirements

### API `.env` (in `movies-api/`)
```
NODE_ENV=development
PORT=8080
HOST=mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
TMDB_KEY=YourTMDBKey
REACT_APP_MOVIES_API_KEY=AUserTokenthatWillServeAsAPublicKey
```

### React `.env` (in `react-movies/`)
```
REACT_APP_MOVIES_API_KEY=AUserTokenthatWillServeAsAPublicKey
```

---

## 🧩 API Design

### 📂 MongoDB Endpoints
| Route | Method | Description |
|-------|--------|-------------|
| `/api/movies` | GET | Get all movies (paginated) |
| `/api/movies/{movieid}` | GET | Get one movie by ID |

### 🔐 Authentication
| Route | Method | Description |
|-------|--------|-------------|
| `/api/users` | POST | User login |
| `/api/users?action=register` | POST | User registration |

### 🎞 TMDB Proxy Endpoints
| Route | Method | Description |
|-------|--------|-------------|
| `/api/movies/tmdb/discover` | GET | Get movies by popularity (paginated) |
| `/api/movies/tmdb/upcoming` | GET | List upcoming movies |
| `/api/movies/tmdb/now_playing` | GET | List now playing movies |
| `/api/movies/tmdb/movie/{id}` | GET | Get detailed movie info |
| `/api/movies/tmdb/movie/{id}/images` | GET | Movie-related images |
| `/api/movies/tmdb/movie/{id}/reviews` | GET | User reviews (from TMDB) |
| `/api/movies/tmdb/movie/{id}/reviews` | POST | Add custom review (JWT required) |
| `/api/movies/tmdb/movie/{id}/similar` | GET | Recommend similar movies |
| `/api/movies/tmdb/movie/{id}/credits` | GET | Movie cast & crew |
| `/api/movies/tmdb/person/{id}/movie_credits` | GET | Credits for a person (actor/director) |
| `/api/movies/tmdb/genres` | GET | Available movie genres |

---

## 🔐 Security and Route Protection

### 🔑 Authentication
- JWT token generation and validation using middleware
- Tokens stored in browser `localStorage`
- Sent in header as `Authorization: Bearer <token>`

### 🔓 Public vs Protected Pages
| Page | Access Type |
|------|-------------|
| Browse Movies, Movie Details | Public |
| Favorites | Authenticated users only |
| Submit Review | Authenticated users only |

### 🧱 Middleware Features
- Token verification for all protected routes
- Invalid or expired tokens block access
- Role-based auth supported via admin key

### 🔐 Security Implementation
- Passwords hashed with bcrypt
- Sensitive data like JWT secrets stored in `.env`
- API key access for public data control via REACT_APP_MOVIES_API_KEY

---

## 🔗 Frontend Integration
- API requests made via Axios and React Query
- All requests check for stored auth token before protected actions
- Pages with favorites and review forms are blocked if not logged in

---

## 🎓 Skills Demonstrated
- Full-Stack Web Development (MERN)
- REST API Design + Secure Auth
- Frontend Pagination, Filtering, Sorting
- State Management with React Query
- Middleware and Role-Based Access Control
- Responsive UI/UX with Carousel & Breakpoints

---

## 📊 Demo & Screenshots
- Screenshots and UI previews to be added

---

Feel free to fork this repo, raise issues, or suggest improvements!
