"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function TerminalLineLogin() {
    const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "password";
    const [step, setStep] = useState<"email" | "password" | "decrypting" | "granted" | "denied">("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingText, setLoadingText] = useState("DECRYPTING...");

    useEffect(() => {
        if (step === "decrypting") {
            let iteration = 0;
            const targetText = "AUTHENTICATED";
            const interval = setInterval(() => {
                setLoadingText(prev => 
                    targetText.split("").map((char, index) => {
                        if (index < iteration) return targetText[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }).join("")
                );
                iteration += 0.4;
                if (iteration >= targetText.length) {
                    clearInterval(interval);
                    setTimeout(() => setStep("granted"), 400);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === "email" && email) setStep("password");
        else if (step === "password" && password) setStep("decrypting");
        else if (step === "granted") {
            setStep("email");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="w-full min-h-[500px] flex flex-col items-center justify-center bg-black p-8 font-mono text-primary overflow-hidden relative">
            <div className="w-full max-w-lg relative z-20">
                <AnimatePresence mode="wait">
                    {step === "email" && (
                        <motion.div key="email" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, filter: "blur(4px)" }} transition={{ duration: 0.3 }}>
                            <label className="block text-xs mb-3 opacity-60 tracking-[0.3em] uppercase font-bold text-white">Target Identification</label>
                            <form onSubmit={handleSubmit} className="relative group">
                                <input 
                                    type="email"
                                    autoFocus
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter Email Address..."
                                    className="w-full bg-transparent border-b-2 border-primary/20 py-4 text-3xl outline-none focus:border-primary transition-colors placeholder-primary/20 text-white font-light"
                                />
                                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 hover:text-white uppercase tracking-[0.2em] text-[10px] transition-all bg-black px-2">Proceed [Enter]</button>
                            </form>
                        </motion.div>
                    )}
                    
                    {step === "password" && (
                        <motion.div key="password" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, filter: "blur(4px)" }} transition={{ duration: 0.3 }}>
                            <label className="block text-xs mb-3 opacity-60 tracking-[0.3em] uppercase font-bold text-white flex justify-between">
                                <span>Authorization Code</span>
                                <span className="text-primary">{email}</span>
                            </label>
                            <form onSubmit={handleSubmit} className="relative group">
                                <input 
                                    type="password"
                                    autoFocus
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent border-b-2 border-primary/20 py-4 text-3xl outline-none focus:border-primary transition-colors placeholder-primary/20 text-white font-light tracking-[0.5em]"
                                />
                                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 hover:text-white uppercase tracking-[0.2em] text-[10px] transition-all bg-black px-2">Unlock [Enter]</button>
                            </form>
                        </motion.div>
                    )}

                    {step === "decrypting" && (
                        <motion.div key="decrypting" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }} className="flex flex-col justify-center h-32 w-full">
                            <h2 className="text-4xl font-bold tracking-widest text-white mix-blend-difference mb-6">{loadingText}</h2>
                            <div className="w-full h-[2px] bg-primary/10 relative overflow-hidden">
                                <motion.div 
                                    initial={{ left: "-50%" }} 
                                    animate={{ left: "100%" }} 
                                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                    className="absolute top-0 bottom-0 w-1/3 bg-primary"
                                    style={{ boxShadow: "0 0 10px var(--color-primary), 0 0 20px var(--color-primary)" }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === "denied" && (
                        <motion.div key="denied" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center justify-center h-[300px]">
                            <div className="text-red-500 font-bold text-4xl mb-6 tracking-widest uppercase animate-pulse">Access Denied</div>
                            <p className="text-red-500/50 uppercase tracking-[0.2em] text-xs">Security breach detected.</p>
                        </motion.div>
                    )}
                    {step === "granted" && (
                        <motion.div key="granted" initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, type: "spring" }} className="flex flex-col justify-center h-32 w-full text-center">
                            <h2 className="text-5xl font-black tracking-[0.2em] text-white uppercase" style={{ textShadow: "0 0 40px var(--color-primary)" }}>Access Granted</h2>
                            <button onClick={handleSubmit} className="mt-8 text-[10px] opacity-40 hover:opacity-100 underline tracking-[0.3em] uppercase transition-opacity">Close Connection</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Ambient terminal glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-10 pointer-events-none z-0" 
                 style={{ background: "radial-gradient(ellipse at top, var(--color-primary), transparent 60%)" }} 
            />

            {/* Scanlines overlay */}
            <div className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-20"
                 style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }}
            />
        </div>
    );
}
