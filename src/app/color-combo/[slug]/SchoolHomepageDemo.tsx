"use client";

import React, { useEffect } from "react";
import { Palette } from "@/data/palettes";

// Lightweight IntersectionObserver hook for native scroll reveals
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in-view", "true");
            // Optional: Unobserve if we only want it to animate once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-target");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

interface SchoolHomepageDemoProps {
  palette: Palette;
}

export default function SchoolHomepageDemo({ palette }: SchoolHomepageDemoProps) {
  const [lightBg, darkText] = palette.colors;
  useScrollReveal();

  return (
    <div 
      className="min-h-screen font-sans selection:bg-[#024223] selection:text-[#C1DFEA] overflow-x-hidden"
      style={{
        backgroundColor: lightBg,
        color: darkText,
        "--ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* Interaction primitives */
        .school-btn {
          transition: transform 160ms var(--ease-out);
          display: inline-block;
        }
        .school-btn:active {
          transform: scale(0.97);
        }
        
        /* Reveal animation primitives */
        .reveal-target {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
          will-change: opacity, transform;
        }
        .reveal-target[data-in-view="true"] {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        /* Stagger utilities */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        
        /* Typography overrides */
        .display-huge {
          font-size: clamp(4rem, 12vw, 12rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
        }
        .display-large {
          font-size: clamp(3rem, 8vw, 8rem);
          line-height: 0.9;
          letter-spacing: -0.03em;
        }

        /* Hover underline reveal */
        .hover-underline {
          position: relative;
        }
        .hover-underline::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 400ms var(--ease-out);
        }
        .hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}} />

      {/* --- ANTI-NAV HEADER --- */}
      <header className="px-6 md:px-12 py-12 md:py-24 border-b-2 flex flex-col md:flex-row justify-between items-start gap-12" style={{ borderColor: darkText }}>
        <div className="reveal-target">
          <div className="font-serif font-bold text-3xl md:text-5xl tracking-tighter mb-2">VERITAS</div>
          <div className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">Academy</div>
        </div>
        
        <nav className="grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4 md:gap-y-6 font-serif text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight">
          <a href="#" className="school-btn reveal-target hover:italic transition-all">Admissions</a>
          <a href="#" className="school-btn reveal-target delay-100 hover:italic transition-all">Academics</a>
          <a href="#" className="school-btn reveal-target delay-200 hover:italic transition-all">Campus</a>
          <a href="#" className="school-btn reveal-target delay-300 hover:italic transition-all">Contact</a>
        </nav>
      </header>

      {/* --- ASYMMETRIC HERO --- */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-32 md:pb-48 relative">
        <h1 className="reveal-target font-serif display-huge font-bold max-w-5xl relative z-20 mix-blend-difference" style={{ color: lightBg }}>
          TRUTH IN <br /> MOTION.
        </h1>
        


        <div className="reveal-target delay-300 mt-[40vh] md:mt-48 max-w-md relative z-20">
          <p className="text-xl md:text-2xl font-medium leading-snug mb-8 p-6 md:p-0 backdrop-blur-md md:backdrop-blur-none" style={{ backgroundColor: `${lightBg}B3` }}>
            A rigorous pursuit of knowledge, grounded in a 130-year tradition of shaping global leaders.
          </p>
          <button className="school-btn px-8 py-5 text-lg font-bold uppercase tracking-widest border-2" style={{ backgroundColor: darkText, color: lightBg, borderColor: darkText }}>
            Apply for Fall
          </button>
        </div>
      </section>

      {/* --- INVERTED COLOR BLOCK: PROGRAMS --- */}
      <section className="px-6 md:px-12 py-32 relative overflow-hidden" style={{ backgroundColor: darkText, color: lightBg }}>
        {/* Oversized Structural Numeral */}
        <div className="absolute -right-10 md:-right-20 -top-10 md:-top-20 font-serif display-huge font-bold opacity-10 select-none pointer-events-none leading-none">
          1894
        </div>

        <div className="reveal-target mb-24 max-w-3xl relative z-10">
          <h2 className="font-serif display-large font-bold mb-8">Academic Rigor.</h2>
          <p className="text-xl md:text-2xl font-medium opacity-80">Our curriculum demands everything. Our faculty gives even more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 relative z-10 border-t-2 pt-16" style={{ borderColor: `${lightBg}40` }}>
          {["The Sciences", "Arts & Humanities", "Global Leadership"].map((title, i) => (
            <div key={title} className={`reveal-target delay-${(i % 3 + 1) * 100} group cursor-pointer school-btn`}>
              <div className="font-sans text-xs font-bold uppercase tracking-widest opacity-60 mb-4">0{i + 1}</div>
              <h3 className="font-serif text-3xl md:text-4xl font-medium mb-6 hover-underline inline-block">{title}</h3>
              <p className="opacity-80 text-lg leading-relaxed max-w-sm">
                Interdisciplinary pathways that challenge conventional wisdom and forge resilient thinkers.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CAMPUS LIFE GALLERY --- */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <div className="reveal-target mb-16">
          <h2 className="font-serif display-large font-bold mb-6">Campus & Culture.</h2>
          <p className="text-xl md:text-2xl font-medium opacity-80 max-w-2xl">
            A vibrant community where academic intensity meets holistic personal growth. 
            From the historic library archives to our state-of-the-art research labs, every corner of our campus is designed to inspire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <div className="reveal-target delay-100 relative w-full aspect-[4/3] group overflow-hidden">
              <img 
                src="https://picsum.photos/seed/7bf97ad6/1200/800" 
                alt="Students studying"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40" style={{ backgroundColor: darkText }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20" style={{ backgroundColor: lightBg }} />
            </div>
            <div className="reveal-target delay-200 relative w-full aspect-square group overflow-hidden">
              <img 
                src="https://picsum.photos/seed/d826b81d/1200/800" 
                alt="Historic Library"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40" style={{ backgroundColor: darkText }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20" style={{ backgroundColor: lightBg }} />
            </div>
          </div>
          
          <div className="flex flex-col gap-8 md:mt-24">
            <div className="reveal-target delay-200 relative w-full aspect-square group overflow-hidden">
              <img 
                src="https://picsum.photos/seed/c29bb37d/1200/800" 
                alt="Campus architecture"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40" style={{ backgroundColor: darkText }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20" style={{ backgroundColor: lightBg }} />
            </div>
            <div className="reveal-target delay-300 relative w-full aspect-[4/3] group overflow-hidden">
              <img 
                src="https://picsum.photos/seed/7fa80c2f/1200/800" 
                alt="Student community"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40" style={{ backgroundColor: darkText }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20" style={{ backgroundColor: lightBg }} />
            </div>
          </div>
        </div>
      </section>

      {/* --- EDITORIAL TESTIMONIAL --- */}
      <section className="px-6 md:px-12 py-32 md:py-48 max-w-7xl mx-auto">
        <div className="relative">
          <svg className="absolute -top-16 -left-8 w-24 h-24 opacity-10 reveal-target" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <h2 className="reveal-target font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] md:leading-[1.1] tracking-tight text-left">
            "Veritas demands a kind of intellectual courage I didn't know I possessed until I was 
            <span className="inline-block mx-4 md:mx-6 translate-y-4 md:translate-y-8 reveal-target delay-200">
              <div className="relative w-20 h-28 md:w-32 md:h-40 -rotate-6 school-btn hover:rotate-0 transition-transform duration-500 shadow-xl border-4" style={{ borderColor: lightBg }}>
                <img 
                  src="https://picsum.photos/seed/6ee491dc/1200/800" 
                  alt="Student Portrait" 
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.4]"
                />
                <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ backgroundColor: darkText }} />
                <div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ backgroundColor: lightBg }} />
              </div>
            </span>
            challenged to defend my thesis before the entire department."
          </h2>
          
          <div className="reveal-target delay-300 mt-20 flex flex-col md:flex-row md:items-center gap-6">
            <div className="hidden md:block w-16 h-0.5" style={{ backgroundColor: darkText }} />
            <div>
              <div className="font-bold text-xl uppercase tracking-wider">Elena Rostova</div>
              <div className="opacity-70 font-serif italic text-xl mt-1">Class of 2025, Applied Physics</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OVERSIZED FOOTER --- */}
      <footer className="pt-24 md:pt-40 pb-12 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: darkText, color: lightBg }}>
        {/* Massive Closing Statement */}
        <div className="reveal-target mb-24 md:mb-40">
          <div className="font-serif display-huge font-bold leading-[0.8] tracking-tighter opacity-10 uppercase select-none">
            Veritas
          </div>
          <div className="font-serif display-huge font-bold leading-[0.8] tracking-tighter uppercase select-none ml-[5%] md:ml-[10%]">
            Academy
          </div>
        </div>

        {/* Multi-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 border-t-2 pt-16 mb-24 relative z-10" style={{ borderColor: `${lightBg}40` }}>
          {[
            {
              title: "Admissions",
              links: ["Apply Now", "Tuition & Aid", "Visit Campus", "Request Info"]
            },
            {
              title: "Academics",
              links: ["Undergraduate", "Graduate Programs", "Continuing Ed", "Course Catalog"]
            },
            {
              title: "Campus Life",
              links: ["Housing & Dining", "Athletics", "Student Clubs", "Health & Wellness"]
            },
            {
              title: "About",
              links: ["Our History", "Faculty Directory", "News & Events", "Contact Us"]
            }
          ].map((col, i) => (
            <div key={col.title} className={`reveal-target delay-${(i % 4) * 100}`}>
              <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-6 opacity-60">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-4 font-serif text-2xl">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="school-btn hover-underline inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom utility bar */}
        <div className="reveal-target delay-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-sans text-xs uppercase tracking-widest font-bold opacity-60 relative z-10">
          <div>© {new Date().getFullYear()} Veritas Academy. All Rights Reserved.</div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="#" className="school-btn hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="school-btn hover:opacity-100 transition-opacity">Accessibility</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
