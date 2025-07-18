// LineItemRow for a single line in the items table
import React from 'react';
import RemoveButton from './RemoveButton';

const recurrenceOptions = [
  { value: 'one-time', label: 'One-time' },
  { value: 'monthly', label: 'Monthly' },
];
const recurrenceEndOptions = [
  { value: 'never', label: 'Never' },
  { value: '6', label: 'After 6 months' },
  { value: '12', label: 'After 12 months' },
  { value: '24', label: 'After 24 months' },
  { value: 'custom', label: 'Custom' },
];

/**
 * LineItemRow for a single line in the items table
 * @param {object} item - Line item data
 * @param {function} onChange - (field, value) => void
 * @param {function} onRemove - Remove handler
 * @param {boolean} showQuantity
 * @param {boolean} showRecurrence
 * @param {string} variant - 'editable' or 'inline' (default: 'editable')
 * @param {boolean} readOnly - Read-only state (for inline variant)
 */
export default function LineItemRow({ item, onChange, onRemove, showQuantity, showRecurrence, variant = 'editable', readOnly = false }) {
  const subtotal = (parseFloat(item.amount) || 0) * (showQuantity ? (parseInt(item.quantity) || 1) : 1);
  const inputClasses = variant === 'inline' && readOnly
    ? "form-input w-20 h-9 border border-l-0 border-gray-200 rounded-none text-[15px] bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
    : "form-input w-20 h-9 border border-l-0 border-gray-200 rounded-none text-[15px] focus:ring-0 focus:border-gray-400";

  const selectClasses = variant === 'inline' && readOnly
    ? "form-select w-16 h-9 border border-gray-200 rounded-none text-[15px] bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
    : "form-select w-16 h-9 border border-gray-200 rounded-none text-[15px] focus:ring-0 focus:border-gray-400";

  const textInputClasses = variant === 'inline' && readOnly
    ? "form-input flex-1 h-9 ml-2 border border-gray-200 rounded-none text-[15px] bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
    : "form-input flex-1 h-9 ml-2 border border-gray-200 rounded-none text-[15px] focus:ring-0 focus:border-gray-400";

  return (
    <div className="flex items-center mb-1 min-h-[38px] text-[15px]">
      {variant === 'editable' && <RemoveButton onClick={onRemove} />}
      <select
        className={`${selectClasses} ml-1`}
        value={item.currency}
        onChange={e => onChange('currency', e.target.value)}
        disabled={variant === 'inline' && readOnly}
        style={{ minWidth: 56 }}
        aria-label="Currency"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <input
        type="number"
        className={`${inputClasses} ml-1`}
        placeholder="1,500.00"
        min="0"
        value={item.amount}
        onChange={e => onChange('amount', e.target.value)}
        readOnly={variant === 'inline' && readOnly}
        style={{ minWidth: 80 }}
        aria-label="Amount"
      />
      {showQuantity && (
        <input
          type="number"
          className={`form-input w-16 h-9 ml-2 border border-gray-200 rounded-none text-[15px] ${variant === 'inline' && readOnly ? 'bg-gray-50 cursor-pointer hover:bg-gray-100 transition' : 'focus:ring-0 focus:border-gray-400'}`}
          placeholder="1"
          min="1"
          value={item.quantity}
          onChange={e => onChange('quantity', e.target.value)}
          readOnly={variant === 'inline' && readOnly}
          style={{ minWidth: 48 }}
          aria-label="Quantity"
        />
      )}
      <input
        type="text"
        className={`${textInputClasses}`}
        placeholder="Description"
        value={item.desc}
        onChange={e => onChange('desc', e.target.value)}
        readOnly={variant === 'inline' && readOnly}
        style={{ minWidth: 120 }}
        aria-label="Description"
      />
      {showRecurrence && (
        <>
          <select
            className={`form-select w-28 h-9 ml-2 border border-gray-200 rounded-none text-[15px] ${variant === 'inline' && readOnly ? 'bg-gray-50 cursor-pointer hover:bg-gray-100 transition' : 'focus:ring-0 focus:border-gray-400'}`}
            value={item.recurrence || 'one-time'}
            onChange={e => onChange('recurrence', e.target.value)}
            disabled={variant === 'inline' && readOnly}
            style={{ minWidth: 90 }}
            aria-label="How often"
          >
            {recurrenceOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            className={`form-select w-28 h-9 ml-2 border border-gray-200 rounded-none text-[15px] ${variant === 'inline' && readOnly ? 'bg-gray-50 cursor-pointer hover:bg-gray-100 transition' : 'focus:ring-0 focus:border-gray-400'}`}
            value={item.recurrenceEnd || 'never'}
            onChange={e => onChange('recurrenceEnd', e.target.value)}
            disabled={variant === 'inline' && readOnly}
            style={{ minWidth: 90 }}
            aria-label="Recurrence end"
          >
            {recurrenceEndOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {item.recurrenceEnd === 'custom' && (
            <div className="flex items-center ml-2">
              <span className="mr-1 text-gray-700">In</span>
              <input
                type="number"
                className={`form-input w-12 h-9 border border-gray-200 rounded-none text-[15px] ${variant === 'inline' && readOnly ? 'bg-gray-50 cursor-pointer hover:bg-gray-100 transition' : 'focus:ring-0 focus:border-gray-400'}`}
                min="1"
                value={item.recurrenceMonths || 1}
                onChange={e => onChange('recurrenceMonths', e.target.value)}
                readOnly={variant === 'inline' && readOnly}
                style={{ minWidth: 36 }}
                aria-label="Recurrence months"
              />
              <span className="ml-1 text-gray-700">months</span>
            </div>
          )}
        </>
      )}
      <div className="w-28 text-right text-gray-700">USD {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
    </div>
  );
} 