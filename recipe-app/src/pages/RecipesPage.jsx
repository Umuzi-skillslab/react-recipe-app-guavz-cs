/**
 * RecipesPage.jsx
 * Browse, search and filter all recipes.
 * Demonstrates multiple useState hooks, filtering logic and conditional rendering.
 */

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/UI/SearchBar';
import RecipeFilter from '../components/Recipe/RecipeFilter';
import RecipeList from '../components/Recipe/RecipeList';
import Loading from '../components/UI/Loading';
import styles from './pages.module.css';

const RecipesPage = ({
  recipes = [],
  favorites = [],
  isLoading = false,
  onFavoriteToggle,
  onAddToPlan,
}) => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCuisine = searchParams.get('cuisine') || 'all';

  // Local filter state
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [cuisine, setCuisine] = useState(
    ['italian', 'mexican', 'asian', 'american', 'mediterranean'].includes(initialCuisine)
      ? initialCuisine
      : 'all'
  );
  const [difficulty, setDifficulty] = useState('all');

  // Derived filtered list (useMemo for efficiency)
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        !searchTerm ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.ingredients || []).some((ing) =>
          ing.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        category === 'all' || recipe.category === category;

      const matchesCuisine =
        cuisine === 'all' || recipe.cuisine === cuisine;

      const matchesDifficulty =
        difficulty === 'all' || recipe.difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
    });
  }, [recipes, searchTerm, category, cuisine, difficulty]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setCuisine('all');
    setDifficulty('all');
  };

  // Loading state
  if (isLoading) {
    return <Loading message="Loading recipes..." />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>All Recipes</h1>
        <p className={styles.pageSubtitle}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={() => {}}
          placeholder="Search by title or ingredient..."
        />
      </div>

      <RecipeFilter
        category={category}
        cuisine={cuisine}
        difficulty={difficulty}
        onCategoryChange={setCategory}
        onCuisineChange={setCuisine}
        onDifficultyChange={setDifficulty}
        onClear={handleClearFilters}
      />

      <RecipeList
        recipes={filteredRecipes}
        favorites={favorites}
        onFavoriteToggle={onFavoriteToggle}
        onAddToPlan={onAddToPlan}
      />
    </div>
  );
};

RecipesPage.propTypes = {
  recipes: PropTypes.array,
  favorites: PropTypes.array,
  isLoading: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
  onAddToPlan: PropTypes.func,
};

export default RecipesPage;
