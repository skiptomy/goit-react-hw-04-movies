import React from 'react';
import propTypes from 'prop-types';
import Header from '../Header/Header';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <hr />
    {children}
  </div>
);

Layout.propTypes = {
  children: propTypes.element.isRequired,
};

export default Layout;
