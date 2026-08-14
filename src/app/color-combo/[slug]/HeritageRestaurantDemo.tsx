"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Karma, Hind } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const karma = Karma({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-karma' });
const hind = Hind({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-hind' });

export function HeritageRestaurantDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [warmCream, oliveGreen] = palette.colors; // warmCream = #F1E8DB, oliveGreen = #636B2F

  useGSAP(() => {
    // Welcoming, soft ease
    const hospitalityEase = "cubic-bezier(0.25, 1, 0.5, 1)"; // easeOutQuart

    // 1. "Steam Rising" Soft Reveal for Hero
    gsap.fromTo(".hero-element", 
      { opacity: 0, y: 30, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.2, ease: hospitalityEase, stagger: 0.4 }
    );

    // 2. Soft Photo Reveals (Family Album)
    gsap.utils.toArray(".photo-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.96, filter: "blur(8px)", y: 20 },
        {
          opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
          duration: 2.5,
          ease: hospitalityEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // 3. Staggered Menu Grid (Masonry feel)
    gsap.utils.toArray(".menu-item").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.8,
          ease: hospitalityEase,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        }
      );
    });

    // 4. Gentle Text Reveals for Philosophy / History
    gsap.utils.toArray(".text-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 1.6,
          ease: hospitalityEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // 5. Parallax for background texture/images
    gsap.utils.toArray(".subtle-parallax").forEach((el: any) => {
      gsap.to(el, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${karma.variable} ${hind.variable} selection:bg-[${oliveGreen}] selection:text-[${warmCream}] overflow-x-hidden font-hind`}
      style={{ backgroundColor: warmCream, color: oliveGreen }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-karma { font-family: var(--font-karma), serif; }
        .font-hind { font-family: var(--font-hind), sans-serif; }
        
        .img-wrapper {
          overflow: hidden;
          border-radius: 4px; /* Slight softening of corners */
        }
        .img-wrapper img {
          transition: transform 2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .img-wrapper:hover img {
          transform: scale(1.04); /* Gentle breathing zoom */
        }

        /* Heritage Tactile Button (Soft inverse) */
        .heritage-btn {
          display: inline-block;
          transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1), background-color 400ms ease, color 400ms ease;
          transform-origin: center;
          cursor: pointer;
          border: 1px solid ${oliveGreen};
          padding: 12px 24px;
          border-radius: 2px;
        }
        .heritage-btn:active {
          transform: scale(0.98); 
        }
        .heritage-btn:hover {
          background-color: ${oliveGreen};
          color: ${warmCream};
        }

        /* Soft underline link */
        .soft-link {
          position: relative;
          text-decoration: none;
          padding-bottom: 2px;
          transition: opacity 300ms ease;
        }
        .soft-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: ${oliveGreen};
          opacity: 0.3;
          transition: opacity 300ms ease;
        }
        .soft-link:hover::after {
          opacity: 1;
        }

        .border-olive {
          border-color: rgba(99, 107, 47, 0.2);
        }
      `}} />

      {/* SVG filter removed per user request */}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-8 md:px-16 flex justify-between items-center z-50 mix-blend-multiply">
        <div className="font-karma text-3xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
          Ananda Bhavan
        </div>
        <div className="hidden md:flex gap-12 font-hind text-sm tracking-wider uppercase font-medium">
          <a href="#" className="soft-link">Our Story</a>
          <a href="#" className="soft-link">Menu</a>
          <a href="#" className="soft-link">Philosophy</a>
          <a href="#" className="soft-link">Visit</a>
        </div>
        <button className="heritage-btn font-hind text-xs font-bold tracking-widest uppercase hidden md:block">
          Reservations
        </button>
      </nav>

      {/* 1. HERO / WELCOME */}
      <section className="relative w-full h-[90vh] flex flex-col items-center justify-center pt-20 px-8 md:px-16 z-10 text-center">
         <div className="absolute inset-0 z-0 overflow-hidden">
           <img 
             src="https://picsum.photos/seed/8dceea91/1200/800" 
             className="w-full h-[120%] object-cover subtle-parallax -top-[10%]" 
             alt="Spices and ingredients" 
           />
           <div className={`absolute inset-0 bg-[${warmCream}] opacity-70`} />
         </div>

         <div className="relative z-10 flex flex-col items-center max-w-4xl">
            <span className="font-hind text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-8 hero-element opacity-70">
              Est. 1956
            </span>
            <h1 className="font-karma text-5xl md:text-[6.5vw] font-bold leading-[1.1] hero-element">
               Generations of<br/>Pure Vegetarian Craft.
            </h1>
            <p className="font-hind text-lg md:text-xl font-light mt-12 max-w-2xl hero-element opacity-80 leading-relaxed">
               Welcome to our family table. Rooted in tradition, honoring the earth, and serving authentic sattvic cuisine with unwavering hospitality for over six decades.
            </p>
         </div>
      </section>

      {/* 2. OUR HERITAGE (Family History) */}
      <section className="relative w-full py-32 px-8 md:px-16 z-20">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            <div className="w-full md:w-1/2 relative h-[600px]">
               {/* Overlapping family album feel */}
               <div className={`absolute top-0 left-0 w-3/4 h-[400px] img-wrapper photo-reveal z-10 shadow-xl border border-olive bg-[${warmCream}] p-2`}>
                 <img src="https://picsum.photos/seed/7cc2ce32/1200/800" className="w-full h-full object-cover" alt="Vintage Family Restaurant" />
               </div>
               <div className={`absolute bottom-0 right-0 w-2/3 h-[350px] img-wrapper photo-reveal z-20 shadow-2xl border border-olive bg-[${warmCream}] p-2`} style={{ transform: 'rotate(2deg)' }}>
                 <img src="https://picsum.photos/seed/c9462b7d/1200/800" className="w-full h-full object-cover" alt="Cooking tradition" />
               </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
               <span className="font-hind text-xs tracking-widest uppercase font-bold opacity-60 mb-6 text-reveal">Our Heritage</span>
               <h2 className="font-karma text-4xl md:text-5xl font-bold leading-tight mb-8 text-reveal">
                 A recipe passed down,<br/>a door always open.
               </h2>
               <div className="font-hind text-lg font-light leading-relaxed opacity-80 flex flex-col gap-6 text-reveal">
                 <p>It started with a single spice box and a belief that pure, sattvic food nourishes not just the body, but the soul. In 1956, our grandfather opened Ananda Bhavan with three tables and a menu written daily on a chalkboard.</p>
                 <p>Today, the pots are larger and the dining room has grown, but the hands stirring the dal and the philosophy behind our hospitality remain exactly the same. We treat every guest as if they were visiting our own home.</p>
               </div>
               <div className="mt-12 text-reveal">
                 <button className="heritage-btn font-hind text-sm font-semibold tracking-widest uppercase">
                   Read the full story
                 </button>
               </div>
            </div>

         </div>
      </section>

      {/* 3. SIGNATURE DISHES (Menu Highlights) */}
      <section className="relative w-full py-32 px-8 md:px-16 z-20 border-t border-olive">
         <div className="max-w-7xl mx-auto flex flex-col items-center">
            <span className="font-hind text-xs tracking-widest uppercase font-bold opacity-60 mb-4 text-reveal">The Menu</span>
            <h2 className="font-karma text-4xl md:text-5xl font-bold mb-24 text-reveal text-center">Culinary Signatures</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
               
               {/* Dish 1 */}
               <div className="flex flex-col gap-6 menu-item group">
                   <div className={`w-full aspect-square img-wrapper border border-olive bg-[${warmCream}] p-2 shadow-sm`}>
                     <img src="https://images.unsplash.com/photo-PUsVt3YpziI?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Thali" />
                  </div>
                  <div>
                     <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-karma text-2xl font-bold">The Grand Thali</h3>
                     </div>
                     <p className="font-hind font-light opacity-80 leading-relaxed text-sm">A complete sensory experience featuring twelve traditional preparations, unlimited freshly puffed puris, and house-made sweet curds.</p>
                  </div>
               </div>

               {/* Dish 2 */}
               <div className="flex flex-col gap-6 menu-item group lg:mt-16">
                   <div className={`w-full aspect-square img-wrapper border border-olive bg-[${warmCream}] p-2 shadow-sm`}>
                     <img src="https://images.unsplash.com/photo-hJzG6jqApTM?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Dosa" />
                  </div>
                  <div>
                     <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-karma text-2xl font-bold">Heritage Masala Dosa</h3>
                     </div>
                     <p className="font-hind font-light opacity-80 leading-relaxed text-sm">Fermented overnight and roasted in pure ghee. Served with our signature coconut chutney and deeply spiced sambar.</p>
                  </div>
               </div>

               {/* Dish 3 */}
               <div className="flex flex-col gap-6 menu-item group lg:mt-32">
                  <div className={`w-full aspect-square img-wrapper border border-olive bg-[${warmCream}] p-2 shadow-sm`}>
                     <img src="https://picsum.photos/seed/78bee252/1200/800" className="w-full h-full object-cover" alt="Paneer" />
                  </div>
                  <div>
                     <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-karma text-2xl font-bold">Malai Kofta</h3>
                     </div>
                     <p className="font-hind font-light opacity-80 leading-relaxed text-sm">Hand-rolled cottage cheese and potato dumplings simmered in a rich, cashew-based gravy infused with green cardamom.</p>
                  </div>
               </div>

            </div>

            <div className="mt-24 text-reveal">
               <button className="heritage-btn font-hind text-sm font-semibold tracking-widest uppercase">
                 View Full Menu
               </button>
            </div>
         </div>
      </section>

      {/* 4. PURE-VEG PHILOSOPHY */}
      <section className="relative w-full py-48 px-8 md:px-16 z-20 text-center flex justify-center border-t border-olive" style={{ backgroundColor: oliveGreen, color: warmCream }}>
         <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
           <img 
             src="https://picsum.photos/seed/b6663595/1200/800" 
             className="w-full h-[120%] object-cover subtle-parallax -top-[10%]" 
             alt="Spices" 
           />
         </div>
         <div className="relative z-10 max-w-4xl text-reveal">
            <span className="font-hind text-sm tracking-[0.3em] uppercase font-bold opacity-70 mb-8 block">Our Philosophy</span>
            <h2 className="font-karma text-4xl md:text-5xl font-light italic leading-relaxed">
               "True nourishment respects all life. We craft pure vegetarian cuisine not as a dietary restriction, but as a joyous celebration of the earth's absolute abundance."
            </h2>
         </div>
      </section>

      {/* 5. VISIT US & TESTIMONIALS */}
      <section className="relative w-full py-32 px-8 md:px-16 z-20">
         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24">
            
            <div className="lg:w-1/2 flex flex-col text-reveal">
               <span className="font-hind text-xs tracking-widest uppercase font-bold opacity-60 mb-6">Visit Us</span>
               <h3 className="font-karma text-4xl font-bold mb-12">The Original Dining Room</h3>
               
               <div className="flex flex-col gap-8 font-hind text-lg font-light opacity-80">
                  <div>
                     <p className="font-bold opacity-100 mb-2 font-karma text-2xl">Location</p>
                     <p>108 Heritage Row,<br/>Cultural District, 400001</p>
                  </div>
                  <div>
                     <p className="font-bold opacity-100 mb-2 font-karma text-2xl">Hours</p>
                     <p>Lunch: 11:30 AM — 3:30 PM<br/>Dinner: 6:30 PM — 10:30 PM<br/>Closed on Tuesdays.</p>
                  </div>
               </div>
            </div>

            <div className="lg:w-1/2 flex flex-col text-reveal">
               <span className="font-hind text-xs tracking-widest uppercase font-bold opacity-60 mb-6">The Community</span>
               <h3 className="font-karma text-4xl font-bold mb-12">Voices of our Guests</h3>
               
               <div className="flex flex-col gap-12">
                  <div className="border-l-2 border-olive pl-6">
                     <p className="font-karma text-2xl font-light italic opacity-90 leading-relaxed">"Stepping into Ananda Bhavan feels like coming home. The aroma, the warmth of the staff, and the unmatched purity of the food make it an institution."</p>
                     <p className="font-hind text-sm uppercase tracking-widest font-bold mt-4 opacity-60">— The Culinary Review</p>
                  </div>
                  <div className="border-l-2 border-olive pl-6">
                     <p className="font-karma text-2xl font-light italic opacity-90 leading-relaxed">"My family has been dining here for three generations. The taste of their signature Dosa hasn't changed a bit since 1980."</p>
                     <p className="font-hind text-sm uppercase tracking-widest font-bold mt-4 opacity-60">— S. Krishnan</p>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 6. MASSIVE FOOTER */}
      <footer className="relative w-full pt-32 pb-16 px-8 md:px-16 z-20 border-t border-olive">
         <div className="w-full flex flex-col justify-center items-center text-center text-reveal">
            <h2 className="font-karma text-5xl md:text-7xl font-bold mb-12">We look forward<br/>to serving you.</h2>
            <button className="heritage-btn font-hind text-sm font-bold tracking-widest uppercase">
               Make a Reservation
            </button>
         </div>

         <div className="w-full mt-48 border-t border-olive pt-12 flex flex-col md:flex-row justify-between items-start gap-12 font-hind text-sm font-light opacity-80 text-reveal">
            
            <div className="flex flex-col gap-2">
               <span className="font-bold tracking-widest uppercase opacity-60 mb-2">Ananda Bhavan</span>
               <span>Est. 1956</span>
               <span>Pure Vegetarian Fine Dining</span>
            </div>
            
            <div className="flex gap-16">
               <div className="flex flex-col gap-4">
                  <a href="#" className="soft-link">Our Story</a>
                  <a href="#" className="soft-link">Menu</a>
                  <a href="#" className="soft-link">Gallery</a>
               </div>
               <div className="flex flex-col gap-4">
                  <a href="#" className="soft-link">Contact</a>
                  <a href="#" className="soft-link">Press</a>
                  <a href="#" className="soft-link">Careers</a>
               </div>
            </div>

            <div className="text-left md:text-right flex flex-col gap-2">
               <span>© {new Date().getFullYear()} Ananda Bhavan Heritage.</span>
               <span>All Rights Reserved.</span>
            </div>
         </div>
      </footer>

    </div>
  );
}
