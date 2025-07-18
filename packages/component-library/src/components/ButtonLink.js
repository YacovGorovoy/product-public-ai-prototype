// ButtonLink component for clickable text links
import React from 'react';

/**
 * ButtonLink component for clickable text links
 * @param {function} onClick - Click handler
 * @param {string} children - Link text
 * @param {string} className - Additional classes
 * @param {string} variant - Link variant ('primary', 'secondary', 'danger')
 * @param {boolean} disabled - Whether the link is disabled
 */
export default function ButtonLink({ 
  onClick, 
  children, 
  className = '', 
  variant = 'primary',
  disabled = false
}) {
  const baseClasses = 'text-sm underline cursor-pointer transition-colors';
  
  const variantClasses = {
    primary: 'text-blue-600 hover:text-blue-800',
    secondary: 'text-gray-600 hover:text-gray-800',
    danger: 'text-red-600 hover:text-red-800'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}

// Example usage:
// <ButtonLink onClick={() => handleAddQuantity()}>Add quantity</ButtonLink> 