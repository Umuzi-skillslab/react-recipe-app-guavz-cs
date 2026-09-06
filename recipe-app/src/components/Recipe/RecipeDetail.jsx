/**
 * RecipeDetail.jsx
 * Full recipe view with ingredients, instructions, video & audio.
 * Uses route parameter (useParams) and programmatic navigation (useNavigate).
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import Loading from '../UI/Loading';
import VideoPlayer from '../Media/VideoPlayer';
import AudioPlayer from '../Media/AudioPlayer';
import styles from './Recipe.module.css';

const RecipeDetail = ({
  recipes = [],
  favorites = [],
  onFavoriteToggle,
  onAddToPlan,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Find the recipe by the dynamic route param
  const recipe = recipes.find((r) => r.id === parseInt(id, 10));

  // Loading / not-found states (conditional rendering)
  if (!recipes.length) {
    return <Loading message="Loading recipe..." />;
  }

  if (!recipe) {
    return (
      <div className={styles.emptyState}>
        <h3>Recipe not found</h3>
        <p>The recipe you are looking for does not exist.</p>
        <Button variant="primary" onClick={() => navigate('/recipes')}>
          Back to Recipes
        </Button>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  // Toggle individual ingredient checkboxes (local state)
  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleFavorite = () => {
    if (onFavoriteToggle) onFavoriteToggle(recipe);
  };

  const handleAddToPlan = () => {
    if (onAddToPlan) onAddToPlan(recipe);
  };

  // Difficulty badge class
  const difficultyClass =
    recipe.difficulty === 'easy'
      ? styles.badgeEasy
      : recipe.difficulty === 'hard'
      ? styles.badgeHard
      : styles.badgeMedium;

  return (
    <div>
      {/* Back button – programmatic navigation */}
      <div className={styles.backBtn}>
        <Button variant="outline" onClick={() => navigate('/recipes')}>
          ← Back to Recipes
        </Button>
      </div>

      <div className={styles.detailLayout}>
        {/* Main content */}
        <div className={styles.detailMain}>
          {/* Hero image */}
          <div className={styles.detailHero}>
            <img
              src={recipe.image || 'https://via.placeholder.com/800x450?text=Recipe'}
              alt={recipe.title}
              className={styles.detailHeroImg}
            />
          </div>

          {/* Title + meta */}
          <div className={styles.detailHeader}>
            <h1 className={styles.detailTitle}>{recipe.title}</h1>

            <div className={styles.detailMeta}>
              <span className={styles.detailMetaItem}>
                ⏱ {recipe.cookTime} min
              </span>
              <span className={styles.detailMetaItem}>
                🍽 {recipe.servings || 4} servings
              </span>
              <span className={`${styles.badge} ${difficultyClass}`}>
                {recipe.difficulty
                  ? recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)
                  : 'Medium'}
              </span>
              {recipe.cuisine && (
                <span className={styles.detailMetaItem}>
                  🌍 {recipe.cuisine}
                </span>
              )}
            </div>

            <div className={styles.detailActions}>
              <Button
                variant={isFavorite ? 'secondary' : 'primary'}
                onClick={handleFavorite}
              >
                {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
              </Button>
              <Button variant="outline" onClick={handleAddToPlan}>
                + Add to Meal Plan
              </Button>
            </div>
          </div>

          {/* Ingredients */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🥗 Ingredients</h2>
            <ul className={styles.ingredientsList}>
              {(recipe.ingredients || []).map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <input
                    type="checkbox"
                    className={styles.ingredientCheck}
                    checked={!!checkedIngredients[index]}
                    onChange={() => toggleIngredient(index)}
                    id={`ing-${index}`}
                  />
                  <label htmlFor={`ing-${index}`}>{ingredient}</label>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📝 Instructions</h2>
            <ol className={styles.instructionsList}>
              {(recipe.instructions || []).map((step, index) => (
                <li key={index} className={styles.instructionItem}>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sidebar – media players */}
        <aside className={styles.detailSidebar}>
          <VideoPlayer
            videoUrl={recipe.videoUrl}
            title={`${recipe.title} – Tutorial`}
            poster={recipe.image}
          />
          <AudioPlayer
            audioUrl={recipe.audioUrl}
            title="Chef Tips"
            tip={recipe.tip || 'Take your time and taste as you go!'}
          />
        </aside>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  onFavoriteToggle: PropTypes.func,
  onAddToPlan: PropTypes.func,
};

export default RecipeDetail;
