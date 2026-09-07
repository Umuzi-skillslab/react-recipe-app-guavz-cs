/**
 * DayCard.jsx
 * Represents a single day of the week with breakfast / lunch / dinner slots.
 * Reused 7 times by MealPlanner. Demonstrates multiple props + callbacks.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './MealPlanner.module.css';

const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner'];

const DayCard = ({ day, meals = {}, onRemoveMeal }) => {
  // Capitalise day name for display
  const dayLabel = day.charAt(0).toUpperCase() + day.slice(1);

  return (
    <div className={styles.dayCard}>
      <div className={styles.dayHeader}>{dayLabel}</div>

      <div className={styles.dayBody}>
        {MEAL_SLOTS.map((slot) => {
          const recipe = meals[slot];
          const isFilled = !!recipe;

          return (
            <div
              key={slot}
              className={`${styles.mealSlot} ${isFilled ? styles.mealSlotFilled : ''}`}
            >
              <span className={styles.slotLabel}>{slot}</span>

              {isFilled ? (
                <div className={styles.slotRecipe}>
                  <span>{recipe.title}</span>
                  <button
                    type="button"
                    className={styles.slotRemove}
                    onClick={() => onRemoveMeal && onRemoveMeal(day, slot)}
                    aria-label={`Remove ${recipe.title} from ${slot}`}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span className={styles.slotEmpty}>Add a recipe</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.shape({
    breakfast: PropTypes.object,
    lunch: PropTypes.object,
    dinner: PropTypes.object,
  }),
  onRemoveMeal: PropTypes.func,
};

export default DayCard;
