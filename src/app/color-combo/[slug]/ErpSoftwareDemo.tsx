"use client";

import React, { useRef, useEffect } from "react";
import { Palette } from "@/data/palettes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const outfit = { className: "font-outfit" };
const dmSans = { className: "font-dm-sans" };

export default function ErpSoftwareDemo({ palette }: { palette: Palette }) {
  const [amber, rust] = palette.colors; // amber: #FFE089, rust: #94422A
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Reveals
    gsap.fromTo(".reveal-up", 
      { opacity: 0, y: 60, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1, 
        stagger: 0.15, 
        duration: 1.2, 
        ease: "back.out(1.1)", 
        scrollTrigger: { trigger: ".hero-section" }
      }
    );

    // 2. Active Dashboard Simulation (Continuous Loop)
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
    
    // Fake cursor moves to the fake button
    tl.to(".fake-cursor", { x: 180, y: -20, duration: 1.2, ease: "power2.inOut" })
      // Cursor "clicks" (scales down slightly)
      .to(".fake-cursor", { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
      // Button responds to click
      .to(".fake-btn", { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, backgroundColor: amber }, "<")
      // Loading bar fills up rapidly
      .to(".loading-bar", { width: "100%", duration: 0.8, ease: "power3.inOut" })
      // Data charts shuffle dramatically
      .to(".chart-bar", { 
        height: () => Math.random() * 80 + 20 + "%", 
        duration: 0.8, 
        stagger: 0.05, 
        ease: "back.out(1.1)" 
      })
      // Cursor moves away
      .to(".fake-cursor", { x: 0, y: 0, duration: 1.5, ease: "power2.inOut" }, "+=0.5")
      // Reset loading bar instantly for next loop
      .set(".loading-bar", { width: "0%" });

    // 3. Sticky Scroll Modules
    // We detect when each scroll-text section crosses the center of the screen
    gsap.utils.toArray(".scroll-text-section").forEach((section: any, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => updateGraphic(i),
        onEnterBack: () => updateGraphic(i)
      });
    });

    function updateGraphic(index: number) {
      // Fade out all
      gsap.to(".graphic-state", { opacity: 0, scale: 0.9, y: 20, duration: 0.4, ease: "power2.out" });
      // Bring in the active one with a soft settle
      gsap.to(`.graphic-state-${index}`, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.1)", delay: 0.1 });
    }

    // 4. Immersive Testimonial Reveal
    gsap.fromTo(".test-quote", 
      { opacity: 0, y: 50, rotationX: -15, transformOrigin: "0% 100%" },
      { 
        opacity: 1, y: 0, rotationX: 0, 
        stagger: 0.1, 
        duration: 1.2, 
        ease: "back.out(1.1)", 
        scrollTrigger: { 
          trigger: ".testimonial-section", 
          start: "top 60%" 
        }
      }
    );

    gsap.fromTo(".test-author",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.6, scrollTrigger: { trigger: ".testimonial-section", start: "top 60%" }}
    );

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${dmSans.className} ${outfit.className} selection:bg-[${rust}] selection:text-[${amber}]`}
      style={{
        backgroundColor: amber,
        color: rust,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Outfit:wght@300;400;500;700;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-dm-sans { font-family: 'DM Sans', sans-serif; }
        
        .soft-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .soft-hover:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .soft-hover:active {
          transform: translateY(2px) scale(0.98);
        }

        .pill-btn {
          background-color: ${rust};
          color: ${amber};
          border-radius: 999px;
          padding: 1rem 2.5rem;
          font-weight: 700;
          display: inline-block;
          text-align: center;
        }
        
        /* Colossal masked footer text */
        .footer-mask {
          background-image: url('https://picsum.photos/seed/ed4a4737/1200/800');
          background-size: 100%;
          background-position: center;
          -webkit-background-clip: text;
          color: transparent;
          filter: grayscale(100%) contrast(1.4);
          transition: filter 0.8s ease, background-size 5s ease;
          line-height: 0.8;
        }
        .footer-mask:hover {
          filter: grayscale(0%) contrast(1);
          background-size: 110%;
        }

        /* Hide scrollbar for clean sticky section */
        ::-webkit-scrollbar { display: none; }
      `}} />

      {/* NAVIGATION */}
      <header className="px-6 md:px-12 py-8 flex justify-between items-center w-full relative z-50">
        <div className="font-outfit text-3xl font-black tracking-tighter flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full bg-[${rust}]`} style={{ backgroundColor: rust }} />
          SYNERGY
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
          <a href="#" className="hover:opacity-60 transition-opacity">Platform</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Solutions</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Customers</a>
        </nav>

        <button className="soft-hover font-bold border-2 rounded-full px-6 py-2" style={{ borderColor: rust }}>
          Book Demo
        </button>
      </header>

      {/* 1. LAYERED OVERLAPPING HERO */}
      <section className="hero-section relative w-full min-h-[90vh] pt-12 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b-2" style={{ borderColor: `${rust}20` }}>
        
        {/* Massive Background Typography */}
        <h1 className="font-outfit text-[18vw] leading-[0.8] font-black tracking-tighter whitespace-nowrap opacity-10 absolute top-32 -left-10 z-0 select-none pointer-events-none mix-blend-multiply">
          ENTERPRISE
        </h1>
        <h1 className="font-outfit text-[18vw] leading-[0.8] font-black tracking-tighter whitespace-nowrap opacity-10 absolute bottom-12 -right-10 z-0 select-none pointer-events-none mix-blend-multiply">
          OPERATIONS
        </h1>

        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2">
            <h2 className="reveal-up font-outfit text-6xl md:text-8xl font-black leading-[0.95] tracking-tight mb-8">
              The fabric <br/> of modern <br/> business.
            </h2>
            <p className="reveal-up text-xl md:text-2xl font-medium opacity-80 mb-10 max-w-md leading-relaxed">
              We don't just build software. We engineer the connective tissue that aligns your entire organization.
            </p>
            <div className="reveal-up">
              <button className="pill-btn soft-hover text-lg shadow-xl" style={{ boxShadow: `0 20px 40px -10px ${rust}60` }}>
                Explore Platform
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end reveal-up relative z-20">
            {/* ACTIVE DASHBOARD UI SIMULATION */}
            <div className="relative w-full max-w-md rounded-[40px] p-8 shadow-2xl soft-hover" style={{ backgroundColor: rust, color: amber, boxShadow: `0 30px 60px -20px ${rust}80` }}>
              
              <div className="flex justify-between items-center mb-8">
                <div className="w-1/2 h-6 rounded-full opacity-40" style={{ backgroundColor: amber }} />
                {/* Interactive Target Button */}
                <div className="fake-btn w-24 h-10 rounded-full flex items-center justify-center opacity-80" style={{ backgroundColor: amber }}>
                  <div className="w-12 h-2 rounded-full" style={{ backgroundColor: rust }} />
                </div>
              </div>

              {/* Dynamic Loading Bar */}
              <div className="w-full h-3 rounded-full mb-10 overflow-hidden" style={{ backgroundColor: `${amber}20` }}>
                <div className="loading-bar h-full w-0 rounded-full" style={{ backgroundColor: amber }} />
              </div>

              {/* Shuffling Charts */}
              <div className="flex gap-4 h-48 items-end">
                {[40, 70, 50, 90, 30, 80].map((h, i) => (
                  <div key={i} className="chart-bar flex-1 rounded-t-xl opacity-90" style={{ height: `${h}%`, backgroundColor: amber }} />
                ))}
              </div>
              
              {/* Fake Cursor SVG */}
              <div className={`fake-cursor absolute top-20 left-12 z-50 drop-shadow-2xl text-[${amber}]`} style={{ filter: `drop-shadow(0 10px 10px ${amber}90)` }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke={rust} strokeWidth="2">
                  <path d="M4 2l16 11-7 2 4 7-3 2-4-7-5 4z" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. HUMAN FIRST SECTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative aspect-square rounded-full overflow-hidden soft-hover">
          <img 
            src="https://picsum.photos/seed/bce0359b/1200/800" 
            alt="Collaborative Team"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="font-outfit text-5xl md:text-6xl font-bold mb-8">Software built for humans.</h2>
          <p className="text-xl md:text-2xl opacity-80 leading-relaxed mb-8">
            Behind every data point is a person doing their best work. Synergy is designed to get out of the way, so your team can focus on what actually matters.
          </p>
          <a href="#" className="font-bold text-xl border-b-2 hover:opacity-60 transition-opacity pb-1" style={{ borderColor: rust }}>
            Read our philosophy →
          </a>
        </div>
      </section>

      {/* 3. STICKY-SCROLL FEATURE TIMELINE */}
      <section className="relative w-full flex flex-col md:flex-row border-y-2" style={{ borderColor: `${rust}20`, backgroundColor: rust, color: amber }}>
        
        {/* Left Side: Scrolling Text Modules */}
        <div className="w-full md:w-1/2 py-24 md:py-0">
          {[
            { title: "Financial Ledger", desc: "Automate reconciliation, manage multi-currency ledgers, and close your books 4x faster with AI-assisted auditing." },
            { title: "Human Resources", desc: "Onboarding, benefits administration, and global payroll unified in one beautiful dashboard." },
            { title: "Supply Chain", desc: "Real-time stock tracking across multiple warehouses with predictive reordering algorithms." }
          ].map((feature, i) => (
            <div key={i} className="scroll-text-section min-h-[70vh] flex flex-col justify-center px-12 md:px-24">
              <div className="text-sm font-bold uppercase tracking-widest opacity-50 mb-4">Module 0{i + 1}</div>
              <h3 className="font-outfit text-5xl md:text-6xl font-bold mb-6">{feature.title}</h3>
              <p className="text-xl md:text-2xl opacity-80 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Graphic Area */}
        <div className="w-full md:w-1/2 sticky top-0 h-[50vh] md:h-screen flex items-center justify-center p-6 md:p-16 border-l-2" style={{ borderColor: `${amber}20` }}>
          <div className="relative w-full aspect-square max-h-[600px] rounded-[60px] p-8 overflow-hidden shadow-2xl border-4" style={{ backgroundColor: amber, color: rust, borderColor: `${amber}40` }}>
            
            {/* Graphic State 0: Finance */}
            <div className="graphic-state graphic-state-0 absolute inset-8 flex flex-col gap-6">
              <div className="w-3/4 h-12 rounded-full opacity-20" style={{ backgroundColor: rust }} />
              <div className="flex gap-4">
                <div className="w-1/2 aspect-square rounded-3xl opacity-10" style={{ backgroundColor: rust }} />
                <div className="w-1/2 aspect-square rounded-3xl opacity-30" style={{ backgroundColor: rust }} />
              </div>
            </div>

            {/* Graphic State 1: HR */}
            <div className="graphic-state graphic-state-1 absolute inset-8 flex flex-col items-center justify-center gap-6 opacity-0 scale-90">
              <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ border: `8px solid ${rust}` }}>
                <div className="w-32 h-32 rounded-full opacity-30" style={{ backgroundColor: rust }} />
              </div>
              <div className="w-48 h-6 rounded-full opacity-20" style={{ backgroundColor: rust }} />
            </div>

            {/* Graphic State 2: Supply Chain */}
            <div className="graphic-state graphic-state-2 absolute inset-8 grid grid-cols-3 gap-4 opacity-0 scale-90">
              {[1,2,3,4,5,6,7,8,9].map(i => (
                <div key={i} className="rounded-xl opacity-20" style={{ backgroundColor: rust, height: `${(i % 3 + 1) * 30}%`, marginTop: 'auto' }} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. IMMERSIVE TESTIMONIAL (FULL BLEED) */}
      <section className="testimonial-section relative w-full min-h-[90vh] flex items-center p-6 md:p-24 overflow-hidden">
        {/* Massive Background Image Duotone */}
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://picsum.photos/seed/fb3e6767/1200/800" 
            alt="CEO Portrait"
            className="w-full h-full object-cover grayscale contrast-125 object-top"
          />
          <div className="absolute inset-0 mix-blend-multiply opacity-100" style={{ backgroundColor: rust }} />
          <div className="absolute inset-0 mix-blend-screen opacity-100" style={{ backgroundColor: amber }} />
          {/* Gradient fade to ensure text readability */}
          <div className={`absolute inset-0 bg-gradient-to-r from-[${rust}] to-transparent opacity-80 mix-blend-normal`} style={{ backgroundImage: `linear-gradient(to right, ${rust} 40%, transparent)` }} />
        </div>

        {/* Staggered Quote Text */}
        <div className="relative z-10 max-w-5xl" style={{ color: amber }}>
          <h2 className="font-outfit text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-16 tracking-tight">
            <span className="block overflow-hidden pb-2"><span className="block test-quote">"Synergy didn't just</span></span>
            <span className="block overflow-hidden pb-2"><span className="block test-quote">upgrade our software.</span></span>
            <span className="block overflow-hidden pb-2"><span className="block test-quote">It fundamentally rewired</span></span>
            <span className="block overflow-hidden pb-2"><span className="block test-quote">how we operate."</span></span>
          </h2>
          
          <div className="test-author font-bold text-2xl md:text-3xl tracking-tight border-l-4 pl-6" style={{ borderColor: amber }}>
            ELENA ROSTOVA <br/>
            <span className="opacity-70 text-lg md:text-xl font-normal font-outfit mt-2 block">SVP Global Operations, NexusTech</span>
          </div>
        </div>
      </section>

      {/* 5. COLOSSAL MASKED FOOTER */}
      <footer className="w-full pt-32 pb-12 px-6 md:px-12 flex flex-col justify-between min-h-[80vh]">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="w-full md:w-1/2">
            <h3 className="font-outfit text-4xl font-bold mb-6">Ready to unify?</h3>
            <p className="text-xl opacity-80 mb-8 max-w-sm">Join the 10,000+ modern teams operating on Synergy.</p>
            <button className="pill-btn soft-hover">Start Free Trial</button>
          </div>
          
          <div className="w-full md:w-1/2 flex gap-16 md:justify-end font-bold text-lg">
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="hover:opacity-60 transition-opacity">Platform</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Solutions</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Pricing</a></li>
            </ul>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="hover:opacity-60 transition-opacity">About</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Careers</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Contact</a></li>
            </ul>
          </div>
        </div>

        <div>
          {/* The Colossal Mask */}
          <div className="w-full overflow-hidden mb-12">
            <h1 className="footer-mask font-outfit text-[22vw] font-black tracking-tighter uppercase text-center select-none cursor-crosshair">
              SYNERGY
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between font-bold text-sm uppercase tracking-widest opacity-60">
            <div>© {new Date().getFullYear()} Synergy Inc.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
