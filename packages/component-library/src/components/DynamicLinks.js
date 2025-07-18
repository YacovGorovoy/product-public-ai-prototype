// DynamicLinks for add/remove quantity/recurrence
import React from 'react';
/**
 * DynamicLinks for add/remove quantity/recurrence
 * @param {boolean} showQuantity
 * @param {boolean} showRecurrence
 * @param {function} onAddQuantity
 * @param {function} onRemoveQuantity
 * @param {function} onAddRecurrence
 * @param {function} onRemoveRecurrence
 */
export default function DynamicLinks({ showQuantity, showRecurrence, onAddQuantity, onRemoveQuantity, onAddRecurrence, onRemoveRecurrence }) {
  return (
    <div className="mt-1 text-sm text-left">
      {!showQuantity && !showRecurrence && (
        <span className="text-gray-700">
          Add <button type="button" onClick={onAddQuantity} className="underline text-blue-700">quantity</button> or <button type="button" onClick={onAddRecurrence} className="underline text-blue-700">recurrence</button>
        </span>
      )}
      {showQuantity && !showRecurrence && (
        <button type="button" onClick={onRemoveQuantity} className="underline text-blue-700">Remove quantity</button>
      )}
      {showRecurrence && (
        <button type="button" onClick={onRemoveRecurrence} className="underline text-blue-700">Remove recurrence</button>
      )}
    </div>
  );
} 