"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";

export default function LiquidGooeyLogin() {
    const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "password";
    const [step, setStep] = useState<"idle" | "loading" | "success" | "failure">("idle");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("loading");
        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                setStep("success");
                setTimeout(() => setStep("idle"), 3000);
            } else {
                setStep("failure");
                setTimeout(() => setStep("idle"), 2000);
            }
        }, 2000);
    };

    return (
        <div className="w-full min-h-[600px] flex items-center justify-center bg-neutral-950 p-4 overflow-hidden relative">
            
            {/* The Gooey Filter */}
            <svg width="0" height="0" className="absolute">
                <filter id="gooey-login">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="gooey-login" />
                    <feComposite in="SourceGraphic" in2="gooey-login" operator="atop" />
                </filter>
            </svg>

            {/* Gooey Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ filter: "url(#gooey-login)" }}>
                
                {/* Main Form Blob Background */}
                <motion.div
                    initial={false}
                    animate={
                        step === "idle" ? { width: 340, height: 360, borderRadius: 40 }
                        : step === "loading" ? { width: 0, height: 0, borderRadius: 100 }
                        : step === "failure" ? { width: 340, height: 360, borderRadius: 40, backgroundColor: "#ef4444" }
                        : { width: 140, height: 140, borderRadius: 100 }
                    }
                    transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                    className="bg-primary absolute origin-center"
                />

                {/* Orbiting Loading Blobs */}
                <AnimatePresence>
                    {step === "loading" && (
                        <motion.div 
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${i * 120}deg)` }}>
                                        <motion.div
                                            initial={{ scale: 0, y: 0 }}
                                            animate={{ scale: 1, y: -80 }}
                                            exit={{ scale: 0, y: 0 }}
                                            transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                                            className="absolute"
                                        >
                                            <div className="w-16 h-16 bg-primary rounded-full absolute -top-8 -left-8" />
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Interactive Content (Not gooey so text isn't blurry) */}
            <div className="relative z-10 w-[340px] h-[360px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {step === "idle" && (
                        <motion.form 
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full p-8 flex flex-col justify-between"
                        >
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center mb-2">
                                    <Lock className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <h2 className="text-primary-foreground font-black text-2xl uppercase tracking-widest text-center">Vault</h2>
                            </div>

                            <div className="flex flex-col gap-3">
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email Address" 
                                    className="bg-black/10 text-primary-foreground placeholder-primary-foreground/60 border-2 border-black/10 outline-none px-4 py-3 rounded-2xl font-bold focus:border-black/30 focus:bg-black/20 transition-all text-sm"
                                />
                                <input 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password" 
                                    className="bg-black/10 text-primary-foreground placeholder-primary-foreground/60 border-2 border-black/10 outline-none px-4 py-3 rounded-2xl font-bold focus:border-black/30 focus:bg-black/20 transition-all text-sm"
                                />
                            </div>
                            <button type="submit" className="mt-4 bg-black/30 hover:bg-black/50 text-primary-foreground font-black py-4 rounded-2xl transition-all uppercase tracking-[0.2em] text-xs active:scale-95 shadow-xl shadow-black/10">
                                Authenticate
                            </button>
                        </motion.form>
                    )}

                    {step === "success" && (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", bounce: 0.6, delay: 0.3 }}
                            className="flex flex-col items-center justify-center text-primary-foreground"
                        >
                            <Check className="w-14 h-14 stroke-[4]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
