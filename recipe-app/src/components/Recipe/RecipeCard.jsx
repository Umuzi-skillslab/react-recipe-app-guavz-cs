/**
 * RecipeCard.jsx
 * Displays a single recipe summary.
 * Demonstrates multiple props, destructuring, PropTypes,
 * conditional styling, and custom event handlers passed from parent.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import styles from './Recipe.module.css';

const RecipeCard = ({
  recipe,
  isFavorite = false,
  onFavoriteToggle,
  onAddToPlan,
}) => {
  const navigate = useNavigate();

  // Destructure the recipe object for cleaner JSX
  const {
    id,
    title,
    image,
    cookTime = 30,
    difficulty = 'medium',
    category = '',
  } = recipe;

  // Navigate to detail page (programmatic navigation – required by rubric)
  const handleCardClick = () => {
    navigate(`/recipes/${id}`);
  };

  // Stop propagation so the heart click does not also navigate
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(recipe);
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (onAddToPlan) {
      onAddToPlan(recipe);
    }
  };

  // Map difficulty → badge class (conditional styling)
  const difficultyClass =
    difficulty === 'easy'
      ? styles.badgeEasy
      : difficulty === 'hard'
      ? styles.badgeHard
      : styles.badgeMedium;

  return (
    <article
      className={styles.card}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`View recipe: ${title}`}
    >
      <div className={styles.imageWrapper}>
        <img
          src={image || 'https://via.placeholder.com/400x300?text=Recipe'}
          alt={title}
          className={styles.image}
          loading="lazy"
        />
        <button
          type="button"
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.metaRow}>
          <span>⏱ {cookTime} min</span>
          <span className={`${styles.badge} ${difficultyClass}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          {category && <span>· {category}</span>}
        </div>

        <div className={styles.cardActions}>
          <Button variant="outline" onClick={handleAddClick}>
            + Meal Plan
          </Button>
        </div>
      </div>
    </article>
  );
};

// PropTypes – required by rubric for at least 3 components
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    cookTime: PropTypes.number,
    difficulty: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
  onAddToPlan: PropTypes.func,
};

export default RecipeCard;
