/**
 * Loading.jsx
 * Simple spinner + message used for loading states.
 * Demonstrates conditional rendering support (parent decides when to show it).
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Loading = ({ message = 'Loading recipes...' }) => {
  return (
    <div className={styles.loadingContainer} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
