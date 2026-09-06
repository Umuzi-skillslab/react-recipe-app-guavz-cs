/**
 * Footer.jsx
 * Site-wide footer with branding, quick links and copyright.
 * Uses React Router Link for internal navigation.
 * Demonstrates children-free, self-contained presentational component.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './common.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Brand column */}
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <span role="img" aria-hidden="true">👨‍🍳</span>
            Recipe Hub
          </div>
          <p className={styles.footerTagline}>
            Discover recipes, plan weekly meals and cook with confidence.
          </p>
        </div>

        {/* Explore links */}
        <div className={styles.footerColumn}>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/meal-planner">Meal Planner</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </div>

        {/* Categories (static for now – can later link to filtered routes) */}
        <div className={styles.footerColumn}>
          <h4>Categories</h4>
          <ul>
            <li><Link to="/recipes">Breakfast</Link></li>
            <li><Link to="/recipes">Lunch & Dinner</Link></li>
            <li><Link to="/recipes">Desserts</Link></li>
            <li><Link to="/recipes">Quick Meals</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© {currentYear} Recipe Hub. All rights reserved.</span>
        <span>Capstone 3 · Recipe Discovery & Meal Planning App</span>
      </div>
    </footer>
  );
};

export default Footer;
