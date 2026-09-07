/**
 * MealPlannerPage.jsx
 * Thin page wrapper that passes meal-plan state and handlers down.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MealPlanner from '../components/MealPlanner/MealPlanner';
import styles from './pages.module.css';

const MealPlannerPage = ({
  mealPlan,
  favorites,
  onAddMeal,
  onRemoveMeal,
  onClearPlan,
}) => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Meal Planner</h1>
        <p className={styles.pageSubtitle}>
          Plan delicious meals. Save time. Eat well.
        </p>
      </div>

      <MealPlanner
        mealPlan={mealPlan}
        favorites={favorites}
        onAddMeal={onAddMeal}
        onRemoveMeal={onRemoveMeal}
        onClearPlan={onClearPlan}
      />
    </div>
  );
};

MealPlannerPage.propTypes = {
  mealPlan: PropTypes.object,
  favorites: PropTypes.array,
  onAddMeal: PropTypes.func,
  onRemoveMeal: PropTypes.func,
  onClearPlan: PropTypes.func,
};

export default MealPlannerPage;
