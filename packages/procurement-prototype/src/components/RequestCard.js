import React, { useState } from 'react';
import Button from './Button';
import CustomCheckbox from './CustomCheckbox';
import Badge from './Badge';
import RequestIcon from './RequestIcon';

/**
 * RequestCard component for displaying procurement requests
 * Matches the design shown in the screenshot
 */
export default function RequestCard({
  vendor,
  isNewVendor = false,
  title,
  date,
  requester,
  amount,
  status, // This will be the button text (OPEN, APPROVE)
  onStatusClick,
  selected = false,
  onSelect,
  badge,
  badgeColor = 'green',
  onCardClick,
  className = '',
}) {
  const [hovered, setHovered] = useState(false);

  // Format amount to ensure it has proper decimal places and currency
  const formatAmount = (amount) => {
    if (!amount) return 'USD 0.00';
    
    // If amount already contains currency and decimals, return as is
    if (amount.includes('USD') && amount.includes('.')) {
      return amount;
    }
    
    // Extract numeric value and format it
    const numericValue = parseFloat(amount.replace(/[^\d.]/g, ''));
    return `USD ${numericValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div
      className={`relative p-6 rounded-xl border-2 transition-all duration-150 cursor-pointer w-full
        ${selected ? 'border-blue-700 bg-white shadow-lg z-10' : hovered ? 'border-blue-200 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white'}
        ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
    >
      <div className="flex items-center min-w-0 w-full">
        {/* Checkbox */}
        <div className="flex items-center justify-center w-8 h-8 request-checkbox mr-4" onClick={e => e.stopPropagation()}>
          <CustomCheckbox 
            checked={selected} 
            onChange={onSelect}
          />
          {selected && (
            <span className="absolute -left-6 flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
          )}
        </div>
        {/* Icon */}
        <div className="flex flex-col items-center min-w-[56px] mr-6">
          <RequestIcon />
        </div>
        {/* Main grid content */}
        <div className="grid grid-cols-[minmax(0,320px)_140px_160px_1fr] gap-x-32 items-center flex-1 min-w-0 w-full">
          {/* Vendor and Title */}
          <div className="min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-lg text-gray-900 truncate max-w-[200px]">{vendor}</h3>
              {isNewVendor && (
                <Badge 
                  text="New vendor" 
                  color="bg-green-100 text-green-800" 
                />
              )}
              {badge && !isNewVendor && (
                <Badge 
                  text={badge} 
                  color={`bg-${badgeColor}-100 text-${badgeColor}-800`} 
                />
              )}
            </div>
            <p className="text-sm text-gray-800 truncate font-medium max-w-[260px]">{title}</p>
          </div>
          {/* Date */}
          <div className="flex flex-col items-end min-w-0">
            <span className="text-xs text-gray-500 font-medium mb-0.5 truncate">
              {status === 'OPEN' ? 'Created' : 'Requested'}
            </span>
            <span className="text-sm text-gray-700 font-medium truncate">{date}</span>
          </div>
          {/* Amount and Requester */}
          <div className="flex flex-col items-end min-w-0">
            <span className="font-bold text-lg text-gray-900 mb-1 truncate">{formatAmount(amount)}</span>
            <span className="text-xs text-gray-500 font-medium truncate">Requested by {requester}</span>
          </div>
          {/* Action Button */}
          <div className="flex items-center min-w-0 justify-end text-right">
            <Button
              variant="secondary"
              className="w-32 px-6 py-2 rounded-lg border-2 border-gray-400 text-gray-900 bg-white hover:bg-gray-100"
              onClick={e => {
                e.stopPropagation();
                onStatusClick();
              }}
            >
              {status}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 