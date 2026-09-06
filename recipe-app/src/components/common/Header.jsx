/**
 * Header.jsx
 * Top application header containing the logo and a simple greeting.
 * This is a presentational component – navigation lives in Navbar.
 * Props: none (self-contained for now; can later accept userName)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './common.module.css';

const Header = () => {
  // Simple time-based greeting for a personal touch
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className={styles.header}>
      {/* Logo links back to Home */}
      <Link to="/" className={styles.logo} aria-label="Culinary Hub home">
        <span className={styles.logoIcon} role="img" aria-hidden="true">
          👨‍🍳
        </span>
        <span className={styles.logoText}>Recipe Hub</span>
      </Link>

      <div className={styles.headerRight}>
        <span className={styles.greeting}>
          {greeting}, Chef!
        </span>
      </div>
    </header>
  );
};

export default Header;
