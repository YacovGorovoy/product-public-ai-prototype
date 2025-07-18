// Tabs for switching between 'To submit' and 'To approve'
import React from 'react';

/**
 * Tabs for navigation
 * @param {Array} tabs - [{ label, key, count? }]
 * @param {string} activeTab - The active tab key
 * @param {function} onTabClick - Callback for tab click
 * @param {boolean} showCounts - Whether to show count badges (default: true)
 */
export default function Tabs({ tabs = [], activeTab, onTabClick, showCounts = true }) {
  return (
    <div className="w-full">
      <div className="flex space-x-4 border-b mb-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`relative py-2 px-6 font-semibold text-base transition-colors duration-150 flex items-center
              ${activeTab === tab.key ? 'text-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
            onClick={() => onTabClick && onTabClick(tab.key)}
            aria-selected={activeTab === tab.key}
            role="tab"
            style={{ borderBottom: activeTab === tab.key ? '3px solid #2563eb' : '3px solid transparent' }}
          >
            <span>{tab.label}</span>
            {showCounts && typeof tab.count === 'number' && (
              <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 text-xs font-bold">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 