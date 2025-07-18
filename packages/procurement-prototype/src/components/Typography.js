// Typography.js copied from component-library
import React from 'react';

/**
 * Typography component for consistent text styles
 * @param {string} variant - h1, h2, h3, label, p
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children
 */
export default function Typography({ variant = 'p', className = '', children }) {
  switch (variant) {
    case 'h1':
      return <h1 className={`text-3xl font-bold text-gray-900 ${className}`}>{children}</h1>;
    case 'h2':
      return <h2 className={`text-2xl font-bold text-gray-900 ${className}`}>{children}</h2>;
    case 'h3':
      return <h3 className={`text-xl font-semibold text-gray-800 ${className}`}>{children}</h3>;
    case 'label':
      return <span className={`text-xs font-medium uppercase tracking-wide text-gray-500 ${className}`}>{children}</span>;
    default:
      return <p className={`text-base text-gray-700 ${className}`}>{children}</p>;
  }
} 