import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from './ListOfMovies.module.css';

const ListOfMovies = ({ location, movies }) => (
  <ul>
    {movies.map(movie => (
      <li key={movie.id} className={styles.item}>
        <Link
          className={styles.link}
          to={{
            pathname: `/movies/${movie.id}`,
            state: { from: location },
          }}
        >
          {movie.title ? movie.title : movie.name}
        </Link>
      </li>
    ))}
  </ul>
);

ListOfMovies.propTypes = {
  location: propTypes.shape.isRequired,
  movies: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    }),
  ).isRequired,
};

export default withRouter(ListOfMovies);
