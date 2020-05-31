import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFound from './pages/NotFound';
import Layout from './components/Layout/Layout';
import routes from './routes';

const App = () => (
  <Layout>
    <Switch>
      <Route path={routes.home} exact component={HomePage} />
      <Route path={routes.movies} exact component={MoviesPage} />
      <Route path={routes.moviesDetails} component={MovieDetailsPage} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
