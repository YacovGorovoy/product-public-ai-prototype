// Card for displaying a procurement request
import React, { useState } from 'react';
import Button from './Button';
import CustomCheckbox from './CustomCheckbox';
import Badge from './Badge';
import RequestIcon from './RequestIcon';

/**
 * RequestCard for displaying a procurement request
 * @param {string} company - Company name
 * @param {string} desc - Description
 * @param {string} date - Date string
 * @param {string} requester - Requester name
 * @param {string} amount - Amount string
 * @param {string} status - Status label (OPEN/APPROVE)
 * @param {string} statusColor - Tailwind color for status
 * @param {function} onStatusClick - Click handler for status button
 * @param {boolean} selected - Whether the card is selected
 * @param {function} onSelect - Handler for selection
 * @param {string} badge - Optional badge text
 * @param {string} className - Additional classes
 */
export default function RequestCard({
  vendor,
  isNewVendor = false,
  title,
  date,
  requester,
  amount,
  status,
  statusColor = 'blue',
  onStatusClick,
  selected = false,
  onSelect,
  badge,
  badgeColor = 'green',
  className = '',
  blueTint = false,
  icon = <RequestIcon />,
  gridCols = 'grid-cols-[minmax(120px,1fr)_minmax(120px,1fr)_auto]',
  onCardClick,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative p-6 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer border-2
        ${selected ? 'border-blue-700 bg-white shadow-lg z-10' : hovered ? 'border-blue-200 bg-blue-50 shadow-sm' : blueTint ? 'border-transparent bg-blue-50' : 'border-gray-200 bg-white'}
        ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-selected={selected}
      tabIndex={0}
      onClick={e => {
        // Prevent card click when clicking the checkbox
        if (e.target.closest('.request-checkbox')) return;
        if (onCardClick) onCardClick();
      }}
    >
      {/* Checkbox, icon */}
      <div className="flex items-center space-x-4 min-w-0">
        <div className="flex items-center justify-center w-8 h-8 request-checkbox">
          <CustomCheckbox checked={selected} onChange={onSelect} />
          {selected && (
            <span className="absolute -left-6 flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
          )}
        </div>
        <div className="flex flex-col items-center min-w-[56px]">
          {icon}
        </div>
        <div className="min-w-0 ml-2 flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg text-gray-900 truncate">{vendor}</span>
            {isNewVendor && <Badge text="New vendor" color="bg-green-100 text-green-800" />}
          </div>
          <span className="text-sm text-gray-800 truncate font-medium">{title}</span>
        </div>
      </div>
      {/* Meta info, amount, status button in grid */}
      <div className={`flex-1 grid ${gridCols} gap-x-8 items-center min-w-0 ml-6`}>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 font-medium mb-0.5">{status === 'OPEN' ? 'Created' : 'Requested'}</span>
          <span className="text-sm text-gray-700 font-medium">{date}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-bold text-lg">{amount}</span>
          <span className="text-xs text-gray-500 font-medium">Requested by {requester}</span>
        </div>
        <Button
          variant="secondary"
          className="px-6 py-2 rounded-lg border-2 border-gray-400 text-gray-900 bg-white hover:bg-gray-100"
          onClick={onStatusClick}
        >
          {status}
        </Button>
      </div>
    </div>
  );
} 