// Badge component for status indicators
import React from 'react';

/**
 * Badge for status indicators
 * @param {string} text - Badge text (deprecated, use children)
 * @param {string} children - Badge content
 * @param {string} color - Color variant (gray, yellow, green, blue, orange) or full Tailwind classes
 * @param {string} className - Additional classes
 */
export default function Badge({ text, children, color = 'gray', className = '' }) {
  const content = children || text;
  
  const getColorClasses = (colorVariant) => {
    switch (colorVariant) {
      case 'gray':
        return 'bg-gray-100 text-gray-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'orange':
        return 'bg-orange-100 text-orange-800';
      default:
        // If it's not a predefined color, assume it's full Tailwind classes
        return colorVariant;
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorClasses(color)} ${className}`}>
      {content}
    </span>
  );
} 