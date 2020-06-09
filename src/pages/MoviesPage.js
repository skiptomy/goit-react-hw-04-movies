/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import getQueryParams from '../utils/getQueryParams';
import ListOfMovies from './ListOfMovies';
import Searchbox from '../components/Searchbox/Searchbox';
import Spinner from '../components/Spinner/Spinner';
import movieApi from '../services/apiService';

export default class MoviesPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  state = {
    movies: [],
    query: '',
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: false });
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = query => {
    this.setState({ loading: true });
    this.setState({ query });
    movieApi
      .fetchMovieWithQuery(query)
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies, loading, query, error } = this.state;

    return (
      <>
        <Searchbox onSubmit={this.handleChangeQuery} />
        {loading && <Spinner />}

        {movies.length > 0 && !error && (
          <>
            <h2>A list of movies on demand: {query}</h2>
            <ListOfMovies movies={movies} />
          </>
        )}

        {!loading && movies.length === 0 && query && <p>Oops, movie not found</p>}
      </>
    );
  }
}
