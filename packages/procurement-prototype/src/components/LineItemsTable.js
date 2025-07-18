import React, { useState, useRef, useEffect } from 'react';

/**
 * LineItemsTable: Simple table for line items
 * @param {Array} items - Array of line items
 * @param {function} onItemChange - Callback when items change
 * @param {number} maxItems - Maximum number of items allowed
 * @param {string} variant - 'editable' or 'inline' (default: 'editable')
 * @param {boolean} readOnly - Read-only state (for inline variant)
 * @param {function} onSave - Save handler (for inline variant)
 * @param {function} onCancel - Cancel handler (for inline variant)
 */
export default function LineItemsTable({ 
  items = [], 
  onItemChange, 
  maxItems = 20,
  variant = 'editable',
  readOnly = false,
  onSave,
  onCancel
}) {
  const [showQuantity, setShowQuantity] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItems, setEditItems] = useState(items);
  const [isHovered, setIsHovered] = useState(false);
  const tableRef = useRef(null);

  // Update edit items when prop items change
  useEffect(() => {
    setEditItems(items);
  }, [items]);

  // Handle click outside to save
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        if (isEditing) {
          handleSave();
        }
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editItems]);

  const handleTableClick = () => {
    if (variant === 'inline' && readOnly && !isEditing) {
      setIsEditing(true);
      setEditItems(items);
    }
  };

  const handleSave = () => {
    if (JSON.stringify(editItems) !== JSON.stringify(items)) {
      onItemChange(editItems);
      onSave && onSave(editItems);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditItems(items);
    setIsEditing(false);
    onCancel && onCancel();
  };

  const handleAddItem = () => {
    if (editItems.length < maxItems) {
      const newItems = [...editItems, { currency: 'USD', amount: '', quantity: '1', desc: '' }];
      setEditItems(newItems);
      if (variant === 'editable') {
        onItemChange(newItems);
      }
    }
  };

  const handleRemoveItem = (index) => {
    if (editItems.length > 1) {
      const newItems = editItems.filter((_, i) => i !== index);
      setEditItems(newItems);
      if (variant === 'editable') {
        onItemChange(newItems);
      }
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = editItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setEditItems(newItems);
    if (variant === 'editable') {
      onItemChange(newItems);
    }
  };

  const total = editItems.reduce((sum, item) => 
    sum + (parseFloat(item.amount) || 0) * (parseInt(item.quantity) || 1), 0
  );

  const isReadOnly = variant === 'inline' && readOnly && !isEditing;

  return (
    <div 
      className={`space-y-4 ${isHovered && isReadOnly ? 'group' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={tableRef}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-700">Line Items</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={showQuantity}
              onChange={(e) => setShowQuantity(e.target.checked)}
              className="mr-2"
              disabled={isReadOnly}
            />
            Show quantity
          </label>
          {variant === 'editable' && (
            <button
              type="button"
              onClick={handleAddItem}
              disabled={editItems.length >= maxItems}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
            >
              + Add Item
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div 
        className={`border border-gray-200 rounded-lg overflow-hidden relative ${
          isReadOnly ? 'cursor-pointer hover:bg-gray-50' : ''
        }`}
        onClick={handleTableClick}
      >
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
          {editItems.map((item, index) => (
            <div key={index} className="px-4 py-3">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <select
                    value={item.currency}
                    onChange={(e) => handleItemChange(index, 'currency', e.target.value)}
                    className={`w-full border border-gray-300 rounded px-2 py-1 text-sm ${
                      isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
                    disabled={isReadOnly}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                    placeholder="0.00"
                    className={`w-full border border-gray-300 rounded px-2 py-1 text-sm ${
                      isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
                    disabled={isReadOnly}
                  />
                </div>
                
                {showQuantity && (
                  <div className="col-span-1">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      placeholder="1"
                      min="1"
                      className={`w-full border border-gray-300 rounded px-2 py-1 text-sm ${
                        isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      disabled={isReadOnly}
                    />
                  </div>
                )}
                
                <div className={showQuantity ? "col-span-7" : "col-span-8"}>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => handleItemChange(index, 'desc', e.target.value)}
                    placeholder="Item description"
                    className={`w-full border border-gray-300 rounded px-2 py-1 text-sm ${
                      isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
                    disabled={isReadOnly}
                  />
                </div>
                
                <div className="col-span-1">
                  {variant === 'editable' && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      disabled={editItems.length === 1}
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

        {/* Pencil icon on hover (read-only state) */}
        {isHovered && isReadOnly && (
          <button
            onClick={handleTableClick}
            className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
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
      </div>

      {/* Total */}
      <div className="text-right">
        <span className="font-medium text-gray-700">Total: </span>
        <span className="font-bold text-lg">USD {total.toFixed(2)}</span>
      </div>
    </div>
  );
} 