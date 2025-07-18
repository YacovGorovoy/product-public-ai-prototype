import React, { useState } from 'react';

/**
 * LineItemsTable: Simple table for line items
 * @param {Array} items - Array of line items
 * @param {function} onItemChange - Callback when items change
 * @param {number} maxItems - Maximum number of items allowed
 * @param {string} variant - 'editable' or 'inline'
 * @param {function} onEdit - Callback for inline editing
 * @param {function} onSave - Callback when saving
 * @param {function} onCancel - Callback when canceling
 */
export default function LineItemsTable({ 
  items = [], 
  onItemChange, 
  maxItems = 20,
  variant = 'editable',
  onEdit,
  onSave,
  onCancel
}) {
  const [showQuantity, setShowQuantity] = useState(false);
  const [isEditing, setIsEditing] = useState(variant === 'editable');

  const handleAddItem = () => {
    if (items.length < maxItems) {
      const newItems = [...items, { currency: 'USD', amount: '', quantity: '1', desc: '' }];
      onItemChange(newItems);
    }
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      onItemChange(newItems);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onItemChange(newItems);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    onEdit && onEdit();
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave && onSave(items);
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancel && onCancel();
  };

  const total = items.reduce((sum, item) => 
    sum + (parseFloat(item.amount) || 0) * (parseInt(item.quantity) || 1), 0
  );

  const isReadOnly = variant === 'inline' && !isEditing;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-700">Line Items</h3>
        <div className="flex items-center space-x-4">
          {!isReadOnly && (
            <>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={showQuantity}
                  onChange={(e) => setShowQuantity(e.target.checked)}
                  className="mr-2"
                />
                Show quantity
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                disabled={items.length >= maxItems}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
              >
                + Add Item
              </button>
            </>
          )}
          {variant === 'inline' && !isEditing && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
          )}
          {variant === 'inline' && isEditing && (
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div className="col-span-1">Currency</div>
            <div className="col-span-2">Amount</div>
            {showQuantity && <div className="col-span-1">Qty</div>}
            <div className={showQuantity ? "col-span-7" : "col-span-8"}>Description</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <div key={index} className="px-4 py-3">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  {isReadOnly ? (
                    <div className="text-sm text-gray-900">{item.currency}</div>
                  ) : (
                    <select
                      value={item.currency}
                      onChange={(e) => handleItemChange(index, 'currency', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  )}
                </div>
                
                <div className="col-span-2">
                  {isReadOnly ? (
                    <div className="text-sm text-gray-900">{item.amount}</div>
                  ) : (
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                      placeholder="0.00"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  )}
                </div>
                
                {showQuantity && (
                  <div className="col-span-1">
                    {isReadOnly ? (
                      <div className="text-sm text-gray-900">{item.quantity}</div>
                    ) : (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        placeholder="1"
                        min="1"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    )}
                  </div>
                )}
                
                <div className={showQuantity ? "col-span-7" : "col-span-8"}>
                  {isReadOnly ? (
                    <div className="text-sm text-gray-900">{item.desc}</div>
                  ) : (
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => handleItemChange(index, 'desc', e.target.value)}
                      placeholder="Item description"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  )}
                </div>
                
                <div className="col-span-1">
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      disabled={items.length === 1}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <span className="font-medium text-gray-700">Total: </span>
        <span className="font-bold text-lg">USD {total.toFixed(2)}</span>
      </div>
    </div>
  );
} 