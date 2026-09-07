/**
 * SearchBar.jsx
 * Controlled search input with submit button.
 * Demonstrates:
 *  - onChange + onSubmit event handling
 *  - accessing e.target.value / e.preventDefault()
 *  - controlled component pattern (value + onChange from parent)
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search recipes by ingredient, cuisine or dish...',
}) => {
  // Handle form submission – prevent full page reload
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value.trim());
    }
  };

  // Controlled input change
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search recipes"
      />
      <button type="submit" className={styles.searchButton}>
        🔍 Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
