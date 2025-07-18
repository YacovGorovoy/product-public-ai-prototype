import React from 'react';
import Badge from './Badge';
import Typography from './Typography';

/**
 * RequestSummaryHeader displays the main info for a purchase request.
 * @param {string} title - Request title
 * @param {string} requestNumber - Request number (e.g., '23')
 * @param {string} status - Status label (e.g., 'Pending Approval')
 * @param {string} statusColor - Badge color (e.g., 'blue')
 * @param {string} amount - Amount string (e.g., '445.00 USD')
 * @param {string} vendor - Vendor name
 * @param {string} category - Category or purchase type
 * @param {string} subtitle - Optional subtitle (e.g., vendor + category)
 * @param {React.ReactNode} children - Optional extra content (e.g., actions)
 */
export default function RequestSummaryHeader({
  title,
  requestNumber,
  status,
  statusColor = 'blue',
  amount,
  vendor,
  category,
  subtitle,
  children,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-3 border-b border-gray-100 mb-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Typography variant="h2" className="!mb-0 !text-xl font-bold text-gray-900">
            {title}
          </Typography>
          {requestNumber && (
            <span className="text-gray-500 text-sm font-medium">(Request-{requestNumber})</span>
          )}
          {status && (
            <Badge color={statusColor}>{status}</Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-gray-700 text-sm font-medium flex-wrap">
          {amount && <span>{amount}</span>}
          {vendor && <span>{vendor}</span>}
          {category && <span>{category}</span>}
          {subtitle && <span>{subtitle}</span>}
        </div>
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
} 