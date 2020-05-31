import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

const Spinner = () => (
  <div className={styles.spinner}>
    <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
  </div>
);

export default Spinner;
