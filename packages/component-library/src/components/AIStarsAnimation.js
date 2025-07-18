import React from 'react';
import './AIStarsAnimation.css';

export default function AIStarsAnimation({ size = 24, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ai-stars-animation ${className}`}
      {...props}
    >
      <g>
        <path className="star-main" d="M12 17.5c.3-1.2 1-2.2 2-2.5-1-.3-1.7-1.3-2-2.5-.3 1.2-1 2.2-2 2.5 1 .3 1.7 1.3 2 2.5z" fill="currentColor"/>
        <path className="star-left" d="M7.5 9.5c.15-.6.5-1.1 1-1.25-.5-.15-.85-.65-1-1.25-.15.6-.5 1.1-1 1.25.5.15.85.65 1 1.25z" fill="currentColor"/>
        <path className="star-right" d="M16.5 7.5c.15-.6.5-1.1 1-1.25-.5-.15-.85-.65-1-1.25-.15.6-.5 1.1-1 1.25.5.15.85.65 1 1.25z" fill="currentColor"/>
      </g>
    </svg>
  );
} 