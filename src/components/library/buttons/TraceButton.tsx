import React from "react";
import { cn } from "@/lib/utils";

interface TraceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function TraceButton({ children = "MayaKit", className, ...props }: TraceButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-4 outline-none overflow-hidden transition-transform duration-75 active:scale-[0.97]",
        className
      )}
      {...props}
    >
      {/* Top border (Left to Right) */}
      <span className="absolute top-0 left-0 h-[2px] bg-primary w-0 transition-all duration-75 ease-linear delay-75 group-hover:delay-0 group-hover:w-full z-10" />
      
      {/* Right border (Top to Bottom) */}
      <span className="absolute top-0 right-0 w-[2px] bg-primary h-0 transition-all duration-75 ease-linear delay-0 group-hover:delay-75 group-hover:h-full z-10" />
      
      {/* Bottom border (Right to Left) */}
      <span className="absolute bottom-0 right-0 h-[2px] bg-primary w-0 transition-all duration-75 ease-linear delay-75 group-hover:delay-0 group-hover:w-full z-10" />
      
      {/* Left border (Bottom to Top) */}
      <span className="absolute bottom-0 left-0 w-[2px] bg-primary h-0 transition-all duration-75 ease-linear delay-0 group-hover:delay-75 group-hover:h-full z-10" />
      
      {/* Background Fill (turns solid) */}
      <div className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-75 ease-out delay-0 group-hover:delay-150 group-hover:opacity-100 z-0" />
      
      {/* Text */}
      <span className="relative z-20 flex items-center text-lg font-display font-bold text-foreground transition-colors duration-75 delay-0 group-hover:delay-150 group-hover:text-primary-foreground tracking-wider uppercase">
        {children}
      </span>
    </button>
  );
}
