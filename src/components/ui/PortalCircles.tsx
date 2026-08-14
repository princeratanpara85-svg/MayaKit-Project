"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, MotionPathPlugin);
}

export function PortalCircles() {
  const container = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    if (!isClient) return;

    if (prefersReducedMotion) {
      // Static state
      gsap.set(".portal-ring", { scale: 1, opacity: 1, transformOrigin: "center" });
      gsap.set(".moving-circle", { opacity: 1 });
      
      // Manually position circles along the path for static display
      const circles = gsap.utils.toArray(".moving-circle");
      circles.forEach((circle, i) => {
        gsap.set(circle as Element, {
          motionPath: {
            path: "#wavyPath",
            align: "#wavyPath",
            alignOrigin: [0.5, 0.5],
            start: 0.2 + (i * 0.15),
            end: 0.2 + (i * 0.15),
          }
        });
      });
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });

    // Initial setup
    gsap.set(".portal-ring", { scale: 0, opacity: 0, transformOrigin: "center" });
    gsap.set(".moving-circle", { opacity: 0, transformOrigin: "center" });

    // 1. Portal opens
    tl.to(".portal-ring", {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    });

    // 2. Circles emit
    const circles = gsap.utils.toArray(".moving-circle");
    
    circles.forEach((circle, i) => {
      // Fade in at start of path
      tl.to(circle as Element, {
        opacity: 1,
        duration: 0.3
      }, i * 0.4 + 0.5);

      // Travel along path
      tl.to(circle as Element, {
        motionPath: {
          path: "#wavyPath",
          align: "#wavyPath",
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        duration: 4,
        ease: "sine.inOut"
      }, i * 0.4 + 0.5);

      // Fade out at end of path
      tl.to(circle as Element, {
        opacity: 0,
        duration: 0.5
      }, (i * 0.4 + 0.5) + 3.5);
    });

    // 3. Portal closes after last circle emits
    const lastCircleEmitTime = (circles.length - 1) * 0.4 + 0.5;
    tl.to(".portal-ring", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.in(1.5)"
    }, lastCircleEmitTime + 1.0);

    // 4. Brief pause (happens naturally because the timeline ends when the last circle finishes its 4s journey)
    // The last circle finishes at lastCircleEmitTime + 4.0
    // We can add a dummy tween for the pause
    tl.to({}, { duration: 1.0 });

  }, { scope: container, dependencies: [prefersReducedMotion, isClient] });

  if (!isClient) return null;

  // 5 varied circles
  const circleConfigs = [
    { r: 12, className: "fill-[#FFFE15]" },
    { r: 16, className: "fill-[#163648] stroke-[#FFFE15] stroke-[2px]" },
    { r: 14, className: "fill-[#E2E8F0] opacity-50" },
    { r: 10, className: "fill-[#FFFE15]" },
    { r: 18, className: "fill-[#163648] stroke-[#FFFE15] stroke-[2px]" },
  ];

  return (
    <div ref={container} className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <svg 
        viewBox="0 0 1440 800" 
        className="w-full h-full object-cover" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Invisible motion path guide */}
        <path 
          id="wavyPath" 
          d="M 150 250 C 400 250 500 650 800 650 C 1100 650 1200 450 1500 450" 
          fill="none" 
          stroke="rgba(255, 254, 21, 0.15)" // subtle border-border tone
          strokeWidth="1" 
          strokeDasharray="4 4"
        />

        {/* Portal Ring */}
        <circle 
          className="portal-ring" 
          cx="150" 
          cy="250" 
          r="35" 
          fill="none" 
          stroke="#FFFE15" 
          strokeWidth="2" 
        />

        {/* Moving Circles */}
        {circleConfigs.map((cfg, i) => (
          <g key={i} className="moving-circle">
            <circle cx="0" cy="0" r={cfg.r} className={cfg.className} />
            {/* Tiny offset dot to make autoRotate visible */}
            <circle cx={cfg.r - 2} cy="0" r="2" fill="#0C1E29" opacity="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
