import React, { useState, useRef } from 'react';

/**
 * Tooltip component for showing content on hover/focus.
 * @param {React.ReactNode} children - The trigger element(s)
 * @param {React.ReactNode} content - The tooltip content
 * @param {string} placement - 'top' | 'right' | 'bottom' | 'left' (default: 'top')
 * @param {string} className - Additional classes for the tooltip
 */
export default function Tooltip({ children, content, placement = 'top', className = '' }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef();

  const showTooltip = e => {
    const rect = triggerRef.current.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top;
    if (placement === 'bottom') y = rect.bottom;
    if (placement === 'right') x = rect.right;
    if (placement === 'left') x = rect.left;
    setCoords({ x, y });
    setVisible(true);
  };
  const hideTooltip = () => setVisible(false);

  return (
    <span
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
      className="relative inline-block"
    >
      {children}
      {visible && (
        <div
          className={`fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap ${className}`}
          style={{
            left: coords.x,
            top: placement === 'top' ? coords.y - 12 : placement === 'bottom' ? coords.y + 12 : coords.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
} 