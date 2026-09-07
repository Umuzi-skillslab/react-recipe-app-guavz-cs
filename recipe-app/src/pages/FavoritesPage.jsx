/**
 * FavoritesPage.jsx
 * Displays all favorited recipes. Shows empty state when none exist.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/Recipe/RecipeList';
import Button from '../components/UI/Button';
import styles from './pages.module.css';

const FavoritesPage = ({
  favorites = [],
  onFavoriteToggle,
  onAddToPlan,
}) => {
  const navigate = useNavigate();

  // Empty state (conditional rendering with ternary)
  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyPage}>
          <div className={styles.emptyIcon}>🤍</div>
          <h2>No favorites yet</h2>
          <p>Start exploring recipes and tap the heart to save your favourites here.</p>
          <Button variant="primary" onClick={() => navigate('/recipes')}>
            Browse Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your Favorites</h1>
        <p className={styles.pageSubtitle}>
          {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      <RecipeList
        recipes={favorites}
        favorites={favorites}
        onFavoriteToggle={onFavoriteToggle}
        onAddToPlan={onAddToPlan}
      />
    </div>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func,
  onAddToPlan: PropTypes.func,
};

export default FavoritesPage;
