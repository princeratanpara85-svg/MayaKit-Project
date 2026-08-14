"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * ShipVoyageLogin
 * Demo credentials:
 *   email:    captain@sea.com
 *   password: voyage123
 */
const DEMO_EMAIL = "captain@sea.com";
const DEMO_PASSWORD = "voyage123";

export default function ShipVoyageLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const boatControls = useAnimation();
    const crackControls = useAnimation();
    const shoreFlagControls = useAnimation();

    const resetVoyage = async () => {
        setStatus("idle");
        await boatControls.start({
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" },
        });
        crackControls.set({ opacity: 0 });
        shoreFlagControls.set({ scale: 0, opacity: 0 });
        boatControls.start({
            y: [0, -12, 0],
            rotate: [0, -1.5, 1.5, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        });
    };

    const validateCredentials = () => email === DEMO_EMAIL && password === DEMO_PASSWORD;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== "idle") return;

        if (!email || !password) {
            boatControls.start({
                rotate: [0, -4, 4, -2, 2, 0],
                transition: { duration: 0.5 },
            });
            return;
        }

        setStatus("submitting");
        const passed = validateCredentials();

        // brief anticipation pause
        await new Promise((r) => setTimeout(r, 600));

        if (passed) {
            setStatus("success");
            await boatControls.start({
                x: "100%", // Sail completely off to the right
                y: -10,
                rotate: 2,
                transition: { duration: 4, ease: [0.45, 0, 0.2, 1] },
            });
            shoreFlagControls.start({
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.5 },
            });
        } else {
            setStatus("failure");
            // capsize
            await boatControls.start({
                rotate: -65,
                x: -30,
                y: 40,
                transition: { duration: 0.8, ease: "easeIn" },
            });
            crackControls.start({ opacity: 1, transition: { duration: 0.25 } });
            await boatControls.start({
                y: 150,
                rotate: -85,
                opacity: 0,
                transition: { duration: 1.8, ease: "easeIn" },
            });
        }
    };

    useEffect(() => {
        // start idle bobbing on mount
        boatControls.start({
            y: [0, -12, 0],
            rotate: [0, -1.5, 1.5, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        });
    }, [boatControls]);

    return (
        <div className="relative w-full min-h-[700px] overflow-hidden rounded-2xl bg-gradient-to-b from-orange-200 via-rose-300 to-sky-600 flex items-center justify-center font-sans">
            
            {/* sun glow */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-300/40 blur-3xl pointer-events-none" />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white blur-[2px] pointer-events-none shadow-[0_0_50px_rgba(255,200,0,0.8)]" />

            {/* distant shore, right edge */}
            <div className="absolute right-0 bottom-[38%] w-64 h-64 z-10 pointer-events-none">
                <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-2xl opacity-80">
                    <path d="M60,220 Q40,140 70,80 Q90,30 130,10 L160,0 L160,220 Z" fill="#166534" />
                    <path d="M100,220 Q90,150 115,100 Q130,60 160,40 L160,220 Z" fill="#14532d" />
                </svg>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={shoreFlagControls}
                    className="absolute top-8 left-16 flex flex-col items-center"
                >
                    <div className="w-1 h-16 bg-neutral-800" />
                    <div className="absolute top-0 left-1 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded shadow-2xl whitespace-nowrap tracking-widest uppercase border border-emerald-400">
                        Voyage Approved
                    </div>
                </motion.div>
            </div>

            {/* sea layers, perfectly seamless infinite mathematical sine loop */}
            <div className="absolute bottom-0 left-0 right-0 h-[42%] overflow-hidden pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-700 to-sky-950" />
                {[
                    { opacity: 0.4, dur: 12, y: "10%", fill: "#0c4a6e" },
                    { opacity: 0.6, dur: 8, y: "35%", fill: "#075985" },
                    { opacity: 0.9, dur: 5, y: "62%", fill: "#0369a1" },
                ].map((wave, i) => (
                    <motion.svg
                        key={i}
                        viewBox="0 0 1600 120"
                        className="absolute w-[400%] h-24"
                        style={{ top: wave.y }}
                        animate={{ x: [0, "-50%"] }}
                        transition={{ duration: wave.dur, repeat: Infinity, ease: "linear" }}
                    >
                        {/* A perfectly repeating sine wave over 1600px width */}
                        <path
                            d="M0,60 Q100,20 200,60 T400,60 T600,60 T800,60 T1000,60 T1200,60 T1400,60 T1600,60 L1600,120 L0,120 Z"
                            fill={wave.fill}
                            opacity={wave.opacity}
                        />
                    </motion.svg>
                ))}
            </div>

            {/* THE REAL SHIP (Galleon) */}
            <motion.div
                animate={boatControls}
                className="absolute left-[5%] top-[25%] z-20 w-[550px] h-[350px] scale-[0.8] origin-bottom"
            >
                {/* crack overlay, hidden until failure */}
                <motion.svg
                    initial={{ opacity: 0 }}
                    animate={crackControls}
                    viewBox="0 0 200 60"
                    className="absolute bottom-[20px] left-[150px] w-64 h-24 z-30 pointer-events-none"
                >
                    <path d="M20,30 L45,10 L60,35 L85,15 L100,40 L120,20 L140,50" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
                </motion.svg>

                <form onSubmit={handleSubmit} className="w-full h-full relative">
                    
                    {/* SVG Base Hull & Masts */}
                    <svg viewBox="0 0 550 350" className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                        {/* Mast Poles */}
                        <rect x="116" y="20" width="8" height="230" fill="#2d1a11" />
                        <rect x="256" y="-30" width="12" height="290" fill="#2d1a11" />
                        <rect x="406" y="20" width="8" height="230" fill="#2d1a11" />
                        
                        {/* Waving Flag on Mainmast */}
                        <motion.path
                            d="M 262,-30 Q 300,-20 320,-40 Q 300,-10 262,0 Z"
                            fill="#be123c"
                            animate={{ 
                                d: [
                                    "M 262,-30 Q 300,-20 320,-40 Q 300,-10 262,0 Z",
                                    "M 262,-30 Q 280,-40 320,-20 Q 280,0 262,0 Z",
                                    "M 262,-30 Q 300,-20 320,-40 Q 300,-10 262,0 Z"
                                ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Crow's Nest (Mainmast) */}
                        <path d="M 246,15 L 278,15 L 272,30 L 252,30 Z" fill="#2d1a11" />

                        {/* Rigging / Rope Ladders (Ratlines) */}
                        <g stroke="#a8a29e" strokeWidth="1" opacity="0.4">
                            {/* Mainmast Rigging */}
                            <line x1="256" y1="30" x2="190" y2="160" />
                            <line x1="268" y1="30" x2="330" y2="180" />
                            <line x1="240" y1="60" x2="284" y2="60" />
                            <line x1="227" y1="90" x2="297" y2="90" />
                            <line x1="214" y1="120" x2="308" y2="120" />
                            <line x1="201" y1="150" x2="319" y2="150" />
                        </g>

                        {/* Swinging Lantern on Stern */}
                        <motion.g
                            animate={{ rotate: [15, -15, 15] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformOrigin: "40px 160px" }}
                        >
                            <line x1="40" y1="160" x2="30" y2="180" stroke="#ffb300" strokeWidth="2" />
                            <rect x="25" y="180" width="10" height="15" fill="#ffb300" rx="2" />
                            <circle cx="30" cy="187" r="4" fill="#fff" opacity="0.8" />
                            <circle cx="30" cy="187" r="10" fill="#ffb300" opacity="0.3" filter="blur(2px)" />
                        </motion.g>
                        
                        {/* Rudder */}
                        <path d="M 40,260 L 25,270 L 20,320 L 50,300 Z" fill="#3e2723" />

                        {/* Hull Base */}
                        <path d="M 40,160 Q 250,360 480,220 L 450,300 Q 250,380 60,300 Z" fill="#4e342e" />
                        
                        {/* Wood Planking Details */}
                        <path d="M 42,175 Q 250,370 472,235" stroke="#3e2723" strokeWidth="2" fill="none" opacity="0.5" />
                        <path d="M 45,190 Q 250,380 465,250" stroke="#3e2723" strokeWidth="2" fill="none" opacity="0.5" />
                        <path d="M 48,205 Q 250,390 458,265" stroke="#3e2723" strokeWidth="2" fill="none" opacity="0.5" />

                        {/* Golden Trim */}
                        <path d="M 40,160 Q 250,360 480,220" stroke="#ffb300" strokeWidth="4" fill="none" />
                        <path d="M 45,175 Q 250,375 475,235" stroke="#ffb300" strokeWidth="2" fill="none" />
                        
                        {/* Cannons with golden ports */}
                        <g fill="#000" stroke="#ffb300" strokeWidth="2">
                            <circle cx="150" cy="285" r="6" />
                            <circle cx="220" cy="295" r="6" />
                            <circle cx="290" cy="295" r="6" />
                            <circle cx="360" cy="285" r="6" />
                            <circle cx="430" cy="265" r="6" />
                        </g>

                        {/* Back Castle (Poop Deck) */}
                        <path d="M 40,160 L 30,100 L 130,140 L 140,205 Z" fill="#3e2723" />
                        <path d="M 40,160 L 30,100 L 130,140 L 140,205 Z" stroke="#ffb300" strokeWidth="2" fill="none" />
                        {/* Wooden arches / Railing on poop deck */}
                        <path d="M 30,100 Q 80,120 130,140" stroke="#ffb300" strokeWidth="2" fill="none" />
                        <line x1="50" y1="108" x2="50" y2="120" stroke="#ffb300" strokeWidth="2" />
                        <line x1="70" y1="116" x2="70" y2="128" stroke="#ffb300" strokeWidth="2" />
                        <line x1="90" y1="124" x2="90" y2="136" stroke="#ffb300" strokeWidth="2" />
                        <line x1="110" y1="132" x2="110" y2="144" stroke="#ffb300" strokeWidth="2" />

                        {/* Windows */}
                        <rect x="50" y="130" width="10" height="15" fill="#ffb300" transform="rotate(20 50 130)" />
                        <rect x="80" y="140" width="10" height="15" fill="#ffb300" transform="rotate(20 80 140)" />
                        
                        {/* Ship's Wheel (Steering wheel profile) */}
                        <path d="M 110,140 L 115,125 L 120,143 Z" fill="#ffb300" />
                        <circle cx="115" cy="125" r="5" fill="none" stroke="#2d1a11" strokeWidth="2" />

                        {/* Bowsprit */}
                        <polygon points="480,220 560,140 555,130 475,235" fill="#3e2723" />
                        {/* Ropes */}
                        <line x1="560" y1="140" x2="410" y2="40" stroke="#e7e5e4" strokeWidth="2" opacity="0.6" />
                        <line x1="410" y1="40" x2="260" y2="-30" stroke="#e7e5e4" strokeWidth="2" opacity="0.6" />
                        <line x1="260" y1="-30" x2="120" y2="20" stroke="#e7e5e4" strokeWidth="2" opacity="0.6" />
                        <line x1="120" y1="20" x2="30" y2="100" stroke="#e7e5e4" strokeWidth="2" opacity="0.6" />
                    </svg>

                    {/* The HTML Sails (Form Inputs) - wrapped in motion.div to simulate billowing wind */}

                    {/* Mizzenmast Sail (Submit Button - Smallest) */}
                    <motion.div 
                        animate={{ scaleX: [1, 1.05, 1], scaleY: [1, 1.02, 1] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[30px] left-[75px] w-[90px] h-[100px] z-10 flex flex-col items-center origin-top"
                    >
                        <div className="w-[110px] h-2 bg-[#2d1a11] rounded-full shadow-lg z-20 absolute -top-1" />
                        <button 
                            type="submit"
                            disabled={status !== "idle"}
                            className="w-full h-full bg-rose-700 outline-none text-center font-serif font-black text-white shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5),_0_10px_20px_rgba(0,0,0,0.4)] hover:bg-rose-600 transition-colors flex flex-col items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed border-b-4 border-rose-900"
                            style={{ borderRadius: "40% 40% 5% 5% / 15% 15% 30% 30%" }}
                        >
                            <span className="text-xs tracking-widest uppercase ml-1">Login</span>
                        </button>
                    </motion.div>

                    {/* Mainmast Sail (Email Input - Largest) */}
                    <motion.div 
                        animate={{ scaleX: [1, 1.06, 1], scaleY: [1, 1.03, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        className="absolute top-[-10px] left-[152px] w-[220px] h-[180px] z-10 flex flex-col items-center origin-top"
                    >
                        <div className="w-[240px] h-3 bg-[#2d1a11] rounded-full shadow-lg z-20 absolute -top-1.5" />
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            disabled={status !== "idle"}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-full bg-[#fcf5e5] outline-none text-center text-xl font-serif text-[#3e2723] placeholder:text-[#3e2723]/60 shadow-[inset_0_-20px_30px_rgba(0,0,0,0.15),_0_15px_25px_rgba(0,0,0,0.4)] transition-all focus:bg-white border-b-4 border-amber-200/50 disabled:opacity-80 disabled:bg-[#f3ead3] px-6 truncate"
                            style={{ borderRadius: "40% 40% 5% 5% / 15% 15% 25% 25%" }}
                        />
                    </motion.div>

                    {/* Foremast Sail (Password Input - Medium) */}
                    <motion.div 
                        animate={{ scaleX: [1, 1.05, 1], scaleY: [1, 1.02, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        className="absolute top-[40px] left-[335px] w-[150px] h-[150px] z-10 flex flex-col items-center origin-top"
                    >
                        <div className="w-[170px] h-2 bg-[#2d1a11] rounded-full shadow-lg z-20 absolute -top-1" />
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            disabled={status !== "idle"}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-full bg-[#fcf5e5] outline-none text-center text-lg font-serif text-[#3e2723] placeholder:text-[#3e2723]/60 shadow-[inset_0_-15px_20px_rgba(0,0,0,0.15),_0_10px_20px_rgba(0,0,0,0.4)] transition-all focus:bg-white border-b-4 border-amber-200/50 disabled:opacity-80 disabled:bg-[#f3ead3] px-4 truncate tracking-widest"
                            style={{ borderRadius: "40% 40% 5% 5% / 15% 15% 25% 25%" }}
                        />
                    </motion.div>
                    
                </form>
            </motion.div>

            {/* splash particles on failure */}
            {status === "failure" && (
                <div className="absolute left-[30%] top-[65%] z-20 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.span
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-sky-100 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{
                                x: (Math.random() - 0.5) * 200,
                                y: -Math.random() * 100 - 20,
                                opacity: 0,
                                scale: 0.2,
                            }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                    ))}
                </div>
            )}

            {/* result banner */}
            {(status === "success" || status === "failure") && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: status === "success" ? 3.0 : 2.0, duration: 0.6 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
                >
                    <span
                        className={`px-8 py-3 rounded-full text-base font-black shadow-2xl tracking-widest uppercase border ${status === "success" ? "bg-emerald-500 text-white border-emerald-400" : "bg-rose-900 text-rose-100 border-rose-700"
                            }`}
                    >
                        {status === "success" ? "Welcome Ashore, Captain." : "Lost At Sea. Access Denied."}
                    </span>
                    {status === "failure" && (
                        <button
                            type="button"
                            onClick={resetVoyage}
                            className="text-sm font-bold text-white/80 hover:text-white transition-colors cursor-pointer pointer-events-auto bg-black/50 px-4 py-2 rounded-full backdrop-blur-md"
                        >
                            Try the voyage again
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
}
