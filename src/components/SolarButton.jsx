import React from 'react';

export default function SolarButton({ onClick, children, className = '' }) {
  return (
    <button
      className={`w-fit bg-yellow text-black font-bold px-5 py-3 rounded-full 
                 button-text hover:bg-white hover:text-black 
                 transition duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
