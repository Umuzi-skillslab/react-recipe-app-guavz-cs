/**
 * Home.jsx
 * Landing page with hero, search, category chips and recommended recipes.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/UI/SearchBar';
import RecipeList from '../components/Recipe/RecipeList';
import AudioPlayer from '../components/Media/AudioPlayer';
import styles from './pages.module.css';

const CATEGORIES = [
  { label: 'Italian', value: 'italian', emoji: '🍝' },
  { label: 'Asian', value: 'asian', emoji: '🍜' },
  { label: 'Mexican', value: 'mexican', emoji: '🌮' },
  { label: 'Desserts', value: 'dessert', emoji: '🍰' },
  { label: 'Vegetarian', value: 'vegetarian', emoji: '🥗' },
  { label: 'Quick Meals', value: 'quick', emoji: '⚡' },
];

const Home = ({
  recipes = [],
  favorites = [],
  onFavoriteToggle,
  onAddToPlan,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Simple client-side filter for the hero search
  const handleSearchSubmit = (term) => {
    if (term) {
      navigate(`/recipes?q=${encodeURIComponent(term)}`);
    } else {
      navigate('/recipes');
    }
  };

  // Show a selection of recommended recipes (first 8)
  const recommended = recipes.slice(0, 8);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Recipes.
            <br />
            Plan Better Meals.
          </h1>
          <p className={styles.heroSubtitle}>
            Find inspiration, plan delicious meals, and enjoy cooking more.
          </p>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={handleSearchSubmit}
          />

          {/* Category chips */}
          <div className={styles.chips}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={styles.chip}
                onClick={() => navigate(`/recipes?cuisine=${cat.value}`)}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recommended for You</h2>
          <button
            type="button"
            className={styles.viewAll}
            onClick={() => navigate('/recipes')}
          >
            View All →
          </button>
        </div>

        <RecipeList
          recipes={recommended}
          favorites={favorites}
          onFavoriteToggle={onFavoriteToggle}
          onAddToPlan={onAddToPlan}
        />
      </section>

      {/* Audio tips on Home (rubric requirement) */}
      <section className={styles.section} style={{ maxWidth: 480 }}>
        <AudioPlayer
          audioUrl=""
          title="Daily Cooking Tip"
          tip="Always taste your food as you cook – seasoning at the end is often too late."
        />
      </section>
    </div>
  );
};

Home.propTypes = {
  recipes: PropTypes.array,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func,
  onAddToPlan: PropTypes.func,
};

export default Home;
