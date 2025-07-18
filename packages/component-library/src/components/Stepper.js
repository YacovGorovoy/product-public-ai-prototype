// Stepper navigation for multi-step forms
import React from 'react';

/**
 * Stepper for multi-step navigation
 * @param {Array} steps - [{ label, active, completed }]
 * @param {function} onStepClick - Callback for step click
 */
export default function Stepper({ steps = [], onStepClick }) {
  return (
    <nav className="w-48 pt-4">
      <div className="text-xs font-semibold text-gray-400 uppercase mb-4">STEPS</div>
      <ul className="space-y-2">
        {steps.map((step, idx) => (
          <li key={idx}>
            <button
              className={`block w-full text-left px-3 py-1 font-semibold rounded-l border-l-4 transition
                ${step.active ? 'text-blue-700 border-blue-700 bg-blue-50' : step.completed ? 'text-gray-700 border-green-400 bg-green-50' : 'text-gray-400 border-transparent'}`}
              onClick={() => onStepClick && onStepClick(idx)}
              disabled={!step.active && !step.completed}
            >
              {step.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
} 