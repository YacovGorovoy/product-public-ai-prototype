// Search input with icon
import React from 'react';

/**
 * SearchInput with icon
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 */
export default function SearchInput({ value, onChange, placeholder = 'Search items by name' }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input pl-10 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200"
      />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    </div>
  );
} 