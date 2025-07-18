// LinkButton for text-based actions that look like links
import React from 'react';

/**
 * LinkButton for text-based actions
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children - Button content
 * @param {boolean} disabled - Whether button is disabled
 */
export default function LinkButton({ onClick, className = '', children, disabled = false, ...props }) {
  const base = 'text-sm font-semibold focus:outline-none transition-colors';
  const styles = disabled 
    ? 'text-gray-400 cursor-not-allowed' 
    : 'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer';
  
  return (
    <button 
      className={`${base} ${styles} ${className}`} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
} 