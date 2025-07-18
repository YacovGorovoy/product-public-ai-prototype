// AddLineButton for adding a new line item
import React from 'react';
/**
 * AddLineButton for adding a new line item
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 */
export default function AddLineButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-7 h-7 flex items-center justify-center text-blue-600 hover:bg-blue-50 font-bold text-xl p-0 m-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      aria-label="Add line"
    >
      <span className="material-icons text-[20px]">add</span>
    </button>
  );
} 