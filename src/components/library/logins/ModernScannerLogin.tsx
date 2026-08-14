"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Shield, User, Fingerprint, Check, X } from "lucide-react";

const DEMO_EMAIL = "admin@company.com";
const DEMO_PASSWORD = "secure";

export default function ModernScannerLogin() {
    const [email, setEmail] = useState(DEMO_EMAIL);
    const [password, setPassword] = useState(DEMO_PASSWORD);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    
    const cardControls = useAnimation();
    const scannerControls = useAnimation();
    const lightControls = useAnimation();

    useEffect(() => {
        cardControls.set({ y: 0 });
    }, [cardControls]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (status !== "idle") return;

        setStatus("submitting");
        setErrorMessage("");

        // Card slides down into scanner
        await cardControls.start({
            y: 260,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        });

        // Scanning laser animation
        await lightControls.start({
            x: [-120, 120, -120, 120, 0],
            opacity: [0, 1, 1, 1, 0],
            transition: { duration: 1.5, ease: "easeInOut" }
        });
        
        const passed = email === DEMO_EMAIL && password === DEMO_PASSWORD;

        if (passed) {
            setStatus("success");
            
            // Scanner success bounce
            scannerControls.start({
                y: [0, 10, 0],
                transition: { duration: 0.4, ease: "easeInOut" }
            });
            
            // Card pops back up verified
            await cardControls.start({
                y: 0,
                transition: { type: "spring", stiffness: 200, damping: 25 }
            });
            
        } else {
            setStatus("failure");
            setErrorMessage("Access Denied: Invalid Credentials");
            
            // Scanner error shake
            scannerControls.start({
                x: [0, -10, 10, -8, 8, -5, 5, 0],
                transition: { duration: 0.4 }
            });
            
            // Card is spit back out violently
            await cardControls.start({
                y: 0,
                transition: { type: "spring", stiffness: 400, damping: 15 }
            });
            
            // Reset to idle after user sees error
            await new Promise(r => setTimeout(r, 2000));
            setErrorMessage("");
            setStatus("idle");
        }
    };

    return (
        <div className="relative w-full min-h-[750px] bg-slate-100 flex flex-col items-center justify-center p-8 overflow-hidden font-sans rounded-3xl shadow-[0_0_0_4px_rgba(255,255,255,0.5)]">
            
            {/* Decorative background grid */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative z-10 flex flex-col items-center mt-[-60px]">
                
                {/* The ID Card */}
                <motion.div animate={cardControls} className="relative z-10 w-[340px] bg-white rounded-[32px] p-8 pb-14 border-[3px] border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col mb-[-50px]">
                    
                    {/* Lanyard hole */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-slate-100 rounded-full border-[3px] border-slate-200 flex items-center justify-center shadow-inner">
                        <div className="w-8 h-3 bg-slate-200 rounded-full shadow-inner" />
                    </div>

                    <div className="flex items-center justify-between mb-8 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-slate-800 tracking-tight text-lg">SystemCore</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">ID Card</span>
                    </div>

                    {/* Profile area */}
                    <div className="flex flex-col items-center mb-8 relative">
                        <div className="w-24 h-24 bg-slate-50 rounded-full border-4 border-slate-100 flex items-center justify-center shadow-inner overflow-hidden relative">
                            {status === "success" ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 bg-emerald-500 flex items-center justify-center">
                                    <Check className="w-12 h-12 text-white" />
                                </motion.div>
                            ) : (
                                <User className="w-10 h-10 text-slate-300" />
                            )}
                        </div>
                        
                        {/* Success Stamp Overlay */}
                        {status === "success" && (
                            <motion.div initial={{ scale: 3, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: -10 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[4px] border-emerald-500 text-emerald-500 font-black text-2xl uppercase tracking-widest px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm z-20 shadow-xl">
                                Verified
                            </motion.div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={e => { setEmail(e.target.value); setErrorMessage(""); }}
                                disabled={status !== "idle"}
                                className="w-full h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-slate-800 font-semibold focus:border-blue-500 focus:bg-white focus:outline-none transition-all disabled:opacity-60 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" 
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => { setPassword(e.target.value); setErrorMessage(""); }}
                                disabled={status !== "idle"}
                                className="w-full h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-slate-800 font-semibold focus:border-blue-500 focus:bg-white focus:outline-none transition-all disabled:opacity-60 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] tracking-widest" 
                            />
                        </div>
                        
                        {/* Hidden submit button to allow Enter key submission */}
                        <button type="submit" className="hidden" />
                    </form>
                    
                    {/* Decorative barcode */}
                    <div className="mt-8 flex justify-center gap-1 opacity-20">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`h-6 bg-black ${i % 3 === 0 ? 'w-2' : i % 2 === 0 ? 'w-1' : 'w-1.5'}`} />
                        ))}
                    </div>
                </motion.div>

                {/* The Scanner Device */}
                <motion.div animate={scannerControls} className="relative z-20 w-[420px] h-[220px] bg-slate-800 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col items-center pt-8 border-b-[12px] border-b-slate-900 border-t-2 border-t-slate-700">
                    
                    {/* The slot */}
                    <div className="relative w-[360px] h-[16px] bg-slate-950 rounded-full border-t border-slate-900 overflow-hidden flex items-center justify-center shadow-inner">
                        {/* Laser */}
                        <motion.div 
                            animate={lightControls}
                            className="absolute w-40 h-[2px] bg-blue-500 shadow-[0_0_20px_6px_rgba(59,130,246,0.9)] opacity-0"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between w-full px-12 mt-10">
                        {/* Status Screen */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scanner Status</span>
                            <div className="flex items-center gap-3 bg-slate-900/80 px-5 py-2.5 rounded-xl border border-slate-700/50 shadow-inner">
                                <div className={`w-2.5 h-2.5 rounded-full ${status === 'idle' ? 'bg-slate-500' : status === 'submitting' ? 'bg-blue-500 animate-pulse' : status === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'}`} />
                                <span className={`text-xs font-bold tracking-widest uppercase ${status === 'idle' ? 'text-slate-400' : status === 'submitting' ? 'text-blue-400' : status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {status === 'idle' ? 'Ready' : status === 'submitting' ? 'Scanning...' : status === 'success' ? 'Granted' : 'Denied'}
                                </span>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <button 
                            onClick={handleSubmit} 
                            disabled={status !== "idle"}
                            className="w-16 h-16 bg-blue-600 rounded-2xl border-b-[6px] border-blue-800 flex items-center justify-center shadow-lg hover:bg-blue-500 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-60 disabled:active:border-b-[6px] disabled:active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                        >
                            <Fingerprint className="w-8 h-8 text-white" />
                        </button>
                    </div>
                    
                </motion.div>
                
                {/* Error Message underneath */}
                <div className="h-12 mt-6 flex items-center justify-center">
                    {errorMessage && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 font-bold bg-red-50 px-5 py-3 rounded-xl border-2 border-red-100 flex items-center gap-2 shadow-sm">
                            <X className="w-5 h-5" />
                            {errorMessage}
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
}
