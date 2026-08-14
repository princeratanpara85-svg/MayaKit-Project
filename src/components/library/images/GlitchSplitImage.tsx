"use client";

import React from 'react';

export default function GlitchSplitImage() {
  return (
    <div className="relative w-full h-full min-h-[400px] group overflow-hidden rounded-none bg-[#0C1E29]">
      <img
        src="https://picsum.photos/800/600?5"
        alt="Glitch"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mix-blend-screen pointer-events-none">
        <img
          src="https://picsum.photos/800/600?5"
          alt="Glitch Red"
          className="absolute inset-0 w-full h-full object-cover translate-x-2 group-hover:translate-x-4 transition-transform"
          style={{ filter: 'url(#glitch-red)' }}
        />
        <img
          src="https://picsum.photos/800/600?5"
          alt="Glitch Blue"
          className="absolute inset-0 w-full h-full object-cover -translate-x-2 group-hover:-translate-x-4 transition-transform"
          style={{ filter: 'url(#glitch-blue)' }}
        />
      </div>
      <svg className="hidden">
        <filter id="glitch-red">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <filter id="glitch-blue">
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10 transition-opacity duration-300 group-hover:opacity-0">
        HOVER TO GLITCH
      </span>
    </div>
  );
}
