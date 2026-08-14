"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Fraunces, Karla } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const fraunces = Fraunces({ 
  weight: ["300", "400", "500", "600"], 
  subsets: ["latin"],
  style: ["normal", "italic"]
});

const karla = Karla({ 
  weight: ["300", "400", "500", "700"], 
  subsets: ["latin"], 
  variable: "--font-karla" 
});

export default function CoffeeRoasterDemo({ palette }: { palette: Palette }) {
  const [sage, olive] = palette.colors; // sage: #EBEEDF, olive: #333C30
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Gentle fade ups
    const fadeElements = gsap.utils.toArray(".coffee-fade-up");
    fadeElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          }
        }
      );
    });

    // Parallax images
    const parallaxImages = gsap.utils.toArray(".coffee-parallax img");
    parallaxImages.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Slow scale down for hero image on scroll
    gsap.to(".hero-image-container", {
      scale: 0.95,
      borderRadius: "100px",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${fraunces.className} ${karla.variable} selection:bg-[${olive}] selection:text-[${sage}] relative overflow-x-hidden`}
      style={{
        backgroundColor: sage,
        color: olive,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* Noise texture for tactile feel */
        .coffee-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 50;
        }

        .font-sans-ui {
          font-family: var(--font-karla), sans-serif;
        }

        .coffee-btn {
          border: 1px solid ${olive};
          color: ${olive};
          border-radius: 9999px; /* Pill shape */
          padding: 0.75rem 2rem;
          font-family: var(--font-karla), sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
          transition: all 0.4s ease;
          background: transparent;
        }
        .coffee-btn:hover {
          background: ${olive};
          color: ${sage};
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px ${olive}80;
        }

        .coffee-link {
          position: relative;
          display: inline-block;
          font-family: var(--font-karla), sans-serif;
          text-transform: uppercase;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
        }
        .coffee-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
        }
        .coffee-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .coffee-arch {
          border-top-left-radius: 999px;
          border-top-right-radius: 999px;
        }

        .coffee-pill-img {
          border-radius: 999px;
        }
      `}} />

      <div className="coffee-noise" />

      {/* HEADER */}
      <header className="relative z-40 w-full flex justify-between items-center px-6 md:px-12 py-8">
        <div className="text-2xl font-semibold tracking-tight">OAK & EMBER</div>
        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="coffee-link">Shop</a>
          <a href="#" className="coffee-link">Our Story</a>
          <a href="#" className="coffee-link">Journal</a>
        </nav>
        <button className="coffee-btn hidden md:block">Visit Us</button>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section relative z-10 w-full min-h-[90vh] flex flex-col items-center justify-center px-6 pb-20">
        <div className="hero-image-container absolute inset-4 md:inset-8 z-0 overflow-hidden rounded-[40px] transform-gpu">
          <div className="w-full h-full coffee-parallax">
            <img 
              src="/images/nathan-dumlao-KixfBEdyp64-unsplash.jpg" 
              alt="Pour over coffee" 
              className="absolute -top-[15%] w-full h-[130%] object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center mt-32 md:mt-48 max-w-4xl" style={{ color: sage }}>
          <p className="font-sans-ui uppercase tracking-[0.2em] text-sm md:text-base mb-6 opacity-90 coffee-fade-up">
            Single Origin Roasters
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9] mb-10 coffee-fade-up">
            Slow Roasted.<br />
            <span className="italic">Deeply Rooted.</span>
          </h1>
          <button className={`coffee-btn !text-[${sage}] !border-[${sage}] hover:!bg-[${sage}] hover:!text-[${olive}] coffee-fade-up`} style={{ borderColor: sage, color: sage }}>
            Explore Our Roasts
          </button>
        </div>
      </section>

      {/* STORY / ORIGIN SECTION */}
      <section className="relative z-10 py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div className="w-full md:w-1/2 coffee-fade-up">
          <div className="aspect-[3/4] coffee-arch overflow-hidden relative w-[80%] mx-auto md:w-full">
            <div className="w-full h-full coffee-parallax">
              <img 
                src="/images/nathan-dumlao-Y3AqmbmtLQI-unsplash.jpg" 
                alt="Coffee beans sorting" 
                className="absolute -top-[15%] w-full h-[130%] object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="font-sans-ui uppercase tracking-[0.15em] text-sm mb-8 opacity-70 coffee-fade-up">Our Approach</p>
          <h2 className="text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight mb-8 coffee-fade-up">
            We believe that every bean has a story waiting to be told.
          </h2>
          <p className="font-sans-ui text-lg md:text-xl leading-relaxed opacity-80 mb-10 max-w-md coffee-fade-up">
            Sourced exclusively from high-altitude micro-lots, our coffees are roasted in small batches to preserve their delicate nuances and organic sweetness. We don't rush the process, and neither should you.
          </p>
          <div className="coffee-fade-up">
            <a href="#" className="coffee-link">Read our manifesto</a>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="relative z-10 py-32 px-6 border-y" style={{ borderColor: `${olive}30` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 coffee-fade-up">
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight">Recent Harvests</h2>
            <a href="#" className="coffee-link mb-2">Shop All Coffee</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { title: "Finca El Paraiso", origin: "Colombia", tasting: "Peach, Jasmine, Honey", img: "/images/pablo-merchan-montes-_Tw4vCs9C-8-unsplash.jpg" },
              { title: "Guji Hambela", origin: "Ethiopia", tasting: "Blueberry, Earl Grey, Cocoa", img: "/images/mae-mu-3WLcQWnHB_Q-unsplash.jpg" },
              { title: "Antigua Pastoral", origin: "Guatemala", tasting: "Dark Chocolate, Cherry, Hazelnut", img: "/images/alexander-jawfox-F-6v14W67Ak-unsplash.jpg" }
            ].map((coffee, i) => (
              <div key={i} className="group cursor-pointer coffee-fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="aspect-[4/5] coffee-pill-img overflow-hidden relative mb-8 transition-transform duration-700 group-hover:-translate-y-4 shadow-xl shadow-black/5" style={{ backgroundColor: `${olive}10` }}>
                  <img 
                    src={coffee.img} 
                    alt={coffee.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans-ui uppercase tracking-[0.1em] text-xs font-bold opacity-60 mb-3">{coffee.origin}</p>
                  <h3 className="text-2xl font-medium mb-3">{coffee.title}</h3>
                  <p className="font-sans-ui text-sm opacity-80">{coffee.tasting}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BREW GUIDE / TACTILE SECTION */}
      <section className="relative z-10 py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-16 md:gap-24 items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-12 coffee-fade-up">The ritual of brewing is just as important as the beans themselves.</h2>
          
          <div className="flex flex-col gap-4 font-sans-ui">
            {[
              { name: 'Chemex', desc: 'A clean, bright cup that highlights delicate floral notes.' },
              { name: 'AeroPress', desc: 'Quick and versatile, producing a smooth, full-bodied extraction.' },
              { name: 'French Press', desc: 'Rich and heavy, perfect for emphasizing deep chocolate tones.' },
              { name: 'Espresso', desc: 'Concentrated and intense. The pure essence of the roast.' }
            ].map((method, i) => (
              <div key={method.name} className="border-b pb-0 coffee-fade-up group cursor-pointer overflow-hidden relative" style={{ borderColor: `${olive}30` }}>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" style={{ backgroundColor: `${olive}10` }} />
                <div className="relative z-10 p-6">
                  <div className="flex justify-between items-center text-xl md:text-2xl font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <span>{method.name}</span>
                    <span className="text-2xl font-light group-hover:rotate-45 transition-transform duration-300">+</span>
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                    <div className="overflow-hidden">
                      <p className="font-sans-ui text-base md:text-lg opacity-80 pt-4">
                        {method.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 coffee-fade-up">
          <div className="aspect-square rounded-full overflow-hidden relative w-[80%] mx-auto md:w-[90%] md:ml-auto">
            <div className="w-full h-full coffee-parallax">
              <img 
                src="/images/nathan-dumlao-Y3AqmbmtLQI-unsplash.jpg" 
                alt="Pouring coffee" 
                className="absolute -top-[15%] w-full h-[130%] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SPACIOUS FOOTER */}
      <footer className="relative z-10 pt-32 pb-12 px-6 md:px-12 border-t mt-20" style={{ borderColor: `${olive}30`, backgroundColor: olive, color: sage }}>
        {/* Newsletter Pill */}
        <div className="max-w-4xl mx-auto bg-transparent border rounded-[40px] p-8 md:p-12 mb-32 flex flex-col md:flex-row items-center justify-between gap-8 coffee-fade-up" style={{ borderColor: `${sage}40` }}>
          <div>
            <h3 className="text-3xl font-medium mb-3">Join our journal</h3>
            <p className="font-sans-ui opacity-80">Brew guides, new arrivals, and stories from the farm.</p>
          </div>
          <form className="flex w-full md:w-auto gap-4" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b font-sans-ui px-2 py-3 focus:outline-none w-full md:w-64"
              style={{ borderColor: `${sage}60`, color: sage }}
            />
            <button type="submit" className="font-sans-ui font-semibold uppercase tracking-wider text-sm hover:opacity-70 transition-opacity">
              Subscribe
            </button>
          </form>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24 coffee-fade-up">
          <div className="lg:col-span-2">
            <div className="text-3xl font-semibold tracking-tight mb-6 hover:opacity-80 transition-opacity cursor-pointer">OAK & EMBER</div>
            <p className="font-sans-ui opacity-70 max-w-sm leading-relaxed mb-8">
              Roasting with intention in Portland, Oregon. Dedicated to the craft, the farmers, and the morning ritual.
            </p>
          </div>

          <div>
            <h4 className="font-sans-ui uppercase tracking-widest text-xs font-bold mb-6 opacity-60">Shop</h4>
            <ul className="flex flex-col gap-4 text-lg">
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Single Origin</a></li>
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Blends</a></li>
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Equipment</a></li>
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Merch</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans-ui uppercase tracking-widest text-xs font-bold mb-6 opacity-60">About</h4>
            <ul className="flex flex-col gap-4 text-lg">
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Our Story</a></li>
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Sourcing</a></li>
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Wholesale</a></li>
              <li><a href="#" className="coffee-link inline-block hover:-translate-y-1 transition-transform">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans-ui uppercase tracking-widest text-xs font-bold mb-6 opacity-60">Visit</h4>
            <ul className="flex flex-col gap-4 font-sans-ui text-base opacity-80 group cursor-default">
              <li className="group-hover:opacity-100 transition-opacity">1401 SE Alder St.</li>
              <li className="group-hover:opacity-100 transition-opacity">Portland, OR 97214</li>
              <li className="mt-4 group-hover:opacity-100 transition-opacity">Mon-Fri: 7am - 5pm</li>
              <li className="group-hover:opacity-100 transition-opacity">Sat-Sun: 8am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t flex flex-col md:flex-row justify-between items-center gap-6 pt-8 font-sans-ui text-sm opacity-60 coffee-fade-up" style={{ borderColor: `${sage}30` }}>
          <div>© {new Date().getFullYear()} Oak & Ember Coffee Roasters.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-100 hover:-translate-y-1 inline-block transition-all duration-300">Instagram</a>
            <a href="#" className="hover:opacity-100 hover:-translate-y-1 inline-block transition-all duration-300">Twitter</a>
            <a href="#" className="hover:opacity-100 hover:-translate-y-1 inline-block transition-all duration-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
