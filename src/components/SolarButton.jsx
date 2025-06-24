import React from 'react';

export default function SolarButton({ onClick, children, className = '' }) {
  return (
    <button
      className={`w-fit bg-yellow text-black font-bold px-6 py-3 rounded-full 
                 text-base sm:text-lg md:text-xl hover:bg-white hover:text-black 
                 transition duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
