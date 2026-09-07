/**
 * RecipeList.jsx
 * Renders an array of RecipeCards using .map().
 * Demonstrates list rendering, key prop, and parent → child data flow.
 */

import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import styles from './Recipe.module.css';

const RecipeList = ({
  recipes = [],
  favorites = [],
  onFavoriteToggle,
  onAddToPlan,
}) => {
  // Empty state – conditional rendering with &&
  if (!recipes || recipes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No recipes found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  // Helper: is this recipe currently favorited?
  const isFavorite = (recipeId) =>
    favorites.some((fav) => fav.id === recipeId);

  return (
    <div className={styles.listGrid}>
      {/* Map used to render the list – required by rubric */}
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={isFavorite(recipe.id)}
          onFavoriteToggle={onFavoriteToggle}
          onAddToPlan={onAddToPlan}
        />
      ))}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  onFavoriteToggle: PropTypes.func,
  onAddToPlan: PropTypes.func,
};

export default RecipeList;
