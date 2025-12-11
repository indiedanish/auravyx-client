'use client';

import React from 'react';

interface TooltipProps {
  text: string;
  id: string;
  showTooltip: string | null;
  onShow: (id: string) => void;
  onHide: () => void;
}

export default function Tooltip({ text, id, showTooltip, onShow, onHide }: TooltipProps) {
  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => onShow(id)}
        onMouseLeave={onHide}
        className="text-primary-600 hover:text-primary-700 transition-colors"
      >
        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {showTooltip === id && (
        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6 transform -translate-y-full">
          {text}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-4"></div>
        </div>
      )}
    </div>
  );
}

