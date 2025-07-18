// TableHeader for the line items table
import React from 'react';
/**
 * TableHeader for the line items table
 * @param {boolean} showQuantity - Show quantity column
 * @param {boolean} showRecurrence - Show recurrence columns
 */
export default function TableHeader({ showQuantity, showRecurrence }) {
  return (
    <div className="flex items-center mb-1 text-gray-700 font-medium text-[15px]">
      <div className="w-7" />
      <div className="w-36">How much? *</div>
      {showQuantity && <div className="w-20">Quantity *</div>}
      <div className="flex-1">Description *</div>
      {showRecurrence && <div className="w-32">How often? *</div>}
      {showRecurrence && <div className="w-44" />}
      <div className="w-28 text-right">Subtotal</div>
    </div>
  );
} 