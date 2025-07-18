import React from 'react';

export default function RequestIcon({ className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: 48, height: 48 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="6" fill="#F5F6FA" stroke="#D1D5DB" strokeWidth="2" />
        <rect x="10" y="10" width="12" height="2" rx="1" fill="#B0B7C3" />
        <rect x="10" y="15" width="8" height="2" rx="1" fill="#B0B7C3" />
      </svg>
      <span className="text-[10px] font-semibold text-gray-600 mt-1 tracking-wide">REQUEST</span>
    </div>
  );
} 