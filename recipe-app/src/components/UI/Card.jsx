/**
 * Card.jsx
 * Simple container that demonstrates the children prop pattern.
 * Optional padding can be toggled via the `padded` prop.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Card = ({ children, padded = true, className = '', onClick }) => {
  return (
    <div
      className={`${styles.card} ${padded ? styles.cardPadding : ''} ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
