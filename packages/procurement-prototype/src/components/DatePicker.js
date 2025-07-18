// DatePicker component for date selection
import React, { useState, useEffect, useRef } from 'react';
import FormInput from './FormInput';
import Button from './Button';

/**
 * DatePicker component for date selection
 * @param {string} variant - 'single' or 'range' (default: 'single')
 * @param {Date} value - Single date value (for single variant)
 * @param {Date} startDate - Start date (for range variant)
 * @param {Date} endDate - End date (for range variant)
 * @param {function} onChange - Callback when date changes
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} inputVariant - 'editable' or 'inline' (default: 'editable')
 * @param {boolean} readOnly - Read-only state (for inline variant)
 * @param {function} onClick - Click handler (for inline variant)
 * @param {function} onBlur - Blur handler (for inline variant)
 * @param {string} className - Additional classes
 */
export default function DatePicker({
  variant = 'single',
  value,
  startDate,
  endDate,
  onChange,
  label,
  placeholder = "Select date",
  required = false,
  inputVariant = 'editable',
  readOnly = false,
  onClick,
  onBlur,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState('range');
  const pickerRef = useRef(null);

  useEffect(() => {
    if (variant === 'single') {
      setSelectedDate(value);
    } else {
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
    }
  }, [value, startDate, endDate, variant]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
        if (inputVariant === 'inline') {
          setIsActive(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, inputVariant]);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDisplayDate = () => {
    if (variant === 'single') {
      return formatDate(selectedDate);
    } else {
      if (selectedStartDate && selectedEndDate) {
        return `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`;
      } else if (selectedStartDate) {
        return `${formatDate(selectedStartDate)} - `;
      }
      return '';
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (variant === 'single') {
      setSelectedDate(clickedDate);
      onChange && onChange(clickedDate);
      setIsOpen(false);
    } else {
      if (activeTab === 'range') {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
          // Start new selection
          setSelectedStartDate(clickedDate);
          setSelectedEndDate(null);
        } else {
          // Complete selection
          if (clickedDate >= selectedStartDate) {
            setSelectedEndDate(clickedDate);
          } else {
            setSelectedEndDate(selectedStartDate);
            setSelectedStartDate(clickedDate);
          }
          // Close pop-over when range is complete
          onChange && onChange(selectedStartDate, clickedDate >= selectedStartDate ? clickedDate : selectedStartDate);
          setIsOpen(false);
        }
      } else if (activeTab === 'before') {
        setSelectedStartDate(null);
        setSelectedEndDate(clickedDate);
        onChange && onChange(null, clickedDate);
        setIsOpen(false);
      } else if (activeTab === 'after') {
        setSelectedStartDate(clickedDate);
        setSelectedEndDate(null);
        onChange && onChange(clickedDate, null);
        setIsOpen(false);
      }
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = variant === 'single' 
        ? isSameDay(date, selectedDate)
        : isSameDay(date, selectedStartDate) || isSameDay(date, selectedEndDate);
      const isInSelectedRange = variant === 'range' && isInRange(date);
      const isToday = isSameDay(date, new Date());

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isInSelectedRange
              ? 'bg-blue-100 text-blue-800'
              : isToday
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handleInputClick = () => {
    if (inputVariant === 'inline' && readOnly) {
      setIsActive(true);
      setIsOpen(true);
    } else if (inputVariant === 'editable') {
      setIsOpen(!isOpen);
    }
  };

  const handleInputFieldClick = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    if (inputVariant === 'inline') {
      setIsActive(false);
    }
    onBlur && onBlur();
  };

  const clearSelection = () => {
    if (variant === 'single') {
      setSelectedDate(null);
      onChange && onChange(null);
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      onChange && onChange(null, null);
    }
  };

  const renderInput = () => {
    if (inputVariant === 'inline') {
      return (
        <div
          className={`relative ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FormInput
            label={label}
            value={formatDisplayDate()}
            placeholder={placeholder}
            required={required}
            readOnly={true}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            className={`${isActive ? 'ring-2 ring-blue-500 border-blue-500' : ''} ${readOnly ? 'cursor-pointer' : ''}`}
          />
          {(isHovered || isActive) && readOnly && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {isActive && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsActive(false);
                }}
                className="text-green-600 hover:text-green-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <FormInput
        label={label}
        value={formatDisplayDate()}
        placeholder={placeholder}
        required={required}
        readOnly={true}
        onClick={handleInputFieldClick}
        className={className}
      />
    );
  };

  return (
    <div className="relative" ref={pickerRef}>
      {renderInput()}
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]">
          {variant === 'range' && (
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('range')}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    activeTab === 'range' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Range
                </button>
                <button
                  onClick={() => setActiveTab('before')}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    activeTab === 'before' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setActiveTab('after')}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    activeTab === 'after' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  After
                </button>
              </div>
            </div>
          )}
          
          <div className="p-4">
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
                </span>
                <span className="text-sm text-gray-500">
                  {currentMonth.getFullYear()}
                </span>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <button
                onClick={clearSelection}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 