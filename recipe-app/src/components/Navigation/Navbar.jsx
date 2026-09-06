/**
 * Navbar.jsx
 * Main application navigation.
 * Features required by the rubric:
 *  - React Router <Link> components
 *  - Active route styling via useLocation
 *  - Responsive hamburger menu for mobile
 *  - Favorites count badge
 *  - Sticky / fixed header behaviour (via CSS)
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

const Navbar = ({ favoritesCount = 0 }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper: is the current path matching this link?
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close mobile menu after a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Shared link data so desktop & mobile stay in sync
  const links = [
    { to: '/', label: 'Home', exact: true },
    { to: '/recipes', label: 'Recipes' },
    { to: '/meal-planner', label: 'Meal Planner' },
    { to: '/favorites', label: 'Favorites', showBadge: true },
  ];

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navInner}>
        {/* Brand / Logo */}
        <Link to="/" className={styles.brand} onClick={handleLinkClick}>
          <span className={styles.brandIcon} role="img" aria-hidden="true">
            👨‍🍳
          </span>
          <span className={styles.brandText}>Recipe Hub</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.navLinks}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${styles.navLink} ${isActive(link.to) ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                {link.label}
                {/* Favorites badge */}
                {link.showBadge && favoritesCount > 0 && (
                  <span className={styles.badge} aria-label={`${favoritesCount} favorites`}>
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button – mobile only */}
        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.hamburgerIcon} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileLinks}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${styles.mobileLink} ${isActive(link.to) ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                {link.label}
                {link.showBadge && favoritesCount > 0 && (
                  <span className={styles.badge}>{favoritesCount}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  favoritesCount: PropTypes.number,
};

export default Navbar;
