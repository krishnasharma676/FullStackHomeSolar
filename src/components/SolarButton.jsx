import React from 'react';

export default function SolarButton({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`solar-btn ${className}`}
    >
      {children}
    </button>
  );
}
