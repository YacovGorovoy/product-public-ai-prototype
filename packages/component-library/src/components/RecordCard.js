import React from 'react';
import Badge from './Badge';
import Button from './Button';
import CustomCheckbox from './CustomCheckbox';

const RecordCard = ({ 
  record, 
  isSelected = false, 
  onSelect, 
  onClick, 
  showCheckbox = false,
  isClickable = false 
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'request':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'bill':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'expense':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Draft':
        return 'gray';
      case 'Pending approval':
        return 'yellow';
      case 'Approved':
        return 'green';
      case 'Pending AP action':
        return 'blue';
      case 'Pending Payment':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getActionButton = (status, type) => {
    switch (status) {
      case 'Draft':
        return (
          <Button variant="outline" size="sm">
            Submit
          </Button>
        );
      case 'Pending approval':
        return (
          <Button variant="outline" size="sm">
            Approve
          </Button>
        );
      default:
        return null;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMetaInfo = () => {
    switch (record.type) {
      case 'request':
        return (
          <div className="text-sm text-gray-500 space-y-1">
            <div>Submitted: {formatDate(record.submittedDate)}</div>
            <div>Vendor: {record.vendor}</div>
            {record.department && <div>Department: {record.department}</div>}
          </div>
        );
      case 'bill':
        return (
          <div className="text-sm text-gray-500 space-y-1">
            <div>Bill Date: {formatDate(record.billDate)}</div>
            <div>Due Date: {formatDate(record.dueDate)}</div>
            <div>Vendor: {record.vendor}</div>
            {record.gapFromLastBill && (
              <div className="text-orange-600">Gap from last bill: {record.gapFromLastBill} days</div>
            )}
          </div>
        );
      case 'expense':
        return (
          <div className="text-sm text-gray-500 space-y-1">
            <div>Purchased: {formatDate(record.purchasedDate)}</div>
            <div>Submitted by: {record.submittedBy}</div>
            {record.category && <div>Category: {record.category}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  const cardClasses = `
    bg-white border border-gray-200 rounded-lg p-4 
    ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : ''}
    ${isClickable ? 'cursor-pointer hover:shadow-md hover:border-gray-300' : ''}
    transition-all duration-200
  `;

  return (
    <div 
      className={cardClasses}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {showCheckbox && (
            <div className="mt-1">
              <CustomCheckbox
                checked={isSelected}
                onChange={onSelect}
                disabled={record.status !== 'Pending approval'}
              />
            </div>
          )}
          
          <div className="flex-shrink-0 mt-1">
            {getTypeIcon(record.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {record.title}
              </h3>
              <Badge color={getStatusBadgeColor(record.status)}>
                {record.status}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {getMetaInfo()}
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    {formatAmount(record.amount)}
                  </div>
                  {record.type === 'request' && record.lineItemsCount && (
                    <div className="text-sm text-gray-500">
                      {record.lineItemsCount} item{record.lineItemsCount !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                {getActionButton(record.status, record.type)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordCard; 