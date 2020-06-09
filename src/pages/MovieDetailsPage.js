/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import NotFound from './NotFound';
import Spinner from '../components/Spinner/Spinner';
import Cast from './Cast';
import Reviews from './Reviews';
import movieApi from '../services/apiService';
import routes from '../routes';
import styles from './MovieDetailsPage.module.css';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  state = { movie: null, loading: true, error: null };

  componentDidMount() {
    this.setState({ loading: true });
    movieApi
      .fetchMovieDetails(this.props.match.params.movieId)
      .then(movie => this.setState({ movie }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    return this.props.history.push(routes.movies);
  };

  render() {
    const image = 'https://image.tmdb.org/t/p/w300';
    const { movie, loading, error } = this.state;
    const { match, location } = this.props;

    return (
      <>
        {loading && <Spinner />}

        {!loading && error && <NotFound />}

        {!loading && !error && (
          <>
            <h1 className={styles.title}>{movie.title ? movie.title : movie.name}</h1>
            <img className={styles.image} src={`${image}${movie.poster_path}`} alt={movie.title} />
            {movie.popularity && <h2 className={styles.popularity}>Popularity: {movie.popularity}</h2>}
            {movie.overview && <p className={styles.overview}>{movie.overview}</p>}
          </>
        )}

        {!loading && !error && (
          <>
            <ul>
              <li className={styles.item}>
                <NavLink
                  className={styles.link}
                  activeClassName="Navigation-link-active"
                  to={{
                    pathname: `${match.url}/cast`,
                    state: { from: location.state && location.state.from },
                  }}
                  exact
                >
                  Cast
                </NavLink>
              </li>

              <Route path={`${routes.cast}`} component={Cast} />

              <li className={styles.item}>
                <NavLink
                  className={styles.link}
                  activeClassName="Navigation-link-active"
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: { from: location.state && location.state.from },
                  }}
                  exact
                >
                  Reviews
                </NavLink>
              </li>

              <Route path={`${routes.reviews}`} component={Reviews} />
            </ul>

            <button className={styles.button} type="button" onClick={this.handleGoBack}>
              Go back
            </button>
          </>
        )}
      </>
    );
  }
}
