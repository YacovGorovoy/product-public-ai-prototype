// FormInput for text fields
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

/**
 * FormInput for text fields
 * @param {string} label - Label text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} variant - 'editable' or 'inline' (default: 'editable')
 * @param {boolean} readOnly - Read-only state (for inline variant)
 * @param {function} onSave - Save handler (for inline variant)
 * @param {function} onCancel - Cancel handler (for inline variant)
 * @param {string} className - Additional classes
 */
export default function FormInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required, 
  variant = 'editable',
  readOnly = false,
  onSave,
  onCancel,
  className = '', 
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  // Update edit value when prop value changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Handle click outside to save
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (isEditing) {
          handleSave();
        }
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editValue]);

  const handleFieldClick = () => {
    if (variant === 'inline' && readOnly && !isEditing) {
      setIsEditing(true);
      setEditValue(value);
      // Focus the input after a brief delay to ensure state is updated
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleSave = () => {
    if (editValue !== value) {
      onChange && onChange(editValue);
      onSave && onSave(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel && onCancel();
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Determine input classes based on state
  const getInputClasses = () => {
    // If className is provided and contains styling overrides, use it
    if (className && (className.includes('!border') || className.includes('!bg'))) {
      return `w-full border rounded-xl px-4 py-3 transition ${className}`;
    }
    
    if (variant === 'inline') {
      if (readOnly && !isEditing) {
        return "w-full border !border-gray-300 rounded-xl px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition";
      } else if (isEditing) {
        return "w-full border !border-[#6C70FF] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#B4B8FF] transition";
      }
    }
    

    
    return "w-full border !border-gray-300 rounded-xl px-4 py-3 bg-white focus:!border-[#6C70FF] focus:outline-none focus:ring-2 focus:ring-[#B4B8FF] hover:bg-gray-50 transition";
  };

  const renderInlineInput = () => {
    return (
      <div 
        className={`relative ${isHovered && readOnly && !isEditing ? 'group' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={inputRef}
      >
        <input
          type="text"
          value={isEditing ? editValue : value}
          onChange={isEditing ? handleInputChange : undefined}
          onKeyDown={isEditing ? handleKeyDown : undefined}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly && !isEditing}
          onClick={handleFieldClick}
          className={getInputClasses()}
          {...props}
        />
        
        {/* Pencil icon on hover (read-only state) */}
        {variant === 'inline' && isHovered && readOnly && !isEditing && (
          <button
            onClick={handleFieldClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}

        {/* X and V buttons (editing state) */}
        {variant === 'inline' && isEditing && (
          <div className="absolute -bottom-10 right-0 flex space-x-2">
            <button
              onClick={handleCancel}
              className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={handleSave}
              className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderEditableInput = () => {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={getInputClasses()}
        {...props}
      />
    );
  };

  return (
    <div className={className}>
      {label && <label className="block mb-1 font-medium text-gray-600">{label}{required && ' *'}</label>}
      {variant === 'inline' ? renderInlineInput() : renderEditableInput()}
    </div>
  );
} 