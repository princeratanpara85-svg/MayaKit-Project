"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ColorFloodCopyButtonProps {
    textToCopy?: string;
    buttonColor?: string;
    textColor?: string;
}

export default function ColorFloodCopyButton({
    textToCopy = "npm install mayakit",
    buttonColor = "var(--color-primary)",
    textColor = "var(--color-background)",
}: ColorFloodCopyButtonProps) {
    const [phase, setPhase] = useState<"idle" | "shrinking" | "checked" | "copied">("idle");

    const handleCopy = async () => {
        if (phase !== "idle") return;
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (e) {}

        // 1. Shrink into circle
        setPhase("shrinking");

        // 2. Draw Checkmark
        setTimeout(() => setPhase("checked"), 250);

        // 3. Expand to Copied
        setTimeout(() => setPhase("copied"), 1000);

        // 4. Reset
        setTimeout(() => setPhase("idle"), 3000);
    };

    return (
        <div className="flex items-center justify-center p-16 bg-background h-64">
            <motion.button
                onClick={handleCopy}
                initial={false}
                animate={{
                    width: phase === "shrinking" || phase === "checked" ? 48 : 140,
                    backgroundColor: phase === "idle" ? "transparent" : buttonColor,
                    color: phase === "idle" ? buttonColor : textColor,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                whileHover={phase === "idle" ? { scale: 1.05 } : {}}
                whileTap={phase === "idle" ? { scale: 0.95 } : {}}
                className="relative flex items-center justify-center h-12 rounded-full border-2 font-bold text-sm tracking-widest uppercase overflow-hidden"
                style={{
                    borderColor: buttonColor,
                }}
            >
                <AnimatePresence mode="wait">
                    {phase === "idle" && (
                        <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute whitespace-nowrap"
                        >
                            Copy
                        </motion.span>
                    )}

                    {(phase === "shrinking" || phase === "checked") && (
                        <motion.svg
                            key="check"
                            viewBox="0 0 24 24"
                            className="absolute w-5 h-5"
                            style={{ stroke: textColor }}
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: phase === "checked" ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                d="M20 6L9 17l-5-5"
                            />
                        </motion.svg>
                    )}

                    {phase === "copied" && (
                        <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute whitespace-nowrap"
                        >
                            Copied!
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
