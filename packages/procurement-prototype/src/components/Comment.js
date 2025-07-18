// Comment component for displaying individual comments
import React from 'react';
import Tag from './Tag';

/**
 * Comment component for displaying individual comments
 * @param {Object} user - User object with email and optional name
 * @param {string} timestamp - Comment timestamp (e.g., "4 days ago")
 * @param {string} message - Comment message text
 * @param {function} onTagClick - Optional callback for tag clicks
 * @param {string} className - Additional classes
 */
export default function Comment({ 
  user, 
  timestamp, 
  message, 
  onTagClick,
  className = '' 
}) {
  // Parse message to find @mentions and create Tag components
  const parseMessage = (text) => {
    const mentionRegex = /@([^\s]+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      // Add text before the mention
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      // Add the mention as a tag
      parts.push({
        type: 'mention',
        content: match[0],
        email: match[1]
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    return parts;
  };

  const messageParts = parseMessage(message);

  return (
    <div className={`flex space-x-3 ${className}`}>
      {/* Comment bubble icon */}
      <div className="flex-shrink-0">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Comment content */}
      <div className="flex-1 min-w-0">
        {/* User info and timestamp */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-blue-600 truncate">
            {user.email}
          </span>
          <span className="text-xs text-gray-500">
            {timestamp}
          </span>
        </div>

        {/* Message content */}
        <div className="text-sm text-gray-700 leading-relaxed">
          {messageParts.map((part, index) => {
            if (part.type === 'mention') {
              return (
                <Tag
                  key={index}
                  text={part.content}
                  email={part.email}
                  onClick={() => onTagClick && onTagClick(part.email)}
                />
              );
            }
            return <span key={index}>{part.content}</span>;
          })}
        </div>
      </div>
    </div>
  );
} 