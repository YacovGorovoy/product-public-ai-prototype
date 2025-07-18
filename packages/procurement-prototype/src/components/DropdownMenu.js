// Dropdown menu for actions (e.g., New button)
import React from 'react';

/**
 * DropdownMenu for actions
 * @param {React.ReactNode} buttonContent - Button content
 * @param {Array} options - [{ label, icon }]
 * @param {boolean} open - Whether the dropdown is open
 * @param {function} setOpen - Setter for open state
 * @param {string} maxWidth - Tailwind max-width class for label (default 'max-w-xs')
 */
export default function DropdownMenu({ buttonContent, options = [], open, setOpen, maxWidth = 'max-w-xs' }) {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded px-4 py-2 focus:outline-none shadow"
      >
        {buttonContent}
      </button>
      {open && (
        <div className={"absolute right-0 mt-2 min-w-[16rem] max-w-3xl bg-white rounded-md shadow-lg py-2 z-20 border"}>
          {options.map((opt, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={opt.onClick}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition group"
                style={{ outline: 'none' }}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-3">
                  {opt.icon}
                </span>
                <span className={`font-medium text-gray-900 text-base overflow-hidden text-ellipsis block whitespace-nowrap ${maxWidth}`}>
                  {opt.label}
                </span>
              </button>
              {idx < options.length - 1 && <div className="border-t mx-4" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
} 