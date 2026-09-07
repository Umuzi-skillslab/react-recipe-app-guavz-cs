/**
 * MealPlanner.jsx
 * Main container for the weekly meal plan.
 * Renders 7 DayCards and a sidebar of favorites for quick adding.
 * Demonstrates complex object state updates and sibling communication
 * through parent callbacks.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DayCard from './DayCard';
import Button from '../UI/Button';
import styles from './MealPlanner.module.css';

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const MealPlanner = ({
  mealPlan = {},
  favorites = [],
  onAddMeal,
  onRemoveMeal,
  onClearPlan,
}) => {
  // Local UI state: which day + slot the user wants to fill
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedSlot, setSelectedSlot] = useState('dinner');

  // When user clicks a favorite, add it to the currently selected day/slot
  const handleAddFavorite = (recipe) => {
    if (onAddMeal) {
      onAddMeal(selectedDay, selectedSlot, recipe);
    }
  };

  return (
    <div>
      {/* Header with actions */}
      <div className={styles.weekHeader}>
        <h2 className={styles.weekTitle}>My Weekly Meal Plan</h2>
        <div className={styles.weekActions}>
          <Button variant="outline" onClick={onClearPlan}>
            Clear Plan
          </Button>
        </div>
      </div>

      {/* Quick-add controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          alignItems: 'center',
          fontSize: '0.9rem',
        }}
      >
        <span style={{ color: '#6B6B6B' }}>Add next recipe to:</span>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          style={{
            padding: '0.4rem 0.6rem',
            borderRadius: 8,
            border: '1.5px solid #E5DDD4',
          }}
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          style={{
            padding: '0.4rem 0.6rem',
            borderRadius: 8,
            border: '1.5px solid #E5DDD4',
          }}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      <div className={styles.plannerLayout}>
        {/* Sidebar – favorites */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>❤️ Favorites</h3>

          {favorites.length === 0 ? (
            <p className={styles.emptyFavs}>
              No favorites yet. Heart some recipes to add them here.
            </p>
          ) : (
            favorites.map((recipe) => (
              <div
                key={recipe.id}
                className={styles.favItem}
                onClick={() => handleAddFavorite(recipe)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFavorite(recipe)}
                title={`Add "${recipe.title}" to ${selectedDay} ${selectedSlot}`}
              >
                <img
                  src={recipe.image || 'https://via.placeholder.com/44'}
                  alt=""
                  className={styles.favThumb}
                />
                <div className={styles.favInfo}>
                  <div className={styles.favName}>{recipe.title}</div>
                  <div className={styles.favMeta}>
                    {recipe.cookTime} min · Tap to add
                  </div>
                </div>
              </div>
            ))
          )}
        </aside>

        {/* 7-day grid */}
        <div className={styles.daysGrid}>
          {DAYS.map((day) => (
            <DayCard
              key={day}
              day={day}
              meals={mealPlan[day] || {}}
              onRemoveMeal={onRemoveMeal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

MealPlanner.propTypes = {
  mealPlan: PropTypes.object,
  favorites: PropTypes.arrayOf(PropTypes.object),
  onAddMeal: PropTypes.func,
  onRemoveMeal: PropTypes.func,
  onClearPlan: PropTypes.func,
};

export default MealPlanner;
