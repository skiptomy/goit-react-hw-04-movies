/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';
import movieApi from '../services/apiService';

export default class Reviews extends Component {
  state = {
    reviews: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    movieApi
      .fetchMovieReviews(this.props.match.params.movieId)
      .then(reviews => this.setState({ reviews }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { reviews, loading, error } = this.state;
    return (
      <>
        {loading && <Spinner />}
        {!loading && !error && reviews.length > 0 && (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p>Coment: {review.content}</p>
                <p>Author: {review.author}</p>
              </li>
            ))}
          </ul>
        )}

        {reviews.length === 0 && <p>Oops, we don`t have any reviews for this movie.</p>}
      </>
    );
  }
}
