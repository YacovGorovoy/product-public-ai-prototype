// DeleteIcon component for deleting rows/items
import React from 'react';

/**
 * DeleteIcon component for deleting rows/items
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 * @param {string} size - Icon size ('sm', 'md', 'lg')
 * @param {string} color - Icon color
 */
export default function DeleteIcon({ 
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
      title="Delete item"
    >
      <svg 
        className={`${sizeClasses[size]} text-${color}`} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}

// Example usage:
// <DeleteIcon onClick={() => handleDelete()} size="md" /> 