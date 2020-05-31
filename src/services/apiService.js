const baseUrl = 'https://api.themoviedb.org/3';

const fetchPopularMovies = () => {
  return fetch(`${baseUrl}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`).then(res =>
    res.json().then(data => data.results),
  );
};

const fetchMovieWithQuery = query => {
  return fetch(`${baseUrl}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1`)
    .then(res => res.json())
    .then(data => data.results);
};

const fetchMovieDetails = movieId => {
  return fetch(`${baseUrl}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`).then(res => {
    const response = res.json();
    if (res.status === 404) {
      throw new Error('Movie not found');
    } else if (res.status !== 200) {
      throw new Error(response);
    }
    return response;
  });
};

const fetchMovieCast = movieId => {
  return fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`).then(res =>
    res.json().then(data => data.cast),
  );
};

const fetchMovieReviews = movieId => {
  return fetch(
    `${baseUrl}/movie/${movieId}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  ).then(res => res.json().then(data => data.results));
};

export default {
  fetchPopularMovies,
  fetchMovieWithQuery,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};
