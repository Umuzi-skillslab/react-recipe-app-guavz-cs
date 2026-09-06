/**
 * RecipeFilter.jsx
 * Filter controls for category, cuisine and difficulty.
 * Demonstrates onChange handlers and controlled selects.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import styles from './Recipe.module.css';

const RecipeFilter = ({
  category = 'all',
  cuisine = 'all',
  difficulty = 'all',
  onCategoryChange,
  onCuisineChange,
  onDifficultyChange,
  onClear,
}) => {
  return (
    <div className={styles.filterBar} role="group" aria-label="Recipe filters">
      {/* Category */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="filter-category">
          Category
        </label>
        <select
          id="filter-category"
          className={styles.filterSelect}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="snack">Snacks</option>
        </select>
      </div>

      {/* Cuisine */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="filter-cuisine">
          Cuisine
        </label>
        <select
          id="filter-cuisine"
          className={styles.filterSelect}
          value={cuisine}
          onChange={(e) => onCuisineChange(e.target.value)}
        >
          <option value="all">All Cuisines</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="asian">Asian</option>
          <option value="american">American</option>
          <option value="mediterranean">Mediterranean</option>
        </select>
      </div>

      {/* Difficulty */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="filter-difficulty">
          Difficulty
        </label>
        <select
          id="filter-difficulty"
          className={styles.filterSelect}
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="all">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Clear filters */}
      <div className={styles.clearBtn}>
        <Button variant="outline" onClick={onClear}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

RecipeFilter.propTypes = {
  category: PropTypes.string,
  cuisine: PropTypes.string,
  difficulty: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  onCuisineChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default RecipeFilter;
