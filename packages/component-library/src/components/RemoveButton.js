// RemoveButton for deleting a line item
import React from 'react';
/**
 * RemoveButton for deleting a line item
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 */
export default function RemoveButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 p-0 m-0 focus:outline-none focus:ring-2 focus:ring-red-300 rounded ${className}`}
      aria-label="Remove line"
    >
      <span className="material-icons text-[18px]">delete</span>
    </button>
  );
} 