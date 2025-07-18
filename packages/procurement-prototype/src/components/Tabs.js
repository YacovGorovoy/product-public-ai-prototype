// Generic tabs component for navigation
import React from 'react';

/**
 * Generic tabs component
 * @param {Array} tabs - Array of tab objects with { label, key, count }
 * @param {string} activeTab - The active tab key
 * @param {function} onTabClick - Callback for tab click
 */
export default function Tabs({ tabs = [], activeTab, onTabClick }) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`py-3 px-4 font-medium border-b-2 transition-colors duration-150 ${
            activeTab === tab.key 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
          onClick={() => onTabClick && onTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 