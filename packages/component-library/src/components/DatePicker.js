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
    if (inputVariant === 'inline' && !isActive) {
      setIsActive(true);
      onClick && onClick();
      setIsOpen(true);
    } else if (inputVariant === 'editable') {
      setIsOpen(!isOpen);
    }
  };

  const handleInputFieldClick = () => {
    // Always open the picker when the input field is clicked
    setIsOpen(!isOpen);
  };

  const handleInputBlur = () => {
    if (inputVariant === 'inline') {
      setIsActive(false);
      onBlur && onBlur();
    }
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
    // Determine the appropriate className based on state
    let inputClassName = `cursor-pointer ${inputVariant === 'inline' ? 'hover:bg-gray-50' : ''}`;
    
    // Override styling for active inline editing (DatePicker specific)
    if (inputVariant === 'inline' && isActive) {
      inputClassName = "cursor-pointer !border-[#6C70FF] !bg-white focus:outline-none focus:ring-2 focus:ring-[#B4B8FF]";
    }
    
    const inputProps = {
      label,
      value: formatDisplayDate(),
      onClick: inputVariant === 'inline' ? handleInputClick : handleInputFieldClick,
      onBlur: handleInputBlur,
      placeholder,
      required,
      readOnly: inputVariant === 'inline' && (readOnly || !isActive),
      className: inputClassName,
      variant: inputVariant
    };

    if (inputVariant === 'inline') {
      return (
        <div 
          className={`relative ${isHovered && !isActive && !readOnly ? 'group' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FormInput {...inputProps} />
          {/* Show pencil icon on hover (read-only state) */}
          {isHovered && !isActive && !readOnly && (
            <button
              onClick={handleInputClick}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {/* Show calendar icon when active */}
          {isActive && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <FormInput {...inputProps} />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {renderInput()}

      {/* Calendar pop-over */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2">
              <select
                value={currentMonth.getMonth()}
                onChange={(e) => {
                  const newMonth = new Date(currentMonth);
                  newMonth.setMonth(parseInt(e.target.value));
                  setCurrentMonth(newMonth);
                }}
                className="text-sm font-medium border-none bg-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                  </option>
                ))}
              </select>
              
              <select
                value={currentMonth.getFullYear()}
                onChange={(e) => {
                  const newMonth = new Date(currentMonth);
                  newMonth.setFullYear(parseInt(e.target.value));
                  setCurrentMonth(newMonth);
                }}
                className="text-sm font-medium border-none bg-transparent"
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Selection tabs (only for range variant) */}
          {variant === 'range' && (
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-2 text-sm font-medium ${
                  activeTab === 'range' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('range')}
              >
                Range
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium ${
                  activeTab === 'before' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('before')}
              >
                Before
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium ${
                  activeTab === 'after' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('after')}
              >
                After
              </button>
            </div>
          )}

          {/* Calendar grid */}
          <div className="p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Today: {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <button
              onClick={clearSelection}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 