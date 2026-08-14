"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const sora = { className: "font-sora" };
const manrope = { className: "font-manrope" };

export default function MobilityAppDemo({ palette }: { palette: Palette }) {
  const [purple, lavender] = palette.colors; // purple: #59058E, lavender: #DDCDE8
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // High-Velocity / Brake Animations (Momentum)
    // We use expo.out for the sharp braking effect, mixed with blur

    // Velocity Reveals
    gsap.utils.toArray(".velocity-reveal").forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 100, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        }
      );
    });

    // Staggered Bottom Sheet Cards
    gsap.fromTo(".bottom-sheet-card",
      { y: 150, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".bottom-sheet-grid",
          start: "top 80%",
        }
      }
    );

    // Continuous Scrolling Map Pattern
    gsap.to(".map-bg", {
      backgroundPosition: "0px 1000px",
      duration: 20,
      ease: "none",
      repeat: -1
    });

    // Looping Cars Animation
    gsap.fromTo(".looping-car", 
      { x: "-20vw" }, 
      { x: "120vw", duration: 1.5, ease: "none", repeat: -1, stagger: 0.5 }
    );

    // The Route Line (SVG Path drawing on scroll)
    gsap.to(".route-line-path", {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".route-section",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    // Map Pins dropping with sharp overshoot
    gsap.utils.toArray(".map-pin").forEach((el: any) => {
      gsap.fromTo(el,
        { y: -100, opacity: 0, scale: 0 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          ease: "back.out(2)", // Map pins specifically have a physical drop-and-stick feel
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });

    // Global Coverage Network Animations
    gsap.to(".coverage-line", {
      strokeDashoffset: 0,
      duration: 1,
      ease: "none",
      repeat: -1
    });

    gsap.utils.toArray(".coverage-ping").forEach((ping: any, i: number) => {
      gsap.fromTo(ping,
        { scale: 0, opacity: 0.8 },
        { scale: 3, opacity: 0, duration: 2, repeat: -1, ease: "power2.out", delay: i * 0.2 }
      );
    });

    gsap.fromTo(".radar-sweep", 
      { left: "-30%" },
      { left: "130%", duration: 3, repeat: -1, ease: "none" }
    );

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`relative min-h-screen w-full overflow-hidden ${manrope.className} ${sora.className} selection:bg-[${purple}] selection:text-[${lavender}]`}
      style={{
        backgroundColor: lavender,
        color: purple,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Sora:wght@300;400;600;700;800&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        
        .map-bg {
          background-image: linear-gradient(${purple}15 1px, transparent 1px), linear-gradient(90deg, ${purple}15 1px, transparent 1px);
          background-size: 80px 80px;
          background-position: center center;
        }

        .velocity-btn {
          background-color: ${purple};
          color: ${lavender};
          border-radius: 12px;
          padding: 1.25rem 2.5rem;
          font-weight: 800;
          font-family: var(--font-sora), sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.2s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .velocity-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -10px ${purple}80;
        }
        .velocity-btn:active {
          transform: translateY(2px) scale(0.98);
        }

        .bottom-sheet {
          background-color: ${lavender};
          border-radius: 40px 40px 0 0;
          box-shadow: 0 -20px 40px ${purple}10;
        }
      `}} />

      {/* FIXED MAP BACKGROUND */}
      <div className="fixed inset-0 map-bg z-0 pointer-events-none opacity-30" />

      {/* NAVIGATION */}
      <header className="px-6 md:px-12 py-8 flex justify-between items-center w-full relative z-50">
        <div className="font-sora text-4xl font-black tracking-tighter italic">
          SHIFT
        </div>
        <nav className="hidden md:flex items-center gap-8 font-bold">
          <a href="#" className="hover:opacity-70 transition-opacity">Ride</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Drive</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Business</a>
        </nav>
        <button className="hidden md:block velocity-btn px-6 py-3 text-sm">Download App</button>
      </header>

      {/* HERO SECTION (App Interface Bleed) */}
      <section className="relative w-full min-h-[90vh] px-6 md:px-12 flex flex-col justify-end pb-32 z-10">
        {/* Animated Looping Vehicles Decorator */}
        <div className="absolute top-[20%] left-0 w-full h-64 pointer-events-none opacity-30 overflow-visible z-0">
          {/* Car 1 */}
          <div className="looping-car absolute top-[10%] flex items-center" style={{ color: purple }}>
             <svg width="128" height="64" viewBox="0 0 64 32" fill="currentColor">
               <path d="M52.5 10c-.7-3.4-3.5-6-7-6.5L34.2 2H18c-2.2 0-4.2 1.3-5 3.3L8 14H4c-1.1 0-2 .9-2 2v6h3.2c.5 3.4 3.4 6 6.8 6s6.3-2.6 6.8-6h26.4c.5 3.4 3.4 6 6.8 6s6.3-2.6 6.8-6H62v-7c0-2.2-1.8-4-4-4h-2l-3.5-9zm-40.5 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm40 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm-20-10V6l10.3 1c1.5.1 2.8 1.1 3.2 2.5l1.6 4.5H32zm-4 0H15l3-6h10v6z"/>
             </svg>
          </div>
          {/* Car 2 */}
          <div className="looping-car absolute top-[50%] flex items-center" style={{ color: purple }}>
             <svg width="100" height="50" viewBox="0 0 64 32" fill="currentColor">
               <path d="M52.5 10c-.7-3.4-3.5-6-7-6.5L34.2 2H18c-2.2 0-4.2 1.3-5 3.3L8 14H4c-1.1 0-2 .9-2 2v6h3.2c.5 3.4 3.4 6 6.8 6s6.3-2.6 6.8-6h26.4c.5 3.4 3.4 6 6.8 6s6.3-2.6 6.8-6H62v-7c0-2.2-1.8-4-4-4h-2l-3.5-9zm-40.5 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm40 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm-20-10V6l10.3 1c1.5.1 2.8 1.1 3.2 2.5l1.6 4.5H32zm-4 0H15l3-6h10v6z"/>
             </svg>
          </div>
          {/* Bike */}
          <div className="looping-car absolute top-[80%] flex items-center" style={{ color: purple }}>
             <svg width="80" height="40" viewBox="0 0 64 32" fill="currentColor">
               <path d="M46 16c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm-28-9c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm26.7-11.5L40 4h-8v2h6.2l3.4 6.8-5.6.2-4.5-9h-9.8l-4.5 9-6.3-3.2-1 1.8 7 3.5 1.7-3.4 2.8 5.6c-2.3 1.5-3.8 4.1-3.8 7.1h2c0-3.3 2.7-6 6-6h9.5l4-8h4.5v-2h-3.3l1.8-3.6z"/>
             </svg>
          </div>
        </div>

        <div className="max-w-4xl">
          <h1 className="velocity-reveal font-sora text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.9] tracking-tighter mb-8 uppercase italic" data-delay="0.1">
            Move <br/> at your <br/> own pace.
          </h1>
          
          {/* Oversized "Where to?" Mockup */}
          <div className="velocity-reveal w-full max-w-2xl bg-white rounded-3xl p-4 shadow-2xl flex items-center gap-4 border-2" style={{ borderColor: `${purple}20`, color: purple }} data-delay="0.2">
            <div className="w-3 h-3 rounded-full ml-2" style={{ backgroundColor: purple }} />
            <input type="text" placeholder="Where to?" className="flex-1 text-2xl font-bold font-sora bg-transparent outline-none placeholder:opacity-40" />
            <button className="velocity-btn px-8 py-4 rounded-xl">Go</button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / THE ROUTE */}
      <section className="route-section bottom-sheet relative w-full pt-32 pb-48 px-6 md:px-12 z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
          
          <div className="lg:w-1/3">
            <h2 className="velocity-reveal font-sora text-5xl font-black uppercase italic mb-6">The <br/> Route.</h2>
            <p className="velocity-reveal text-xl font-medium opacity-80 mb-12">Three steps. Zero friction. Just tap and move.</p>
          </div>

          <div className="lg:w-2/3 relative">
            {/* The SVG Route Line */}
            <div className="absolute left-8 top-12 bottom-0 w-2 z-0 hidden md:block">
               <svg width="8" height="100%" className="overflow-visible">
                 <line 
                   x1="4" y1="0" x2="4" y2="100%" 
                   stroke={purple} strokeWidth="4" strokeDasharray="16 16" 
                   className="route-line-path"
                   style={{ strokeDasharray: "2000", strokeDashoffset: "2000" }} 
                 />
               </svg>
            </div>

            <div className="flex flex-col gap-24 relative z-10 md:ml-16">
              {[
                { step: "01", title: "Set Destination", desc: "Type your drop-off point or pin it on the map. We'll instantly show you the fastest route." },
                { step: "02", title: "Choose Your Ride", desc: "From standard sedans to luxury SUVs, pick the vehicle that fits your vibe and budget." },
                { step: "03", title: "Meet Your Driver", desc: "Track their arrival in real-time. Jump in, sit back, and enjoy the ride." }
              ].map((item, i) => (
                <div key={i} className="velocity-reveal relative flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-sora font-black text-2xl flex-shrink-0" style={{ backgroundColor: purple, color: lavender }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-sora text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-xl opacity-80 font-medium max-w-md">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RIDE OPTIONS (Bottom Sheet Carousel emulation) */}
      <section className={`w-full py-32 px-6 md:px-12 z-20 relative bg-[${purple}]`} style={{ backgroundColor: purple, color: lavender }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="velocity-reveal font-sora text-5xl md:text-7xl font-black uppercase italic leading-none">Your <br/> Fleet.</h2>
            <div className="velocity-reveal hidden md:flex gap-4">
              <button className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:opacity-70 transition-opacity" style={{ borderColor: lavender }}>←</button>
              <button className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:opacity-70 transition-opacity" style={{ borderColor: lavender }}>→</button>
            </div>
          </div>

          <div className="bottom-sheet-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Shift X", time: "3 min", price: "$12.40", desc: "Affordable, everyday rides for up to 4 people.", img: "🚗" },
              { name: "Shift XL", time: "5 min", price: "$18.50", desc: "SUVs and minivans for groups up to 6 people.", img: "🚙" },
              { name: "Shift Black", time: "8 min", price: "$28.00", desc: "Premium luxury vehicles with top-rated drivers.", img: "🏎️" }
            ].map((car, i) => (
              <div key={i} className="bottom-sheet-card bg-white p-8 rounded-[32px] flex flex-col justify-between" style={{ color: purple }}>
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-sora text-3xl font-black italic uppercase">{car.name}</h3>
                    <div className={`font-bold bg-[${purple}]/10 px-4 py-2 rounded-full`} style={{ backgroundColor: `${purple}20` }}>{car.time}</div>
                  </div>
                  <div className="text-7xl mb-8">{car.img}</div>
                  <p className="font-medium opacity-80 mb-8">{car.desc}</p>
                </div>
                <div className="flex justify-between items-center border-t-2 pt-6" style={{ borderColor: `${purple}20` }}>
                  <div className="font-sora font-bold text-2xl">{car.price}</div>
                  <button className="font-bold underline hover:opacity-70 transition-opacity">Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER SIGN UP (Split Screen Duotone) */}
      <section className="w-full relative z-20">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center bottom-sheet rounded-none shadow-none">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-8 velocity-reveal uppercase tracking-widest" style={{ backgroundColor: `${purple}15` }}>
              Drive with Shift
            </div>
            <h2 className="velocity-reveal font-sora text-5xl md:text-7xl font-black leading-[0.9] uppercase italic mb-8">
              Earn on <br/> your terms.
            </h2>
            <p className="velocity-reveal text-xl font-medium opacity-80 mb-12 max-w-md">
              Complete flexibility. Weekly payouts. Instant deposits. Turn your vehicle into an earning engine whenever you want.
            </p>
            <div className="velocity-reveal">
              <button className="velocity-btn">Apply to Drive</button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto relative overflow-hidden">
             <img 
               src="https://picsum.photos/seed/538eda81/1200/800" 
               alt="Driver in car"
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </section>

      {/* GLOBAL COVERAGE (Dot Grid Map) */}
      <section className="py-32 px-6 md:px-12 w-full text-center relative overflow-hidden z-20" style={{ backgroundColor: lavender }}>
        <h2 className="velocity-reveal font-sora text-4xl md:text-5xl font-black uppercase italic mb-6">Operating in 150+ Cities</h2>
        <p className="velocity-reveal text-xl opacity-80 font-medium mb-16">Wherever you're going, Shift is already there.</p>
        
        <div className="relative w-full max-w-4xl mx-auto h-[400px]">
          {/* Abstract Dot Grid Map Background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(${purple} 2px, transparent 2px)`,
            backgroundSize: '20px 20px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
          }} />

          {/* Radar Sweep */}
          <div className="radar-sweep absolute top-0 bottom-0 w-48 blur-2xl opacity-40 z-0 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${purple}, transparent)` }} />
          
          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.5 }}>
            {[
              { x1: '30%', y1: '20%', x2: '50%', y2: '15%' },
              { x1: '50%', y1: '15%', x2: '70%', y2: '45%' },
              { x1: '70%', y1: '45%', x2: '80%', y2: '30%' },
              { x1: '70%', y1: '45%', x2: '40%', y2: '60%' },
              { x1: '40%', y1: '60%', x2: '20%', y2: '70%' },
              { x1: '20%', y1: '70%', x2: '30%', y2: '20%' }
            ].map((line, i) => (
              <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={purple} strokeWidth="2" strokeDasharray="8 8" className="coverage-line" style={{ strokeDashoffset: "100" }} />
            ))}
          </svg>

          {/* Animated Pins with Sonar Pings */}
          {[
            { top: '20%', left: '30%' },
            { top: '45%', left: '70%' },
            { top: '60%', left: '40%' },
            { top: '30%', left: '80%' },
            { top: '70%', left: '20%' },
            { top: '15%', left: '50%' }
          ].map((pos, i) => (
            <div key={i} className="map-pin absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ top: pos.top, left: pos.left }}>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="coverage-ping absolute inset-0 rounded-full" style={{ backgroundColor: purple }} />
                <div className="w-3 h-3 rounded-full border-2 relative z-10" style={{ backgroundColor: lavender, borderColor: purple }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSTANTIAL FOOTER */}
      <footer className="pt-32 pb-12 px-6 md:px-12 w-full relative z-30" style={{ backgroundColor: purple, color: lavender }}>
        <div className="max-w-7xl mx-auto">
          {/* Huge CTA */}
          <div className="velocity-reveal text-center mb-32">
            <h2 className="font-sora text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8">Shift Now</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className={`velocity-btn flex items-center justify-center gap-4 bg-white text-[${purple}]`} style={{ color: purple }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.76.04 3.19.78 4.07 2.05-3.41 2.05-2.84 5.92.42 7.23-.74 1.83-1.68 3.55-3.16 3.65zM12.01 7.25c-.04-2.28 1.95-4.22 4.19-4.25.13 2.4-2.12 4.38-4.19 4.25z"/></svg>
                App Store
              </button>
              <button className={`velocity-btn flex items-center justify-center gap-4 bg-white text-[${purple}]`} style={{ color: purple }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h15c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-15c-.83 0-1.5-.67-1.5-1.5zM12 11h-2V9h2V7h2v2h2v2h-2v2h-2v-2z"/></svg>
                Google Play
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24 border-t border-[${lavender}]/20 pt-16`} style={{ borderColor: `${lavender}40` }}>
            <div className="col-span-2">
              <div className="font-sora text-3xl font-black italic mb-6">SHIFT</div>
              <p className="font-medium opacity-70 max-w-sm mb-6">
                Moving cities forward. Fast, reliable, and everywhere you need to be.
              </p>
            </div>
            
            <div>
              <h4 className="font-sora font-bold uppercase tracking-widest mb-6 opacity-50 text-xs">Products</h4>
              <ul className="flex flex-col gap-4 font-bold">
                <li><a href="#" className="hover:opacity-60 transition-opacity">Ride</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Drive</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Business</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Shift Pass</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sora font-bold uppercase tracking-widest mb-6 opacity-50 text-xs">Company</h4>
              <ul className="flex flex-col gap-4 font-bold">
                <li><a href="#" className="hover:opacity-60 transition-opacity">About</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Careers</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Newsroom</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Investors</a></li>
              </ul>
            </div>

            <div className="col-span-2">
              <h4 className="font-sora font-bold uppercase tracking-widest mb-6 opacity-50 text-xs">Top Cities</h4>
              <ul className="grid grid-cols-2 gap-4 font-bold">
                <li><a href="#" className="hover:opacity-60 transition-opacity">New York</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">London</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Paris</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Tokyo</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Berlin</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Dubai</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t opacity-50 font-bold text-sm" style={{ borderColor: `${lavender}20` }}>
            <p>© {new Date().getFullYear()} Shift Technologies Inc.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Accessibility</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
