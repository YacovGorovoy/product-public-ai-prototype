import React, { useState, useRef } from 'react';
import Badge from './Badge';

/**
 * Search component with grouped dropdown results and highlighting.
 * @param {string} value - The search input value
 * @param {function} onChange - Input change handler
 * @param {object} results - { requests: [...], vendors: [...] }
 * @param {function} onResultClick - Handler for clicking a result (optional)
 * @param {function} onSeeAllClick - Handler for 'See all results' (optional)
 * @param {string} placeholder - Input placeholder
 */
export default function Search({
  value,
  onChange,
  results = { requests: [], vendors: [] },
  onResultClick,
  onSeeAllClick,
  placeholder = 'Search items by name',
}) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef();

  // Highlight search term in text
  function highlight(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark> : part
    );
  }

  // Expand on focus or typing
  function handleFocus() {
    setExpanded(true);
  }
  function handleBlur(e) {
    // Collapse only if focus leaves the whole search area
    setTimeout(() => setExpanded(false), 100);
  }

  return (
    <div className={`relative transition-all duration-200 ${expanded ? 'w-[480px]' : 'w-[320px]'} max-w-full`}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="form-input pl-10 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 w-full"
        autoComplete="off"
      />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      {/* Dropdown */}
      {expanded && value && (results.requests.length > 0 || results.vendors.length > 0) && (
        <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-xl z-30 border border-gray-200 py-2 px-0">
          {/* Requests group */}
          {results.requests.length > 0 && (
            <div>
              {results.requests.map((req, idx) => (
                <button
                  key={req.id || idx}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition text-left"
                  onClick={() => onResultClick && onResultClick(req, 'request')}
                  type="button"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-3">
                    {req.icon || (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="#F3F4F6" /><path d="M8 8h8v2H8V8zm0 4h5v2H8v-2z" fill="#9CA3AF" /></svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base text-gray-900 truncate">{highlight(req.vendor, value)}</span>
                      {req.status && <Badge text={req.status} color="bg-indigo-100 text-indigo-800" />}
                    </div>
                    <div className="text-xs text-gray-600 flex gap-2">
                      <span>{req.amount}</span>
                      <span>{req.date}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {/* Vendors group */}
          {results.vendors.length > 0 && (
            <div className="pt-2">
              <div className="px-4 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendors</div>
              {results.vendors.map((vendor, idx) => (
                <button
                  key={vendor.id || idx}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-50 transition text-left"
                  onClick={() => onResultClick && onResultClick(vendor, 'vendor')}
                  type="button"
                >
                  <span className="font-semibold text-base text-gray-900 truncate">{highlight(vendor.name, value)}</span>
                </button>
              ))}
            </div>
          )}
          {/* See all results */}
          <div className="border-t mt-2 pt-2 px-4">
            <button
              className="w-full text-left text-sm text-blue-700 font-medium hover:underline py-2"
              onClick={() => onSeeAllClick && onSeeAllClick(value)}
              type="button"
            >
              See all results for '{value}' →
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 