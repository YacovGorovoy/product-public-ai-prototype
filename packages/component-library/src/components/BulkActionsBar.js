// BulkActionsBar for multi-select actions
import React from 'react';

/**
 * BulkActionsBar for multi-select actions
 * @param {number} selectedCount - Number of selected items
 * @param {Array} selectionActions - [{ label, onClick, show }]
 * @param {Array} bulkActions - [{ label, onClick, primary }]
 * @param {string} className - Additional classes
 */
export default function BulkActionsBar({ selectedCount, selectionActions = [], bulkActions = [], className = '' }) {
  return (
    <div className={`w-full flex items-center justify-between bg-blue-100 text-blue-900 px-6 py-2 rounded mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{selectedCount} item{selectedCount !== 1 ? 's' : ''} selected</span>
        {selectionActions.filter(a => a.show !== false).map((action, idx) => (
          <React.Fragment key={idx}>
            <button onClick={action.onClick} className="ml-4 text-blue-700 underline text-sm">{action.label}</button>
            {idx < selectionActions.filter(a => a.show !== false).length - 1 && <span className="mx-1">|</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {bulkActions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className={
              action.primary
                ? 'bg-blue-700 text-white font-semibold px-4 py-1 rounded shadow-sm hover:bg-blue-800'
                : 'bg-white border border-blue-700 text-blue-700 font-semibold px-4 py-1 rounded shadow-sm hover:bg-blue-50'
            }
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
} 