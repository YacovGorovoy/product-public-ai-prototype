// CommentsSection component for displaying and adding comments
import React, { useState } from 'react';
import Comment from './Comment';
import FormTextarea from './FormTextarea';
import Button from './Button';

/**
 * CommentsSection component for displaying and adding comments
 * @param {Array} comments - Array of comment objects with user, timestamp, message properties
 * @param {function} onAddComment - Callback for adding new comment
 * @param {string} className - Additional classes
 * @param {number} maxLength - Maximum character length for comments (default: 400)
 * @param {Array} mentionableUsers - Array of users that can be mentioned (@username)
 * @param {string} width - Width of the comments section ('sm', 'md', 'lg', 'xl' or custom CSS class)
 */
export default function CommentsSection({ 
  comments = [], 
  onAddComment, 
  className = '', 
  maxLength = 400,
  mentionableUsers = [],
  width = 'md'
}) {
  const [newComment, setNewComment] = useState('');
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleCommentChange = (value) => {
    setNewComment(value);
    
    // Check for @ symbol to show mention suggestions
    const lastAtSymbol = value.lastIndexOf('@');
    if (lastAtSymbol !== -1 && lastAtSymbol < value.length - 1) {
      const query = value.substring(lastAtSymbol + 1, value.length);
      setMentionQuery(query);
      setShowMentionSuggestions(true);
    } else {
      setShowMentionSuggestions(false);
    }
  };

  const handleMentionSelect = (user) => {
    const beforeMention = newComment.substring(0, newComment.lastIndexOf('@'));
    const afterMention = newComment.substring(newComment.lastIndexOf('@') + mentionQuery.length + 1);
    const updatedComment = `${beforeMention}@${user.email} ${afterMention}`;
    setNewComment(updatedComment);
    setShowMentionSuggestions(false);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim());
      setNewComment('');
      setShowMentionSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmitComment();
    }
  };

  const filteredUsers = mentionableUsers.filter(user => 
    user.email.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const getWidthClass = () => {
    switch (width) {
      case 'sm':
        return 'w-80';
      case 'lg':
        return 'w-[500px]';
      case 'xl':
        return 'w-[600px]';
      case 'md':
      default:
        return 'w-96';
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white border-l border-gray-200 ${getWidthClass()} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700" aria-label="Help">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700" aria-label="Download">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700" aria-label="User profile">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="flex space-x-2 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-center">Get your work done faster with 'Comments'</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <Comment
              key={index}
              user={comment.user}
              timestamp={comment.timestamp}
              message={comment.message}
            />
          ))
        )}
      </div>

      {/* Comment Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <FormTextarea
            value={newComment}
            onChange={(e) => handleCommentChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a comment; @ to mention"
            className="pr-12"
            maxLength={maxLength}
          />
          
          {/* Character count */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {newComment.length}/{maxLength}
          </div>
          
          {/* Send button */}
          <Button
            variant="icon"
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="absolute top-2 right-2 w-8 h-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>

        {/* Mention suggestions */}
        {showMentionSuggestions && filteredUsers.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
            {filteredUsers.map((user, index) => (
              <button
                key={index}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                onClick={() => handleMentionSelect(user)}
              >
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700">{user.email}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 