"use client";

import React from 'react';

export default function HypnoRings() {
  const colors = ['#163648', '#FFFE15', '#E2E8F0', '#163648', '#FFFE15'];

  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-[#0C1E29]">
      {colors.map((c, i) => (
        <span 
          key={i} 
          className="absolute h-28 w-28 rounded-full border-2 opacity-0 animate-[ringExpand_3.2s_ease-out_infinite]"
          style={{ borderColor: c, animationDelay: `${i * 0.64}s` }} 
        />
      ))}
      <div className="relative h-16 w-16 animate-[wiggle_2.4s_ease-in-out_infinite] rounded-full bg-[#FFFE15]">
        <span className="absolute left-4 top-5 h-2 w-2 rounded-full bg-[#0C1E29]" />
        <span className="absolute right-4 top-5 h-2 w-2 rounded-full bg-[#0C1E29]" />
        <span className="absolute bottom-3.5 left-1/2 h-3 w-6 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#0C1E29]" />
      </div>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] text-[#E2E8F0]/35">
        sonar.smile
      </span>
    </div>
  );
}
