"use client";

import React from 'react';

export default function PixelateImage() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-none overflow-hidden group relative bg-[#0C1E29]">
      <img
        src="https://picsum.photos/800/600?7"
        alt="Pixelated"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        style={{
          filter: 'blur(8px) contrast(1.2)',
        }}
      />
      <img
        src="https://picsum.photos/800/600?7"
        alt="Clear"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ filter: 'none' }}
      />
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10 transition-opacity duration-300 group-hover:opacity-0">
        HOVER TO SHARPEN
      </span>
    </div>
  );
}
