"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DEMO_EMAIL = "astro@toon.com";
const DEMO_PASSWORD = "blast";

const CartoonCloud = ({ x, y, delay }: { x: string, y: string, delay: number }) => (
    <motion.svg 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ left: x, top: y }}
        className="absolute drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] w-32 h-20 overflow-visible z-0 opacity-80" 
        viewBox="0 0 100 60"
    >
        <path d="M 20,40 Q 20,20 40,20 Q 50,5 70,15 Q 90,15 85,35 Q 100,40 90,55 L 15,55 Q 0,45 20,40 Z" fill="#ffffff" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
    </motion.svg>
);

const CartoonStar = ({ x, y, size, delay }: { x: string, y: string, size: number, delay: number }) => (
    <motion.svg
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ left: x, top: y, width: size, height: size }}
        className="absolute drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] z-0"
        viewBox="0 0 50 50"
    >
        <path d="M 25,5 L 30,20 L 45,25 L 30,30 L 25,45 L 20,30 L 5,25 L 20,20 Z" fill="#facc15" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
    </motion.svg>
);

const CartoonRocketSVG = ({ status }: { status: string }) => (
    <svg viewBox="0 0 200 300" className="w-[200px] h-[300px] overflow-visible drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
        {/* Flames (only show when submitting or success) */}
        <motion.g 
            initial={{ scale: 0 }} 
            animate={{ scale: (status === "submitting" || status === "success") ? 1 : 0 }} 
            style={{ transformOrigin: "100px 250px" }}
        >
            <motion.path 
                d="M 80,250 L 100,320 L 120,250 Z" 
                fill="#facc15" stroke="#000" strokeWidth="6" strokeLinejoin="round"
                animate={{ scaleY: [1, 1.4, 1] }} 
                transition={{ repeat: Infinity, duration: 0.1 }}
            />
            <motion.path 
                d="M 90,250 L 100,290 L 110,250 Z" 
                fill="#ef4444" stroke="#000" strokeWidth="4" strokeLinejoin="round"
                animate={{ scaleY: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
            />
        </motion.g>

        {/* Left Fin */}
        <path d="M 50,160 L 10,240 L 70,230 Z" fill="#ef4444" stroke="#000" strokeWidth="8" strokeLinejoin="round" />
        
        {/* Right Fin */}
        <path d="M 150,160 L 190,240 L 130,230 Z" fill="#ef4444" stroke="#000" strokeWidth="8" strokeLinejoin="round" />
        
        {/* Main Body */}
        <path d="M 100,20 Q 180,100 160,250 L 40,250 Q 20,100 100,20 Z" fill="#f8fafc" stroke="#000" strokeWidth="8" strokeLinejoin="round" />
        
        {/* Nose Cone */}
        <path d="M 100,20 Q 130,50 143,85 L 57,85 Q 70,50 100,20 Z" fill="#ef4444" stroke="#000" strokeWidth="8" strokeLinejoin="round" />
        
        {/* Window Rim */}
        <circle cx="100" cy="140" r="36" fill="#94a3b8" stroke="#000" strokeWidth="8" />
        
        {/* Window Glass */}
        <circle cx="100" cy="140" r="28" fill="#38bdf8" stroke="#000" strokeWidth="6" />
        
        {/* Window Reflection */}
        <path d="M 85,120 Q 115,115 120,140 Q 105,130 85,120 Z" fill="#ffffff" opacity="0.9" />

        {/* Bolts on hull */}
        <circle cx="60" cy="220" r="3" fill="#000" />
        <circle cx="140" cy="220" r="3" fill="#000" />
        <circle cx="100" cy="235" r="3" fill="#000" />
    </svg>
);

const SmokePuff = ({ isVisible }: { isVisible: boolean }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: [0, 1.5, 2], opacity: [1, 1, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
    >
        <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
            {/* Cartoon explosion cloud */}
            <path d="M 150,150 m -80,0 a 40,40 0 1,1 160,0 a 40,40 0 1,1 -160,0" fill="#334155" stroke="#000" strokeWidth="8" />
            <circle cx="150" cy="90" r="60" fill="#334155" stroke="#000" strokeWidth="8" />
            <circle cx="90" cy="160" r="50" fill="#334155" stroke="#000" strokeWidth="8" />
            <circle cx="210" cy="160" r="55" fill="#334155" stroke="#000" strokeWidth="8" />
            <circle cx="120" cy="210" r="45" fill="#334155" stroke="#000" strokeWidth="8" />
            <circle cx="180" cy="210" r="40" fill="#334155" stroke="#000" strokeWidth="8" />
            
            {/* Explosion lines */}
            <line x1="50" y1="50" x2="20" y2="20" stroke="#000" strokeWidth="8" strokeLinecap="round" />
            <line x1="250" y1="50" x2="280" y2="20" stroke="#000" strokeWidth="8" strokeLinecap="round" />
            <line x1="30" y1="200" x2="0" y2="220" stroke="#000" strokeWidth="8" strokeLinecap="round" />
            <line x1="270" y1="200" x2="300" y2="220" stroke="#000" strokeWidth="8" strokeLinecap="round" />
        </svg>
    </motion.div>
);

export default function CartoonRocketLogin() {
    const [email, setEmail] = useState(DEMO_EMAIL);
    const [password, setPassword] = useState(DEMO_PASSWORD);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const rocketControls = useAnimation();

    // Idle bobbing
    useEffect(() => {
        if (status === "idle") {
            rocketControls.start({ y: [0, -8, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } });
        }
    }, [status, rocketControls]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== "idle") return;
        
        setStatus("submitting");
        
        // Violent shaking for blast off
        await rocketControls.start({
            x: [0, -5, 5, -6, 6, -4, 4, 0],
            y: [0, 4, -4, 5, -5, 3, -3, 0],
            transition: { duration: 0.1, repeat: 18 } // approx 1.8s
        });
        
        const passed = email === DEMO_EMAIL && password === DEMO_PASSWORD;
        
        if (passed) {
            setErrorMessage("");
            setStatus("success");
            // Blast off!
            await rocketControls.start({
                y: -800,
                transition: { duration: 0.6, ease: "easeIn" }
            });
        } else {
            setStatus("failure");
            setErrorMessage("WRONG EMAIL OR PASSWORD!");
            // Fail sputter and crash
            await rocketControls.start({
                y: [-20, 100],
                rotate: [0, 60],
                transition: { duration: 0.5, type: "spring", bounce: 0.6 }
            });
            
            await new Promise(r => setTimeout(r, 1000)); // Wait while smoke clears
            
            // Reset
            setEmail("");
            setPassword("");
            rocketControls.set({ y: -800, rotate: 0 }); // Teleport high
            
            // Drop back down
            await rocketControls.start({
                y: 0,
                transition: { duration: 0.8, type: "spring", bounce: 0.5 }
            });
            
            setStatus("idle");
        }
    };

    return (
        <div className="relative w-full min-h-[700px] bg-sky-300 rounded-3xl border-8 border-black flex items-center justify-center p-8 overflow-hidden font-sans shadow-[0_0_0_10px_rgba(255,255,255,0.2)]">
            
            {/* Cartoon Background Elements */}
            <CartoonCloud x="5%" y="15%" delay={0} />
            <CartoonCloud x="75%" y="10%" delay={1.5} />
            <CartoonCloud x="45%" y="65%" delay={0.8} />
            <CartoonCloud x="-10%" y="75%" delay={2.5} />
            <CartoonCloud x="85%" y="70%" delay={0.3} />
            
            <CartoonStar x="15%" y="40%" size={40} delay={0} />
            <CartoonStar x="80%" y="30%" size={50} delay={1} />
            <CartoonStar x="55%" y="20%" size={30} delay={0.5} />
            <CartoonStar x="30%" y="80%" size={45} delay={1.2} />
            
            {/* Success Banner */}
            {status === "success" && (
                <motion.div 
                    initial={{ y: -200 }} 
                    animate={{ y: 40 }} 
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="absolute top-0 z-50 bg-yellow-400 border-8 border-black px-12 py-6 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                >
                    <h1 className="text-4xl font-black uppercase text-black tracking-widest drop-shadow-[2px_2px_0px_#fff]">Mission Accomplished!</h1>
                </motion.div>
            )}

            <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center w-full max-w-4xl">
                
                {/* Rocket Launch Pad */}
                <div className="relative w-full md:w-1/2 h-[450px] flex flex-col items-center justify-end">
                    <SmokePuff isVisible={status === "failure"} />
                    
                    <motion.div animate={rocketControls} className="relative z-20 mb-[-10px]">
                        <CartoonRocketSVG status={status} />
                    </motion.div>
                    
                    {/* The Launchpad base anchored to ground */}
                    <div className="relative z-10 w-[240px] h-[60px] bg-slate-400 border-8 border-b-0 border-black rounded-t-xl flex flex-col items-center">
                        <div className="w-[260px] h-8 bg-slate-500 border-8 border-black rounded-xl absolute -top-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                        {/* Tower stripes */}
                        <div className="w-16 h-full bg-slate-500 border-x-4 border-black mt-4 opacity-50" />
                    </div>
                </div>

                {/* Launch Console (Form) */}
                <div className="w-full md:w-1/2 bg-[#facc15] border-8 border-black rounded-3xl p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative overflow-visible">
                    
                    {/* Error Bubble */}
                    {errorMessage && (
                        <motion.div 
                            initial={{ scale: 0, originY: 1 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-[80px] left-8 right-8 bg-red-500 border-4 border-black rounded-2xl p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-center z-50"
                        >
                            <div className="absolute -bottom-3 left-10 w-5 h-5 bg-red-500 border-b-4 border-r-4 border-black rotate-45" />
                            <p className="font-black text-white uppercase text-lg tracking-widest drop-shadow-[2px_2px_0px_#000]">{errorMessage}</p>
                        </motion.div>
                    )}

                    {/* Decorative Antenna */}
                    <div className="absolute -top-[60px] right-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500 border-4 border-black animate-pulse" />
                        <div className="w-4 h-12 bg-slate-400 border-x-4 border-black" />
                    </div>

                    <h2 className="text-4xl font-black uppercase text-black mb-8 tracking-widest drop-shadow-[3px_3px_0px_#fff]">Launch Control</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        <div className="flex flex-col gap-3">
                            <label className="font-black uppercase text-black text-lg tracking-wider">Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setErrorMessage(""); }}
                                disabled={status !== "idle"}
                                placeholder="Enter Email"
                                className="w-full h-16 px-5 rounded-2xl border-4 border-black bg-white font-black text-xl text-black placeholder:text-slate-300 shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:translate-y-[2px] focus:translate-x-[2px] focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] outline-none transition-all disabled:opacity-70" 
                            />
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <label className="font-black uppercase text-black text-lg tracking-wider">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => { setPassword(e.target.value); setErrorMessage(""); }}
                                disabled={status !== "idle"}
                                placeholder="••••••••"
                                className="w-full h-16 px-5 rounded-2xl border-4 border-black bg-white font-black text-2xl text-black placeholder:text-slate-300 shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:translate-y-[2px] focus:translate-x-[2px] focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] outline-none transition-all disabled:opacity-70 tracking-widest" 
                            />
                        </div>
                        
                        <motion.button 
                            type="submit"
                            disabled={status !== "idle"}
                            whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                            whileTap={{ scale: 0.95, y: 6, x: 6, boxShadow: "0px 0px 0px rgba(0,0,0,1)" }}
                            className="mt-6 w-full h-20 rounded-2xl border-8 border-black bg-red-500 font-black text-white text-3xl uppercase tracking-widest shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:bg-red-400 transition-colors flex items-center justify-center disabled:opacity-80"
                            style={status === "submitting" ? { transform: "translate(6px, 6px)", boxShadow: "0px 0px 0px rgba(0,0,0,1)" } : {}}
                        >
                            {status === "submitting" ? "Ignition..." : "LAUNCH!"}
                        </motion.button>
                        
                    </form>
                </div>

            </div>
        </div>
    );
}
