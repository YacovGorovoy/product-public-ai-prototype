import React, { useState, useRef } from 'react';

/**
 * Filter component: can be a button or dropdown, supports single/multi selection.
 * @param {string} label - Button label
 * @param {Array} options - [{ label, value }]
 * @param {boolean} multiple - If true, allows multiple selection
 * @param {function} onChange - Called with (selected, active)
 * @param {string[]} value - Selected value(s) (for multiple)
 * @param {string} value - Selected value (for single)
 * @param {boolean} dropdown - If true, renders as dropdown; else as button
 * @param {boolean} active - If true, filter is active
 */
export default function Filter({
  label = 'Filter',
  options = [],
  multiple = false,
  onChange,
  value,
  dropdown = false,
  active = false,
  counter,
}) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(multiple ? (value || []) : (value || ''));
  const ref = useRef();

  // Handle click outside to close dropdown
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Handle selection
  function handleSelect(val) {
    if (multiple) {
      let newValue = internalValue.includes(val)
        ? internalValue.filter(v => v !== val)
        : [...internalValue, val];
      setInternalValue(newValue);
      onChange && onChange(newValue, newValue.length > 0);
    } else {
      setInternalValue(val);
      setOpen(false);
      onChange && onChange(val, !!val);
    }
  }

  // Button mode
  if (!dropdown) {
    return (
      <button
        className={`px-4 py-2 rounded border font-semibold transition-colors duration-150 ${active ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        onClick={() => onChange && onChange(!active, !active)}
        type="button"
      >
        {label}
        {typeof counter === 'number' && counter > 0 && (
          <span className="ml-2 bg-blue-700 text-white rounded-full px-2 text-xs font-bold">{counter}</span>
        )}
      </button>
    );
  }

  // Dropdown mode
  let displayLabel = label;
  if (!multiple && value) {
    const selected = options.find(opt => opt.value === value);
    if (selected) displayLabel = `${label}: ${selected.label}`;
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className={`px-4 py-2 rounded border font-semibold transition-colors duration-150 flex items-center gap-2 ${open || active ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {displayLabel}
        {multiple && Array.isArray(internalValue) && internalValue.length > 0 && (
          <span className="ml-2 bg-blue-700 text-white rounded-full px-2 text-xs font-bold">{internalValue.length}</span>
        )}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-30 border border-gray-200 py-2">
          {options.map(opt => (
            <button
              key={opt.value}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 ${multiple && internalValue.includes(opt.value) ? 'bg-blue-100 text-blue-700' : ''} ${!multiple && internalValue === opt.value ? 'bg-blue-100 text-blue-700' : ''}`}
              onClick={() => handleSelect(opt.value)}
              type="button"
            >
              {opt.label}
              {multiple && internalValue.includes(opt.value) && (
                <span className="ml-auto text-xs">✓</span>
              )}
              {!multiple && internalValue === opt.value && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 