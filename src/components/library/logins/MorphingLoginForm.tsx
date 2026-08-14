"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MorphingLoginForm() {
    const DEMO_EMAIL = "demo@demo.com";
const DEMO_PASSWORD = "password";
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== "idle") return;
        
        setStatus("submitting");
        
        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                setStatus("success");
            } else {
                setStatus("failure");
                setTimeout(() => setStatus("idle"), 2000);
            }
        }, 1500);
    };

    return (
        <div className="w-full min-h-[500px] flex items-center justify-center bg-background p-4 relative overflow-hidden">
            <div className="relative w-full max-w-sm">
                
                {/* The Main Form Container */}
                <motion.div 
                    className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 overflow-hidden"
                    animate={status === "success" ? { height: 320 } : { height: 420 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                >
                    <AnimatePresence mode="wait">
                        {status !== "success" && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                                    <p className="text-neutral-400 text-sm">Please enter your details to sign in.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email Address</label>
                                        <input 
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Password</label>
                                        <input 
                                            type="password"
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    {/* Invisible spacer for the absolute positioned button */}
                                    <div className="h-12 mt-2" />
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The Morphing Button */}
                    <motion.div
                        className="absolute bottom-8 left-8 right-8 flex items-center justify-center bg-primary text-primary-foreground font-bold cursor-pointer overflow-hidden z-20"
                        layout
                        initial={false}
                        animate={
                            status === "idle" ? { top: 340, bottom: 32, left: 32, right: 32, borderRadius: 8 }
                            : status === "submitting" ? { top: 340, bottom: 32, left: "30%", right: "30%", borderRadius: 24, backgroundColor: "var(--primary)" }
                            : status === "failure" ? { top: 340, bottom: 32, left: 32, right: 32, borderRadius: 8, backgroundColor: "#ef4444" }
                            : { top: 0, bottom: 0, left: 0, right: 0, borderRadius: 0, backgroundColor: "var(--primary)" }
                        }
                        transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                        onClick={(e) => {
                            if (status === "idle") handleSubmit(e as any);
                        }}
                    >
                        <AnimatePresence>
                            {status === "failure" && (
                                <motion.span 
                                    key="failure" 
                                    initial={{ opacity: 0, x: -10 }} 
                                    animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }} 
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute text-white"
                                >
                                    Access Denied
                                </motion.span>
                            )}
                            {status === "idle" && (
                                <motion.span 
                                    key="idle" 
                                    initial={{ opacity: 0, y: 10 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute"
                                >
                                    Sign In
                                </motion.span>
                            )}
                            {status === "submitting" && (
                                <motion.div 
                                    key="submitting" 
                                    initial={{ opacity: 0, y: 10 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute flex gap-1.5"
                                >
                                    <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </motion.div>
                            )}
                            {status === "success" && (
                                <motion.div 
                                    key="success" 
                                    initial={{ opacity: 0, scale: 0.5 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    transition={{ delay: 0.15, duration: 0.4 }} 
                                    className="absolute flex flex-col items-center gap-4"
                                >
                                    <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <motion.path 
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="M5 13l4 4L19 7" 
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight">Login Successful</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
