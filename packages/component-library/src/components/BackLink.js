// BackLink for navigation
import React from 'react';

/**
 * BackLink for navigation
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Link text
 */
export default function BackLink({ onClick, children }) {
  return (
    <button onClick={onClick} className="flex items-center text-sm text-gray-600 font-semibold mb-4 hover:underline">
      <span className="mr-2">&#8592;</span>
      {children}
    </button>
  );
} 