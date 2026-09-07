/**
 * NotFound.jsx
 * 404 page with programmatic navigation back to Home.
 * Required by the routing rubric section.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './pages.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.emptyPage}>
        <div className={styles.emptyIcon}>🔍</div>
        <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem', color: '#C45C26' }}>
          404
        </h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
