"use client";

import React, { useEffect, useState } from "react";

interface LiquidTextFillLoaderProps {
  text?: string;
  duration?: number;
}

export function LiquidTextFillLoader({ text = "LOADING", duration = 3000 }: LiquidTextFillLoaderProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const elapsed = (now - start) % duration;
      setPercent((elapsed / duration) * 100);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  return (
    <div className="flex items-center justify-center p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]">
      <style>{`
        @keyframes liquid-wobble {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        .liquid-fill-wave { animation: liquid-wobble 2s ease-in-out infinite; }
      `}</style>
      <svg viewBox="0 0 400 100" className="w-full max-w-md">
        <defs>
          <clipPath id="liquid-text-clip">
            <text x="50%" y="65" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
              {text}
            </text>
          </clipPath>
        </defs>

        {/* Outline text */}
        <text
          x="50%"
          y="65"
          textAnchor="middle"
          fontSize="52"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="4"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
        >
          {text}
        </text>

        {/* Liquid fill masked by text */}
        <g clipPath="url(#liquid-text-clip)">
          {/* Main solid liquid body (MayaKit Yellow) */}
          <rect
            x="0"
            y={100 - percent}
            width="400"
            height="100"
            fill="#FFFE15"
            style={{ transition: "y 0.05s linear" }}
          />
          {/* Liquid wave on top */}
          <path
            className="liquid-fill-wave"
            d="M0,0 Q25,-6 50,0 T100,0 T150,0 T200,0 T250,0 T300,0 T350,0 T400,0 V10 H0 Z"
            fill="rgba(255, 255, 255, 0.6)"
            transform={`translate(0, ${100 - percent})`}
          />
        </g>
      </svg>
    </div>
  );
}
