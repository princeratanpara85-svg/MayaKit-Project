import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  const lineSpacing = 6;
  const strokeWidth = 2.5;
  const lines = Array.from({ length: 30 });

  return (
    <div className={`relative flex items-center justify-center ${className} h-[56px] w-[56px]`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          {/* We define clip paths for each of the 3 isometric faces */}
          <clipPath id="left-face">
            <polygon points="50,50 10,27 10,73 50,96" />
          </clipPath>
          <clipPath id="right-face">
            <polygon points="50,50 90,27 90,73 50,96" />
          </clipPath>
          <clipPath id="top-face">
            <polygon points="50,50 10,27 50,4 90,27" />
          </clipPath>
        </defs>

        {/* Left Face: Vertical lines */}
        <g clipPath="url(#left-face)">
          {lines.map((_, i) => (
            <line key={`l-${i}`} x1={i * lineSpacing} y1="0" x2={i * lineSpacing} y2="100" />
          ))}
        </g>

        {/* Right Face: Lines parallel to Top-Left edge (-30 deg) */}
        <g clipPath="url(#right-face)">
          <g transform="rotate(-30 50 50)">
            {lines.map((_, i) => (
              <line key={`r-${i}`} x1="-50" y1={50 + (i - 15) * lineSpacing} x2="150" y2={50 + (i - 15) * lineSpacing} />
            ))}
          </g>
        </g>

        {/* Top Face: Lines parallel to Top-Right edge (30 deg) */}
        <g clipPath="url(#top-face)">
          <g transform="rotate(30 50 50)">
            {lines.map((_, i) => (
              <line key={`t-${i}`} x1="-50" y1={50 + (i - 15) * lineSpacing} x2="150" y2={50 + (i - 15) * lineSpacing} />
            ))}
          </g>
        </g>

        {/* Thick Outer Hexagon and Inner Y Borders */}
        {/* These sit on top of the clipped lines to give perfect, clean solid borders */}
        <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" strokeWidth="5.5" strokeLinejoin="miter" />
        <path d="M 50,50 L 50,96 M 50,50 L 10,27 M 50,50 L 90,27" strokeWidth="5.5" />
      </svg>
    </div>
  );
}
