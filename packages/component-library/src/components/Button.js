// Button component for actions (primary/secondary)
import React from 'react';

/**
 * Button for actions
 * @param {string} variant - 'primary' or 'secondary'
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children - Button content
 */
export default function Button({ variant = 'primary', onClick, className = '', children, ...props }) {
  const base = 'font-semibold focus:outline-none transition';
  let styles = '';
  if (variant === 'primary') {
    styles = 'rounded-lg px-6 py-2 bg-yellow-400 text-gray-800 hover:bg-yellow-500';
  } else if (variant === 'secondary') {
    styles = 'rounded-lg px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50';
  } else if (variant === 'icon') {
    styles = 'rounded-full w-12 h-12 flex items-center justify-center bg-yellow-400 text-gray-800 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-200 disabled:text-gray-400 p-0';
  }
  return (
    <button className={`${base} ${styles} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

// Demo for icon button variant
// <Button variant="icon"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg></Button> 