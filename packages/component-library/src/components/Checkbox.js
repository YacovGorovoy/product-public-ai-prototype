// Checkbox component for selection
import React from 'react';

/**
 * Checkbox for selection
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Change handler
 * @param {string} className - Additional classes
 */
export default function Checkbox({ checked, onChange, className = '', ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-200 ${className}`}
      {...props}
    />
  );
} 