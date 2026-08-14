"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Copy, Check } from "lucide-react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  codeHtml: string;
  rawCode: string;
}

export function ComponentPreview({ children, codeHtml, rawCode }: ComponentPreviewProps) {
  const container = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");

  useGSAP(() => {
    gsap.from(".preview-reveal", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: container });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div ref={container} className="flex flex-col gap-0 border border-border bg-background">
      {/* Toolbar */}
      <div className="preview-reveal flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <div className="flex gap-6">
          <button 
            onClick={() => setView("preview")}
            className={`font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              view === "preview" ? "text-primary" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            Preview
          </button>
          <button 
            onClick={() => setView("code")}
            className={`font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              view === "code" ? "text-primary" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            React
          </button>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-none bg-muted px-3 py-1.5 font-mono text-xs font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
        >
          {copied ? (
            <span className="flex items-center gap-2 animate-in zoom-in duration-300">
              <Check className="h-3 w-3" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Copy className="h-3 w-3" />
              Copy
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="preview-reveal relative flex min-h-[500px] w-full flex-col overflow-hidden bg-muted">
        {view === "preview" ? (
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden w-full">
            {children}
          </div>
        ) : (
          <div className="flex-1 overflow-auto bg-background p-6 font-mono text-sm max-h-[800px] w-full custom-scrollbar [&_pre]:!bg-transparent [&_pre]:m-0 [&_code]:block [&_code]:w-fit [&_code]:min-w-full">
            <div dangerouslySetInnerHTML={{ __html: codeHtml }} />
          </div>
        )}
      </div>
    </div>
  );
}
