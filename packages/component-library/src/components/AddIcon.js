// AddIcon component for adding new rows/items
import React from 'react';

/**
 * AddIcon component for adding new rows/items
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 * @param {string} size - Icon size ('sm', 'md', 'lg')
 * @param {string} color - Icon color
 */
export default function AddIcon({ 
  onClick, 
  className = '', 
  size = 'md',
  color = 'gray-600'
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={onClick}
      className={`p-1 hover:bg-gray-100 rounded transition-colors ${className}`}
      title="Add new item"
    >
      <svg 
        className={`${sizeClasses[size]} text-${color}`} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}

// Example usage:
// <AddIcon onClick={() => handleAdd()} size="md" /> 