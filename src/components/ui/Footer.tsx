"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ================================================
// SVG ICONS
// ================================================
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
    <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
    <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5c-2 0 -4 0 -6 0l-1 -2.5c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
    <path d="M7 16.5c3.5 2 6.5 2 10 0" />
  </svg>
);

// ================================================
// CONFIG
// ================================================
const NAVIGATION = [
  {
    section: "Product",
    links: [
      { label: "Components", route: "/components" },
      { label: "Color Combo", route: "/color-combo" },
      { label: "Docs", route: "/docs" },
    ],
  },
  {
    section: "Company",
    links: [
      { label: "About", route: "/about" },
      { label: "GitHub", route: "https://github.com/placeholder/mayakit", icon: <GithubIcon className="w-4 h-4 mr-2" /> },
    ],
  },
  {
    section: "Resources",
    links: [
      { label: "Contribution Guide", route: "/contribution" },
      { label: "License", route: "/license" },
      { label: "Changelog", route: "/changelog" },
    ],
  },
  {
    section: "Social",
    links: [
      { label: "GitHub", route: "#", icon: <GithubIcon className="w-4 h-4 mr-2" /> },
      { label: "X / Twitter", route: "#", icon: <XIcon className="w-4 h-4 mr-2" /> },
      { label: "Discord", route: "#", icon: <DiscordIcon className="w-4 h-4 mr-2" /> },
    ],
  },
];

// ================================================
// COMPONENTS
// ================================================

function FastLink({
  label,
  route,
  icon,
}: {
  label: string;
  route: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={route}
      className="group relative inline-flex items-center px-4 py-2 -ml-4 outline-none overflow-hidden transition-transform duration-75 active:scale-[0.97]"
    >
      {/* Top border (Left to Right) */}
      <span className="absolute top-0 left-0 h-[1px] bg-primary w-0 transition-all duration-75 ease-linear delay-75 group-hover:delay-0 group-hover:w-full z-10" />
      
      {/* Right border (Top to Bottom) */}
      <span className="absolute top-0 right-0 w-[1px] bg-primary h-0 transition-all duration-75 ease-linear delay-0 group-hover:delay-75 group-hover:h-full z-10" />
      
      {/* Bottom border (Right to Left) */}
      <span className="absolute bottom-0 right-0 h-[1px] bg-primary w-0 transition-all duration-75 ease-linear delay-75 group-hover:delay-0 group-hover:w-full z-10" />
      
      {/* Left border (Bottom to Top) */}
      <span className="absolute bottom-0 left-0 w-[1px] bg-primary h-0 transition-all duration-75 ease-linear delay-0 group-hover:delay-75 group-hover:h-full z-10" />
      
      {/* Background Fill (turns yellow) */}
      <div className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-75 ease-out delay-0 group-hover:delay-150 group-hover:opacity-100 z-0" />
      
      {/* Text */}
      <span className="relative z-20 flex items-center text-sm font-body font-medium text-foreground/60 transition-colors duration-75 delay-0 group-hover:delay-150 group-hover:text-primary-foreground">
        {icon && <span className="flex items-center mr-2">{icon}</span>}
        {label}
      </span>
    </Link>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-md">
      <label className="block font-mono text-xs font-bold text-foreground/70 uppercase mb-3 tracking-widest">
        Subscribe for Updates
      </label>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="group flex w-full relative"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="min-w-0 flex-1 min-h-[56px] bg-background border border-border px-6 font-body text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors duration-150 ease-out"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex w-[88px] shrink-0 items-center justify-center bg-primary text-primary-foreground border border-primary transition-all duration-150 ease-out hover:bg-primary/90 active:scale-[0.97] active:border-transparent cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

function BackToTop() {
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      className="group flex h-10 items-center font-mono text-xs font-bold uppercase tracking-wide text-foreground/70 outline-none transition-all duration-150 ease-out hover:text-primary active:scale-[0.97]"
    >
      <span className="mr-2 transition-transform duration-150 ease-out group-hover:-translate-y-1">
        ↑
      </span>
      Back to top
    </button>
  );
}

export function Footer() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Staggered Column Reveal
    gsap.from(".footer-reveal", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    // 2. Delight Budget: Watermark clip-path reveal when reaching bottom
    gsap.fromTo(watermarkRef.current, 
      { clipPath: "inset(100% 0 0 0)" },
      { 
        clipPath: "inset(0% 0 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  if (pathname?.startsWith("/color-combo/") && pathname !== "/color-combo") {
    return null;
  }

  return (
    <footer ref={containerRef} className="relative w-full bg-muted border-t border-border mt-auto overflow-hidden">
      <div className="mx-auto max-w-7xl pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Row: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-32">
          <div className="footer-reveal flex items-center gap-6">
            <Logo />
            <Link href="/" className="font-display text-4xl font-bold text-foreground tracking-tight transition-all duration-150 ease-out hover:text-primary active:scale-[0.97]">
              MayaKit
            </Link>
          </div>
          <div className="footer-reveal w-full lg:w-auto">
            <Newsletter />
          </div>
        </div>

        {/* Middle Row: Links Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 lg:gap-16 mb-32">
          {NAVIGATION.map((group) => (
            <div className="footer-reveal" key={group.section}>
              <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                {group.section}
              </h3>
              <div className="flex flex-col items-start gap-4">
                {group.links.map((link) => (
                  <FastLink key={link.label} {...link} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal relative pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6 z-20">
          <div className="text-xs text-foreground/50 font-mono text-center sm:text-left uppercase tracking-wider">
            © {new Date().getFullYear()} MayaKit. Open source.
          </div>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-xs text-foreground/50 font-mono uppercase tracking-wider transition-colors duration-150 ease-out hover:text-primary">
              Terms
            </Link>
            <BackToTop />
          </div>
        </div>
      </div>

      {/* Watermark at the absolute bottom (The Delight Budget) */}
      <div 
        ref={watermarkRef}
        className="absolute bottom-[-2vw] left-0 w-full flex justify-center pointer-events-none select-none z-0 opacity-[0.03]"
      >
        <span className="font-display font-black text-[18vw] leading-none text-foreground tracking-tighter uppercase">
          MAYAKIT
        </span>
      </div>
    </footer>
  );
}
