// Typography component for headings and labels
import React from 'react';

/**
 * Typography for headings and labels
 * @param {string} variant - 'h1' | 'h2' | 'h3' | 'label' | 'p'
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children - Content
 */
export default function Typography({ variant = 'p', className = '', children }) {
  const variants = {
    h1: 'text-3xl font-bold text-gray-800',
    h2: 'text-2xl font-bold text-gray-800',
    h3: 'text-lg font-semibold text-gray-800',
    label: 'block mb-1 font-medium text-gray-600',
    p: 'text-base text-gray-700',
  };
  const Tag = variant === 'label' ? 'label' : variant;
  return <Tag className={`${variants[variant] || ''} ${className}`}>{children}</Tag>;
} 