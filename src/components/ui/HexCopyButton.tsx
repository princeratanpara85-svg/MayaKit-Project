"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HexCopyButtonProps {
  hex: string;
  textColor: string;
}

export default function HexCopyButton({ hex, textColor }: HexCopyButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Emil Kowalski strong ease-out curve
  const easeOut: [number, number, number, number] = [0.23, 1, 0.32, 1];

  return (
    <motion.button
      className="relative mt-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest overflow-hidden group cursor-pointer pointer-events-auto"
      style={{ color: textColor }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleCopy}
      whileHover={{ backgroundColor: `${textColor}1A` }} // 10% opacity background
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.16, ease: easeOut }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            className="block relative z-10"
            initial={{ filter: "blur(2px)", opacity: 0, scale: 0.95, y: 5 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
            exit={{ filter: "blur(2px)", opacity: 0, scale: 1.05, y: -5 }}
            transition={{ duration: 0.15, ease: easeOut }}
          >
            Copied!
          </motion.span>
        ) : hovered ? (
          <motion.span
            key="copy"
            className="block relative z-10"
            initial={{ filter: "blur(2px)", opacity: 0, scale: 0.95, y: 5 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
            exit={{ filter: "blur(2px)", opacity: 0, scale: 1.05, y: -5 }}
            transition={{ duration: 0.15, ease: easeOut }}
          >
            Copy
          </motion.span>
        ) : (
          <motion.span
            key="hex"
            className="block relative z-10"
            initial={{ filter: "blur(2px)", opacity: 0, scale: 0.95, y: 5 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
            exit={{ filter: "blur(2px)", opacity: 0, scale: 1.05, y: -5 }}
            transition={{ duration: 0.15, ease: easeOut }}
          >
            {hex}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
