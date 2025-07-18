// Badge for status labels (e.g., 'New vendor')
import React from 'react';

/**
 * Badge for status labels
 * @param {string} text - Badge text
 * @param {string} color - Tailwind bg/text color (default: green)
 * @param {string} className - Additional classes
 */
export default function Badge({ text, color = 'bg-green-100 text-green-800', className = '' }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${color} ${className}`}>
      {text}
    </span>
  );
} 