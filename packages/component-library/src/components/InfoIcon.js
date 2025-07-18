// InfoIcon for displaying tooltips and extra information
import React, { useState } from 'react';

/**
 * InfoIcon for tooltips and information
 * @param {string} tooltip - Tooltip text to display
 * @param {string} className - Additional classes
 * @param {string} size - Icon size ('sm', 'md', 'lg')
 * @param {string} color - Icon color (Tailwind text color)
 */
export default function InfoIcon({ tooltip, className = '', size = 'md', color = 'text-gray-500', ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };
  
  return (
    <div className="relative inline-block">
      <button
        className={`inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${sizeClasses[size]} ${color} ${className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        {...props}
      >
        <span className="text-xs font-bold">i</span>
      </button>
      
      {showTooltip && tooltip && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
} 