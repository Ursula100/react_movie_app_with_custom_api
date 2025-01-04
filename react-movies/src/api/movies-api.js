/*Authentication Endpoints*/
 export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};


// Movies Endpoints

export const getUpcomingMovies = async (page) => { 
    const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/upcoming/?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
  
    return response.json();
  }; 

  export const getMovies = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies', {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
  };