// Sidebar navigation for the procurement prototype
import React, { useState } from 'react';

const navItems = [
  {
    key: 'home',
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
    ),
  },
  {
    key: 'procurement',
    label: 'Procurement',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 2v4M16 2v4M2 10h20" /></svg>
    ),
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3z" /><path d="M8 8h8v8H8V8z" /></svg>
    ),
  },
  {
    key: 'payees',
    label: 'Payees',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="8.5" cy="8.5" r="4.5" /><circle cx="15.5" cy="15.5" r="4.5" /></svg>
    ),
  },
  {
    key: 'administration',
    label: 'Administration',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
    ),
  },
];

/**
 * Sidebar navigation with logo and icons
 * @param {string} active - The active nav item key
 * @param {function} onNavClick - Callback for nav item click
 */
export default function Sidebar({ active = 'home', onNavClick, expanded, setExpanded }) {
  return (
    <aside className={`sidebar fixed left-0 top-0 h-screen ${expanded ? 'w-48' : 'w-16'} transition-all duration-200 flex flex-col items-center py-4 space-y-6 text-white bg-[#2c3e50] justify-between`}>
      <div className="flex flex-col items-center w-full">
        {/* Hamburger menu and logo */}
        <div className="flex items-center w-full px-2 mb-4">
          <button
            className="mr-2 p-2 focus:outline-none"
            onClick={() => setExpanded(e => !e)}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {/* Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          {expanded && <div className="text-2xl font-bold ml-1">tipalti</div>}
        </div>
        <nav className="flex flex-col items-center space-y-2 flex-grow mt-4 w-full">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`flex items-center w-full p-3 rounded-lg nav-item relative group transition-colors duration-150 ${active === item.key ? 'bg-[#34495e]' : ''}`}
              onClick={() => onNavClick && onNavClick(item.key)}
              aria-label={item.label}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {expanded && (
                <span className="ml-3 text-base font-medium whitespace-nowrap">{item.label}</span>
              )}
              {/* Tooltip for collapsed state */}
              {!expanded && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
} 