"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function ClosingCTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".closing-cta-element", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full bg-background py-32 lg:py-48 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Subtle decorative signature element */}
        <div className="absolute top-0 left-4 sm:left-8 w-4 h-4 bg-primary" aria-hidden="true" />
        
        <div className="flex flex-col items-center text-center mt-12">
          
          <h2 className="closing-cta-element font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
            Stop building rigid layouts. <br className="hidden md:block" />
            <span className="text-primary">Start building ecosystems.</span>
          </h2>
          
          <p className="closing-cta-element font-body text-xl text-foreground/70 mb-12 max-w-2xl">
            Drop MayaKit's components directly into your codebase and let your UI breathe. 
            Ready to inject life into your interfaces?
          </p>
          
          <div className="closing-cta-element flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link 
              href="/components" 
              className="flex w-full sm:w-auto min-h-[56px] items-center justify-center rounded-none bg-primary px-10 py-3 font-display font-bold text-primary-foreground transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Explore the Library
            </Link>
            
            <Link 
              href="https://github.com/placeholder/mayakit" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto min-h-[56px] items-center justify-center gap-3 rounded-none border border-border bg-transparent px-10 py-3 font-display font-bold text-foreground transition-all duration-150 ease-out hover:bg-muted active:scale-[0.97]"
            >
              <GithubIcon className="w-5 h-5" />
              View on GitHub
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
