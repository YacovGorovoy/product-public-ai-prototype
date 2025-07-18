// Tag component for @mentions within text
import React from 'react';

/**
 * Tag component for @mentions within text
 * @param {string} text - The tag text (e.g., "@user@email.com")
 * @param {string} email - The email address being tagged
 * @param {function} onClick - Optional click handler for the tag
 * @param {string} className - Additional classes
 */
export default function Tag({ 
  text, 
  email, 
  onClick,
  className = '' 
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(email);
    }
  };

  return (
    <span
      className={`inline text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors ${className}`}
      onClick={handleClick}
      title={onClick ? `Click to view ${email}` : undefined}
    >
      {text}
    </span>
  );
} 