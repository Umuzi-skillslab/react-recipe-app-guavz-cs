/**
 * App.jsx
 * Root component – owns all shared state, routing and top-level layout.
 *
 * State managed here (lifted state):
 *  - recipes[]
 *  - favorites[]
 *  - mealPlan{}
 *  - isLoading
 *
 * Persistence via localStorage for favorites and mealPlan.
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import RecipesPage from './pages/RecipesPage';
import RecipeDetail from './components/Recipe/RecipeDetail';
import MealPlannerPage from './pages/MealPlannerPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFound from './pages/NotFound';

import { recipesData } from './data/recipesData';
import './App.css';

// Default empty meal plan shape
const createEmptyMealPlan = () => ({
  monday: { breakfast: null, lunch: null, dinner: null },
  tuesday: { breakfast: null, lunch: null, dinner: null },
  wednesday: { breakfast: null, lunch: null, dinner: null },
  thursday: { breakfast: null, lunch: null, dinner: null },
  friday: { breakfast: null, lunch: null, dinner: null },
  saturday: { breakfast: null, lunch: null, dinner: null },
  sunday: { breakfast: null, lunch: null, dinner: null },
});

function App() {
  // ---------- State ----------
  const [recipes, setRecipes] = useState([]);

  // Lazy initializers: the function passed to useState only runs ONCE,
  // synchronously, before the first render. This means `favorites` and
  // `mealPlan` are already correct on render #1 — there's no gap where
  // they're briefly empty for another effect to accidentally overwrite
  // (which is what a separate "hydrate on mount" effect would allow).
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to load favorites from localStorage:', err);
      return [];
    }
  });

  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('mealPlan');
      return saved ? JSON.parse(saved) : createEmptyMealPlan();
    } catch (err) {
      console.error('Failed to load meal plan from localStorage:', err);
      return createEmptyMealPlan();
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // ---------- Effects ----------

  // 1. Load recipe data on mount
  useEffect(() => {
    // Simulate a short async load so Loading state can be demonstrated
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRecipes(recipesData);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // 2. Persist favorites whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 3. Persist meal plan whenever it changes
  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  // ---------- Handlers (passed down as props) ----------

  /** Toggle a recipe in / out of favorites */
  const handleFavoriteToggle = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === recipe.id);
      if (exists) {
        return prev.filter((f) => f.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  /** Add a recipe to a specific day + meal slot */
  const handleAddMeal = (day, slot, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: recipe,
      },
    }));
  };

  /** Remove a recipe from a specific day + meal slot */
  const handleRemoveMeal = (day, slot) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: null,
      },
    }));
  };

  /** Clear the entire week */
  const handleClearPlan = () => {
    setMealPlan(createEmptyMealPlan());
  };

  // Convenience: open meal planner after adding from a card
  // (For now we just add to Monday dinner as a sensible default)
  const handleAddToPlan = (recipe) => {
    handleAddMeal('monday', 'dinner', recipe);
  };

  // ---------- Render ----------
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar favoritesCount={favorites.length} />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  recipes={recipes}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddToPlan={handleAddToPlan}
                />
              }
            />
            <Route
              path="/recipes"
              element={
                <RecipesPage
                  recipes={recipes}
                  favorites={favorites}
                  isLoading={isLoading}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddToPlan={handleAddToPlan}
                />
              }
            />
            <Route
              path="/recipes/:id"
              element={
                <RecipeDetail
                  recipes={recipes}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddToPlan={handleAddToPlan}
                />
              }
            />
            <Route
              path="/meal-planner"
              element={
                <MealPlannerPage
                  mealPlan={mealPlan}
                  favorites={favorites}
                  onAddMeal={handleAddMeal}
                  onRemoveMeal={handleRemoveMeal}
                  onClearPlan={handleClearPlan}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddToPlan={handleAddToPlan}
                />
              }
            />
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;