// RequestDetailsHeader component for request details view
import React from 'react';
import Badge from './Badge';
import BackLink from './BackLink';

/**
 * RequestDetailsHeader component for request details view
 * @param {string} title - Request title
 * @param {string} requestId - Request ID (e.g., "Request-23")
 * @param {string} status - Request status (e.g., "Pending Approval", "Approved")
 * @param {Object} summary - Summary object with amount, vendor, type
 * @param {string} userName - Current user name
 * @param {function} onBack - Back navigation callback
 * @param {function} onHelp - Help button callback
 * @param {function} onDocuments - Documents button callback
 * @param {function} onProfile - Profile button callback
 * @param {string} className - Additional classes
 */
export default function RequestDetailsHeader({
  title,
  requestId,
  status,
  summary = {},
  userName,
  onBack,
  onHelp,
  onDocuments,
  onProfile,
  className = ''
}) {
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending approval':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount) => {
    if (!amount) return '';
    if (typeof amount === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(amount);
    }
    return amount;
  };

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      {/* Main header row */}
      <div className="flex items-center justify-between p-4">
        {/* Left side - Back button, title, and status */}
        <div className="flex items-center space-x-4">
          <BackLink onClick={onBack} />
          
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-900">
              {title} {requestId && `(${requestId})`}
            </h1>
            
            {status && (
              <Badge 
                text={status} 
                color={getStatusBadgeColor(status)}
                className="text-sm font-medium"
              />
            )}
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors" 
            onClick={onHelp}
            aria-label="Help"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors" 
            onClick={onDocuments}
            aria-label="Documents"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          
          <span className="text-sm font-medium text-gray-700">
            {userName}
          </span>
          
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors" 
            onClick={onProfile}
            aria-label="User profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary information row */}
      {(summary.amount || summary.vendor || summary.type) && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {summary.amount && (
              <span className="font-medium text-gray-900">
                {formatAmount(summary.amount)}
              </span>
            )}
            
            {summary.vendor && (
              <>
                <span className="text-gray-400">|</span>
                <span>{summary.vendor}</span>
              </>
            )}
            
            {summary.type && (
              <>
                <span className="text-gray-400">|</span>
                <span>{summary.type}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 