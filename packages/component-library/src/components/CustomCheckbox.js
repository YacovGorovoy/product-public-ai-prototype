// CustomCheckbox for selection (large, round, yellow fill)
import React from 'react';

/**
 * CustomCheckbox for selection
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Change handler
 * @param {string} className - Additional classes
 */
export default function CustomCheckbox({ checked, onChange, className = '', ...props }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-150 focus:outline-none ${checked ? 'bg-yellow-400 border-yellow-500' : 'bg-white border-gray-300'} ${className}`}
      aria-checked={checked}
      role="checkbox"
      tabIndex={0}
      {...props}
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
} 