// FormSelect for dropdowns
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

/**
 * FormSelect for dropdowns
 * @param {string} label - Label text
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {array} options - Array of {label, value} objects
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} variant - 'editable' or 'inline' (default: 'editable')
 * @param {boolean} readOnly - Read-only state (for inline variant)
 * @param {function} onSave - Save handler (for inline variant)
 * @param {function} onCancel - Cancel handler (for inline variant)
 * @param {string} className - Additional classes
 */
export default function FormSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  variant = 'editable',
  readOnly = false,
  onSave,
  onCancel,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const selectRef = useRef(null);

  // Update edit value when prop value changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Handle click outside to save
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        if (isEditing) {
          handleSave();
        }
        setIsOpen(false);
      }
    };

    if (isOpen || isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isEditing, editValue]);

  const handleFieldClick = () => {
    if (variant === 'inline' && readOnly && !isEditing) {
      setIsEditing(true);
      setEditValue(value);
      // Auto-open dropdown when entering edit mode
      setIsOpen(true);
    } else if (variant === 'editable' || (variant === 'inline' && isEditing)) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue) => {
    if (variant === 'inline' && isEditing) {
      setEditValue(optionValue);
      // Auto-save when option is selected in inline editing mode
      if (optionValue !== value) {
        onChange && onChange(optionValue);
        onSave && onSave(optionValue);
      }
      setIsEditing(false);
    } else {
      onChange && onChange(optionValue);
    }
    setIsOpen(false);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getSelectedLabel = () => {
    const option = options.find(opt => opt.value === (isEditing ? editValue : value));
    return option ? option.label : '';
  };

  // Determine select classes based on state
  const getSelectClasses = () => {
    if (variant === 'inline') {
      if (readOnly && !isEditing) {
        return "w-full border !border-gray-300 rounded-xl px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition text-left";
      } else if (isEditing) {
        return "w-full border !border-[#6C70FF] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#B4B8FF] transition text-left";
      }
    }
    return "w-full border !border-gray-300 rounded-xl px-4 py-3 bg-white focus:!border-[#6C70FF] focus:outline-none focus:ring-2 focus:ring-[#B4B8FF] hover:bg-gray-50 transition text-left";
  };

  const renderInlineSelect = () => {
    return (
      <div 
        className={`relative ${isHovered && readOnly && !isEditing ? 'group' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={selectRef}
      >
        <div
          className={getSelectClasses()}
          onClick={handleFieldClick}
          onKeyDown={isEditing ? handleKeyDown : undefined}
          tabIndex={isEditing ? 0 : -1}
        >
          <span className={getSelectedLabel() ? 'text-gray-900' : 'text-gray-500'}>
            {getSelectedLabel() || placeholder}
          </span>
          {/* Only show chevron when editing or in editable mode */}
          {(isEditing || variant === 'editable') && (
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
        
        {/* Pencil icon on hover (read-only state) */}
        {variant === 'inline' && isHovered && readOnly && !isEditing && (
          <button
            onClick={handleFieldClick}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
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

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  option.value === (isEditing ? editValue : value) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderEditableSelect = () => {
    return (
      <div className="relative" ref={selectRef}>
        <div
          className={getSelectClasses()}
          onClick={handleFieldClick}
        >
          <span className={getSelectedLabel() ? 'text-gray-900' : 'text-gray-500'}>
            {getSelectedLabel() || placeholder}
          </span>
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      {label && <label className="block mb-1 font-medium text-gray-600">{label}{required && ' *'}</label>}
      {variant === 'inline' ? renderInlineSelect() : renderEditableSelect()}
    </div>
  );
} 