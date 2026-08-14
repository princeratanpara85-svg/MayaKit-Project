"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/ui/Logo";

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

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const container = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -20,
      scale: 0.97,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, { scope: container });

  useGSAP(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out", // Changed from inOut to out per emil-design-eng
        display: "none",
      });
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Components", href: "/components" },
    { label: "Color Combo", href: "/color-combo" },
    { label: "Docs", href: "/docs" },
  ];

  if (pathname?.startsWith("/color-combo/") && pathname !== "/color-combo") {
    return null;
  }

  return (
    <header ref={container} className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav ref={navRef} className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo className="scale-75 origin-left" />
          <Link href="/" className="font-display text-2xl font-bold text-primary tracking-tight">
            MayaKit
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground transition-colors duration-200 hover:text-primary font-body font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-6 border-l border-border pl-6">
            <Link
              href="https://github.com/placeholder/mayakit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors duration-200 hover:text-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/docs"
              className="flex min-h-[44px] items-center justify-center rounded-sm bg-primary px-6 py-2.5 font-display font-bold text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-foreground hover:text-primary focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden bg-background opacity-0 hidden"
        style={{ height: 0 }}
      >
        <div className="space-y-1 px-4 pb-6 pt-2 border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-sm px-3 py-4 text-base font-medium font-body text-foreground transition-colors duration-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex items-center space-x-4 px-3 pt-4 border-t border-border">
            <Link
              href="https://github.com/placeholder/mayakit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors duration-200 hover:text-primary min-w-[44px] min-h-[44px] flex items-center"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="ml-3 font-medium font-body">GitHub</span>
            </Link>
          </div>
          <div className="mt-6 px-3">
            <Link
              href="/docs"
              className="flex w-full min-h-[44px] items-center justify-center rounded-sm bg-primary px-4 py-3 font-display font-bold text-primary-foreground transition-transform duration-200 active:scale-95"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
