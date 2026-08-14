"use client";

import React, { useState, useEffect } from 'react';

const DEFAULT_WORDS = ['alive', 'bouncy', 'liquid', 'electric', 'gooey'];

export default function SlotWords({ words = DEFAULT_WORDS, className = '' }: { words?: string[], className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2100);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {words[i].split('').map((ch, j) => (
        <span 
          key={`${i}-${j}`} 
          className="inline-block animate-[slotIn_.5s_cubic-bezier(.22,1,.36,1)_both]"
          style={{ animationDelay: `${j * 55}ms` }}
        >
          {ch}
        </span>
      ))}
      <span className="ml-1.5 inline-block h-[0.85em] w-[3px] animate-[blinkCaret_1s_steps(1)_infinite] bg-[#FFFE15]" />
    </span>
  );
}
