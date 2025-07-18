// Button component for actions (primary/secondary)
import React from 'react';

/**
 * Button for actions
 * @param {string} variant - 'primary' or 'secondary'
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children - Button content
 */
export default function Button({ variant = 'primary', onClick, className = '', children, ...props }) {
  const base = 'font-semibold rounded-lg px-6 py-2 focus:outline-none transition';
  const styles =
    variant === 'primary'
      ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'
      : 'border border-blue-600 text-blue-600 hover:bg-blue-50';
  return (
    <button className={`${base} ${styles} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
} 