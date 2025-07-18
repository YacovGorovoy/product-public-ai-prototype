import React, { useState } from 'react';

/**
 * ProcessFlow component for visualizing sequential and parallel steps.
 * @param {Array} steps - Array of steps. Each step can be:
 *   - { label, status, icon, names, tooltip }
 *   - Or an array of such objects for parallel steps
 *
 * status: 'completed' | 'current' | 'pending'
 * icon: ReactNode (optional)
 * names: string | string[] (optional)
 * tooltip: string | ReactNode (optional)
 */
export default function ProcessFlow({ steps = [] }) {
  // Tooltip state
  const [tooltip, setTooltip] = useState({ show: false, content: null, x: 0, y: 0 });

  // Helper to render a single step
  const renderStep = (step, idx) => {
    const handleMouseEnter = e => {
      if (step.tooltip) {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
          show: true,
          content: step.tooltip,
          x: rect.left + rect.width / 2,
          y: rect.top
        });
      }
    };
    const handleMouseLeave = () => setTooltip({ show: false, content: null, x: 0, y: 0 });

    let borderColor = 'border-gray-300';
    let bgColor = 'bg-white';
    let textColor = 'text-gray-500';
    if (step.status === 'completed') {
      borderColor = 'border-green-500';
      bgColor = 'bg-green-500';
      textColor = 'text-green-700';
    } else if (step.status === 'current') {
      borderColor = 'border-black';
      bgColor = 'bg-white';
      textColor = 'text-black';
    }

    return (
      <div
        key={idx}
        className="flex flex-col items-center min-w-[120px] relative group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-2">
          {/* Status indicator with icon slot */}
          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${bgColor} ${borderColor}`}>
            {step.icon ? (
              <span className="w-4 h-4 flex items-center justify-center">{step.icon}</span>
            ) : (
              <span className={`w-2.5 h-2.5 rounded-full block ${step.status === 'completed' ? 'bg-white' : step.status === 'current' ? 'bg-black' : 'bg-gray-300'}`} />
            )}
          </span>
          <span className={`font-semibold text-sm ${textColor}`}>{step.label}</span>
        </div>
        {step.names && (
          <span className="text-xs text-gray-400 mt-0.5 text-center">
            {Array.isArray(step.names) ? step.names.join(', ') : step.names}
          </span>
        )}
        {step.subLabel && <span className="text-xs text-gray-400 mt-0.5">{step.subLabel}</span>}
      </div>
    );
  };

  // Helper to render a group of parallel steps (vertically stacked)
  const renderParallel = (group, idx) => (
    <div key={idx} className="flex flex-col items-center relative gap-4">
      {group.map(renderStep)}
    </div>
  );

  // Render the flow
  return (
    <div className="flex items-center gap-4 py-6 px-2 bg-gray-50 rounded-lg overflow-x-auto relative">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          {Array.isArray(step)
            ? renderParallel(step, idx)
            : renderStep(step, idx)}
          {/* Connector line, except after last step */}
          {idx < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-200 mx-2 min-w-[32px]" />
          )}
        </React.Fragment>
      ))}
      {/* Tooltip overlay */}
      {tooltip.show && (
        <div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y - 40, transform: 'translate(-50%, -100%)' }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
} 