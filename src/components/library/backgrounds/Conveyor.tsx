"use client";

import React from 'react';

export default function Conveyor() {
  const parcels = [
    { c: '#FFFE15', d: 0, tilt: 'rotate-2' },
    { c: '#163648', d: -1.75, tilt: '-rotate-2' },
    { c: '#E2E8F0', d: -3.5, tilt: 'rotate-1' },
    { c: '#FFFE15', d: -5.25, tilt: '-rotate-1' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0C1E29]">
      <p className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.35em] text-[#E2E8F0]/30">
        ── FRESH MOTIONS DAILY ──
      </p>
      
      {/* belt plane */}
      <div className="absolute -left-10 -right-10 bottom-6 h-36 origin-bottom [transform:perspective(600px)_rotateX(50deg)]">
        <div className="h-full w-full animate-[beltmove_.55s_linear_infinite]"
          style={{ background: 'repeating-linear-gradient(90deg,#0C1E29 0 26px,#163648 26px 52px)' }} />
        <div className="absolute inset-x-0 top-0 h-2 bg-[#163648]" />
      </div>
      <div className="absolute bottom-5 left-0 right-0 h-2.5 rounded-full bg-[#163648]" />
      
      {/* parcels */}
      {parcels.map((p, i) => (
        <div key={i} className="absolute inset-0 animate-[ride_7s_linear_infinite]" style={{ animationDelay: `${p.d}s` }}>
          <div className="absolute bottom-[88px] left-0">
            <div className={`animate-[bobble_1s_ease-in-out_infinite] ${p.tilt}`} style={{ animationDelay: `${i * 0.18}s` }}>
              <div className="relative h-12 w-14 rounded-md border-2 border-[#0C1E29] shadow-[3px_3px_0_rgba(0,0,0,.45)]" style={{ background: p.c }}>
                <span className="absolute left-2.5 top-3 h-1.5 w-1.5 rounded-full bg-[#0C1E29]" />
                <span className="absolute right-2.5 top-3 h-1.5 w-1.5 rounded-full bg-[#0C1E29]" />
                <span className="absolute left-1/2 top-3.5 h-2.5 w-4 -translate-x-1/2 rounded-b-full border-b-[2.5px] border-[#0C1E29]" />
                <span className="absolute bottom-1 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded bg-[#0C1E29]/30" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
