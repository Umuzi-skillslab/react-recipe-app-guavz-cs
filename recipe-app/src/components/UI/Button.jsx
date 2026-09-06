/**
 * Button.jsx
 * Reusable button with variant support (primary | secondary | danger | outline).
 * Demonstrates:
 *  - default parameter values
 *  - props destructuring
 *  - children prop
 *  - PropTypes validation
 *  - conditional className (expression as prop)
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Button = ({
  children,
  variant = 'primary',   // default parameter
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...rest                 // allow extra props (aria-*, etc.)
}) => {
  // Map variant prop → CSS module class
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

// PropTypes validation (required by rubric for 3+ components)
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
