"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DEMO_EMAIL = "captain@sea.com";
const DEMO_PASSWORD = "voyage123";

const WaterTexture = () => (
    <svg width="0" height="0">
        <defs>
            <pattern id="caustics" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 25 Q 25 0 50 25 T 100 25 M 0 75 Q 25 50 50 75 T 100 75" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
                <path d="M 25 0 Q 0 25 25 50 T 25 100 M 75 0 Q 50 25 75 50 T 75 100" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
            </pattern>
        </defs>
    </svg>
);

const Cloud = ({ delay, y, scale, duration = 40 }: { delay: number, y: number, scale: number, duration?: number }) => (
    <motion.svg
        initial={{ x: "100vw" }}
        animate={{ x: "-50vw" }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        style={{ top: y, scale }}
        className="absolute z-30 opacity-[0.85] drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] pointer-events-none"
        width="200" height="120" viewBox="0 0 200 120"
    >
        <path d="M 50,60 a 30,30 0 0,1 60,0 a 40,40 0 0,1 70,10 a 30,30 0 0,1 -20,40 l -110,0 a 30,30 0 0,1 0,-50 z" fill="#ffffff" />
        <path d="M 30,70 a 20,20 0 0,1 30,-10 l 0,30 l -30,0 a 20,20 0 0,1 0,-20 z" fill="#ffffff" />
    </motion.svg>
);

const Wake = ({ active }: { active: boolean }) => (
    <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 0.8 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute right-[98%] top-1/2 -translate-y-1/2 w-[280px] h-[90%] bg-gradient-to-r from-transparent via-white to-white blur-md origin-right rounded-l-full pointer-events-none z-[-1]"
    />
);

const CargoShipSVG = ({ color }: { color: string }) => (
    <svg viewBox="0 0 380 100" className="w-full h-full drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] absolute inset-0 pointer-events-none overflow-visible">
        <defs>
            <linearGradient id={`hull-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="25%" stopColor={color} />
                <stop offset="75%" stopColor={color} />
                <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
            </linearGradient>
        </defs>
        
        {/* Hull with 3D gradient */}
        <path d="M 10,20 L 320,20 Q 360,20 370,50 Q 360,80 320,80 L 10,80 Z" fill={`url(#hull-${color})`} stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
        
        {/* Inner Deck */}
        <path d="M 15,25 L 318,25 Q 350,25 358,50 Q 350,75 318,75 L 15,75 Z" fill="url(#deck)" stroke="#334155" strokeWidth="2" />
        
        {/* Deck Grid Lines */}
        <path d="M 90,25 L 90,75 M 130,25 L 130,75 M 170,25 L 170,75 M 210,25 L 210,75 M 250,25 L 250,75 M 290,25 L 290,75" stroke="#cbd5e1" strokeWidth="1" opacity="0.3" />

        {/* 3D Cargo Containers around the deck */}
        <g stroke="#0f172a" strokeWidth="1">
            <rect x="310" y="30" width="15" height="15" fill="#3b82f6" rx="1" />
            <rect x="312" y="32" width="11" height="11" fill="#60a5fa" rx="1" />
            
            <rect x="310" y="55" width="15" height="15" fill="#ef4444" rx="1" />
            <rect x="312" y="57" width="11" height="11" fill="#f87171" rx="1" />
            
            <rect x="330" y="42" width="15" height="15" fill="#10b981" rx="1" />
            <rect x="332" y="44" width="11" height="11" fill="#34d399" rx="1" />
        </g>
        
        {/* Stern Bridge (3D bevel effect) */}
        <rect x="20" y="25" width="45" height="50" rx="4" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        <rect x="25" y="30" width="35" height="40" rx="2" fill="#e2e8f0" />
        <rect x="30" y="35" width="25" height="30" rx="2" fill="#cbd5e1" />
        
        {/* Bridge windows (Dark blue/black) */}
        <rect x="52" y="35" width="6" height="30" rx="2" fill="#0f172a" />
        
        {/* Spinning Radar on top of the bridge */}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "38px 50px" }}>
            <circle cx="38" cy="50" r="8" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
            <line x1="38" y1="50" x2="38" y2="42" stroke="#facc15" strokeWidth="2" />
        </motion.g>

        {/* Small pipes and deck details */}
        <circle cx="75" cy="35" r="4" fill="#94a3b8" stroke="#475569" />
        <circle cx="75" cy="65" r="4" fill="#94a3b8" stroke="#475569" />
    </svg>
);

const SpeedBoatSVG = () => (
    <svg viewBox="0 0 160 60" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] absolute inset-0 pointer-events-none overflow-visible">
        <defs>
            <linearGradient id="speed-hull" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="20%" stopColor="#ffffff" />
                <stop offset="80%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
        </defs>
        
        {/* Hull */}
        <path d="M 10,15 L 120,15 Q 140,15 155,30 Q 140,45 120,45 L 10,45 Z" fill="url(#speed-hull)" stroke="#cbd5e1" strokeWidth="2" strokeLinejoin="round" />
        
        {/* Inner Cockpit Deck */}
        <path d="M 15,20 L 100,20 Q 110,30 100,40 L 15,40 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
        
        {/* Leather Seats */}
        <rect x="25" y="22" width="10" height="7" rx="2" fill="#f59e0b" stroke="#d97706" />
        <rect x="25" y="31" width="10" height="7" rx="2" fill="#f59e0b" stroke="#d97706" />
        <rect x="40" y="25" width="10" height="10" rx="2" fill="#f59e0b" stroke="#d97706" />
        
        {/* Steering Wheel */}
        <circle cx="55" cy="30" r="3" fill="#475569" />
        
        {/* Windshield */}
        <path d="M 60,18 L 85,20 Q 95,30 85,40 L 60,42 Q 65,30 60,18 Z" fill="url(#glass)" opacity="0.9" />

        {/* Vibrating Outboard Motor */}
        <motion.g animate={{ x: [0, -1, 1, -1, 1, 0] }} transition={{ duration: 0.1, repeat: Infinity }}>
            <rect x="2" y="22" width="12" height="16" rx="3" fill="#1e293b" stroke="#0f172a" />
            <rect x="0" y="26" width="6" height="8" rx="1" fill="#ef4444" />
        </motion.g>
    </svg>
);

const Dock = () => (
    <div className="absolute top-0 left-0 w-full h-[160px] z-0 overflow-hidden">
        {/* Base shadow for 3D depth */}
        <div className="absolute inset-0 bg-[#334155] translate-y-4 rounded-b-xl" />
        
        {/* Top Surface with Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#94a3b8] to-[#cbd5e1] border-b-[16px] border-[#64748b] shadow-2xl rounded-b-xl">
            
            {/* Safety stripes on bottom edge */}
            <div className="absolute left-0 bottom-0 w-full h-4" style={{ backgroundImage: "repeating-linear-gradient(45deg, #facc15, #facc15 15px, #0f172a 15px, #0f172a 30px)" }} />
            
            {/* Dock floor grid/panels */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)", backgroundSize: "40px 40px" }} />
            
            {/* 3D Cargo Stacks on Dock */}
            <div className="absolute top-10 left-32">
                <div className="absolute top-2 left-2 w-28 h-14 bg-[#881337] rounded-sm" /> 
                <div className="relative w-28 h-14 bg-rose-600 rounded-sm border-2 border-rose-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center">
                    <div className="w-24 h-10 border border-rose-400/50" />
                </div>
            </div>
            
            <div className="absolute top-6 left-72 rotate-2">
                <div className="absolute top-2 left-2 w-28 h-14 bg-[#075985] rounded-sm" /> 
                <div className="relative w-28 h-14 bg-sky-600 rounded-sm border-2 border-sky-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center">
                    <div className="w-24 h-10 border border-sky-400/50" />
                </div>
            </div>

            <div className="absolute top-16 left-[450px] -rotate-1">
                <div className="absolute top-2 left-2 w-28 h-14 bg-[#78350f] rounded-sm" /> 
                <div className="relative w-28 h-14 bg-amber-600 rounded-sm border-2 border-amber-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center">
                    <div className="w-24 h-10 border border-amber-400/50" />
                </div>
            </div>

            <div className="absolute top-8 right-80 rotate-3">
                <div className="absolute top-2 left-2 w-28 h-14 bg-[#064e3b] rounded-sm" /> 
                <div className="relative w-28 h-14 bg-emerald-600 rounded-sm border-2 border-emerald-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center">
                    <div className="w-24 h-10 border border-emerald-400/50" />
                </div>
            </div>

            {/* Realistic 3D Crane (pointing down towards ships) */}
            <div className="absolute top-[-20px] right-32 w-48 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]">
                <motion.svg animate={{ rotate: [60, 100, 60] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} viewBox="0 0 100 100" className="w-full h-full overflow-visible origin-center">
                    {/* Crane Base track */}
                    <circle cx="50" cy="50" r="24" fill="#475569" stroke="#1e293b" strokeWidth="2" />
                    <circle cx="50" cy="50" r="20" fill="#facc15" stroke="#ca8a04" strokeWidth="4" />
                    {/* Crane Arm */}
                    <path d="M 50,44 L -70,44 L -70,56 L 50,56 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                    {/* Crane Arm details */}
                    <line x1="-60" y1="44" x2="-50" y2="56" stroke="#ca8a04" strokeWidth="2" />
                    <line x1="-40" y1="44" x2="-30" y2="56" stroke="#ca8a04" strokeWidth="2" />
                    <line x1="-20" y1="44" x2="-10" y2="56" stroke="#ca8a04" strokeWidth="2" />
                    <line x1="0" y1="44" x2="10" y2="56" stroke="#ca8a04" strokeWidth="2" />
                    <line x1="20" y1="44" x2="30" y2="56" stroke="#ca8a04" strokeWidth="2" />
                    
                    {/* Counterweight */}
                    <rect x="50" y="40" width="35" height="20" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="2" />
                    {/* Cabin */}
                    <rect x="25" y="60" width="18" height="18" rx="2" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" />
                </motion.svg>
            </div>
        </div>
    </div>
);

export default function HarborFleetLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const sailControls = useAnimation();

    const shake: any = { x: [0, -3, 3, -3, 3, 0], y: [0, 1, -1, 1, -1, 0], transition: { duration: 0.3, repeat: Infinity } };
    const bob1: any = { y: [0, -4, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
    const bob2: any = { y: [0, 4, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } };
    const bob3: any = { y: [0, -3, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };

    const validateCredentials = () => email === DEMO_EMAIL && password === DEMO_PASSWORD;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== "idle") return;

        if (!email || !password) {
            // Little error shake
            await sailControls.start(i => ({
                x: [0, -10, 10, -5, 5, 0],
                transition: { duration: 0.4, delay: i * 0.1 }
            }));
            return;
        }

        setStatus("submitting");
        const passed = validateCredentials();

        // Let the wake animate and engines rev
        await new Promise(r => setTimeout(r, 1800));

        if (passed) {
            setStatus("success");
            await sailControls.start(i => ({
                x: "150vw", // Sail horizontally to the right
                transition: { duration: 3.5, delay: i * 0.2, ease: "easeIn" }
            }));
        } else {
            setStatus("failure");
            // Sail horizontally to the right
            await sailControls.start(i => ({
                x: "150vw",
                transition: { duration: 2.5, delay: i * 0.15, ease: "easeIn" }
            }));

            // Reset the form values while out of sight
            setEmail("");
            setPassword("");

            // Teleport to the left side out of sight
            sailControls.set({ x: "-150vw" });

            // Sail back in to original positions from the left
            await sailControls.start(i => ({
                x: 0,
                transition: { duration: 3.0, delay: i * 0.2, ease: "easeOut" }
            }));

            setStatus("idle");
        }
    };

    return (
        <div className="relative w-full min-h-[700px] overflow-hidden rounded-2xl bg-[#3eb1ae] flex items-center justify-center font-sans">
            
            {/* Animated Water Caustics */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <WaterTexture />
                <motion.rect 
                    width="200%" 
                    height="200%" 
                    fill="url(#caustics)" 
                    animate={{ x: [0, -100], y: [0, -100] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }} 
                />
            </svg>

            {/* Deep water gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#065f61]/40 to-transparent pointer-events-none z-0" />

            {/* 3D Detailed Dock on the top */}
            <Dock />

            {/* The Form - perfectly aligned ships */}
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center gap-10 mt-20">
                
                {/* Email Cargo Ship */}
                <motion.div custom={0} animate={sailControls} className="relative w-[380px] h-[100px]">
                    <motion.div animate={status === "submitting" ? shake : bob1} className="w-full h-full relative">
                        <Wake active={status === "submitting" || status === "success" || status === "failure"} />
                        <CargoShipSVG color="#ef4444" />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            disabled={status !== "idle"}
                            onChange={e => setEmail(e.target.value)}
                            className="absolute left-[80px] top-[25px] w-[210px] h-[50px] bg-slate-100 border-[3px] border-slate-300 rounded shadow-[0_5px_15px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.1)] outline-none text-center font-black text-slate-800 placeholder:text-slate-400 focus:border-sky-500 disabled:opacity-80 transition-colors z-10 px-4 truncate" 
                            style={{ 
                                // Corrugated metal look for the cargo container
                                backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.06) 15px, rgba(0,0,0,0.06) 30px)"
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Password Cargo Ship */}
                <motion.div custom={1} animate={sailControls} className="relative w-[380px] h-[100px]">
                    <motion.div animate={status === "submitting" ? shake : bob2} className="w-full h-full relative">
                        <Wake active={status === "submitting" || status === "success" || status === "failure"} />
                        <CargoShipSVG color="#f59e0b" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            disabled={status !== "idle"}
                            onChange={e => setPassword(e.target.value)}
                            className="absolute left-[80px] top-[25px] w-[210px] h-[50px] bg-slate-100 border-[3px] border-slate-300 rounded shadow-[0_5px_15px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.1)] outline-none text-center font-black text-slate-800 placeholder:text-slate-400 focus:border-sky-500 disabled:opacity-80 transition-colors z-10 px-4 tracking-[0.2em] truncate" 
                            style={{ 
                                backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.06) 15px, rgba(0,0,0,0.06) 30px)"
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Login Speedboat */}
                <motion.div custom={2} animate={sailControls} className="relative w-[160px] h-[60px] cursor-pointer">
                    <motion.div animate={status === "submitting" ? shake : bob3} className="w-full h-full relative">
                        <Wake active={status === "submitting" || status === "success" || status === "failure"} />
                        <SpeedBoatSVG />
                        <button 
                            type="submit" 
                            disabled={status !== "idle"}
                            className="absolute left-[45px] top-[18px] w-[60px] h-[24px] bg-sky-500/90 hover:bg-sky-400 border border-sky-300 text-white text-[10px] font-black tracking-widest rounded shadow-[0_2px_5px_rgba(0,0,0,0.3)] disabled:opacity-80 transition-colors z-10 outline-none focus:ring-2 focus:ring-white"
                        >
                            LOGIN
                        </button>
                    </motion.div>
                </motion.div>

            </form>

            {/* Floating Clouds (Above everything) */}
            <Cloud delay={0} y={50} scale={1.2} duration={45} />
            <Cloud delay={15} y={350} scale={0.8} duration={35} />
            <Cloud delay={30} y={150} scale={1.5} duration={55} />
            <Cloud delay={5} y={550} scale={1.0} duration={40} />

            {/* Success Banner */}
            {status === "success" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute z-40 bg-white/90 backdrop-blur-md px-12 py-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-emerald-500 flex flex-col items-center"
                >
                    <span className="text-2xl font-black text-emerald-600 tracking-widest uppercase mb-2">Welcome Ashore</span>
                    <span className="text-sm font-bold text-slate-500">Fleet successfully docked.</span>
                </motion.div>
            )}

        </div>
    );
}
