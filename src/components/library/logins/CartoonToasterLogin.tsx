"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DEMO_EMAIL = "toast@retro.com";
const DEMO_PASSWORD = "crispy";

const eyeVariants = {
    idle: { scaleY: 1, rotate: 0 },
    submitting: { scaleY: 0.2, rotate: 0 },
    success: { scaleY: 1.3, rotate: 0 },
    failure: { scaleY: 1, rotate: 20 }
};

const mouthVariants = {
    idle: { width: 50, height: 25, borderBottomWidth: 8, borderTopWidth: 0, borderRadius: "0 0 100px 100px", rotate: 0, backgroundColor: "transparent" },
    submitting: { width: 24, height: 24, borderBottomWidth: 8, borderTopWidth: 8, borderRadius: "50%", rotate: 0, backgroundColor: "#000" },
    success: { width: 80, height: 40, borderBottomWidth: 8, borderTopWidth: 0, borderRadius: "0 0 100px 100px", rotate: 0, backgroundColor: "transparent" },
    failure: { width: 40, height: 16, borderBottomWidth: 0, borderTopWidth: 8, borderRadius: "100px 100px 0 0", rotate: -15, backgroundColor: "transparent" }
};

const BreadSlot = ({ type, label, value, onChange, disabled, toastState, status }: any) => {
    const isBurnt = toastState === "burnt";
    const isGolden = toastState === "golden";

    return (
        <div className={`relative w-[200px] h-[240px] border-8 border-black rounded-t-[50px] rounded-b-3xl flex flex-col items-center justify-center shadow-[inset_-10px_-10px_0px_rgba(0,0,0,0.15)] transition-colors duration-500 ${isBurnt ? 'bg-[#334155]' : isGolden ? 'bg-[#f59e0b]' : 'bg-[#fef08a]'}`}>
            
            <div className={`absolute inset-0 border-[16px] rounded-t-[42px] rounded-b-2xl pointer-events-none transition-colors duration-500 ${isBurnt ? 'border-[#0f172a]' : isGolden ? 'border-[#b45309]' : 'border-[#d97706]'}`} />
            
            {toastState === "raw" ? (
                <div className="flex flex-col items-center w-full px-5 relative z-10 -mt-10">
                    <label className="font-black text-black uppercase tracking-widest mb-2 text-lg drop-shadow-[1px_1px_0px_#fff]">{label}</label>
                    <input 
                        type={type} 
                        value={value} 
                        onChange={onChange} 
                        disabled={disabled}
                        placeholder={type === "password" ? "••••••••" : "Enter " + label}
                        className="w-full h-14 border-4 border-black rounded-xl px-3 font-black text-lg bg-white placeholder:text-slate-300 focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_#000] transition-all"
                    />
                </div>
            ) : toastState === "golden" ? (
                <div className="font-black text-white text-5xl uppercase tracking-widest relative z-10 drop-shadow-[4px_4px_0px_#000]">YUM!</div>
            ) : (
                <div className="font-black text-white text-4xl uppercase tracking-widest relative z-10 drop-shadow-[4px_4px_0px_#000] text-center">BURNT<br/>OUT</div>
            )}
            
            {/* Smoke puffs if burnt */}
            {isBurnt && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: [0, 1, 0], y: -80, scale: [1, 2, 3] }} 
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute -top-16 flex gap-4 pointer-events-none"
                >
                    <div className="w-12 h-12 bg-slate-700 rounded-full blur-md opacity-80" />
                    <div className="w-16 h-16 bg-slate-800 rounded-full blur-md opacity-80 -mt-8" />
                </motion.div>
            )}
        </div>
    )
};

export default function CartoonToasterLogin() {
    const [email, setEmail] = useState(DEMO_EMAIL);
    const [password, setPassword] = useState(DEMO_PASSWORD);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");
    const [toastState, setToastState] = useState<"raw" | "golden" | "burnt">("raw");
    const [errorMessage, setErrorMessage] = useState("");
    
    const toasterControls = useAnimation();
    const leverControls = useAnimation();
    const breadControls = useAnimation();

    useEffect(() => {
        breadControls.set({ y: 0 });
        leverControls.set({ y: -60 });
    }, [breadControls, leverControls]);

    useEffect(() => {
        if (status === "idle") {
            toasterControls.start({ y: [0, -4, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } });
        }
    }, [status, toasterControls]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (status !== "idle") return;

        setStatus("submitting");
        setErrorMessage("");

        // Pull lever down
        leverControls.start({ y: 60, transition: { type: "spring", stiffness: 300 } });
        // Bread goes in (hidden)
        await breadControls.start({ y: 160, transition: { type: "spring", stiffness: 200 } });

        // Shaking while toasting
        toasterControls.start({
            x: [0, -6, 6, -5, 5, -4, 4, 0],
            y: [0, 3, -3, 4, -4, 3, -3, 0],
            transition: { duration: 0.15, repeat: 12 } // 1.8 seconds
        });

        await new Promise(r => setTimeout(r, 1800));

        const passed = email === DEMO_EMAIL && password === DEMO_PASSWORD;

        toasterControls.stop();
        toasterControls.set({ x: 0, y: 0 });

        if (passed) {
            setToastState("golden");
            setStatus("success");
            
            // Lever pops up
            leverControls.start({ y: -60, transition: { type: "spring", stiffness: 400 } });
            
            // Toast pops UP high
            await breadControls.start({ y: -100, transition: { type: "spring", stiffness: 350, bounce: 0.6 } });
        } else {
            setToastState("burnt");
            setStatus("failure");
            setErrorMessage("BURNT CREDENTIALS!");
            
            // Lever pops up
            leverControls.start({ y: -60, transition: { type: "spring", stiffness: 400 } });
            
            // Toast pops up a little (heavy and burnt)
            await breadControls.start({ y: -20, transition: { type: "spring", stiffness: 200, bounce: 0.2 } });
            
            // Wait to let user see burnt toast
            await new Promise(r => setTimeout(r, 2500));
            
            // Hide toast to reset
            setErrorMessage("");
            await breadControls.start({ y: 200, transition: { duration: 0.3 } });
            
            setToastState("raw");
            setEmail("");
            setPassword("");
            
            // Toast rises back to idle
            await breadControls.start({ y: 0, transition: { type: "spring", stiffness: 250, bounce: 0.4 } });
            setStatus("idle");
        }
    };

    return (
        <div className="relative w-full min-h-[750px] bg-[#fdf2f8] flex items-center justify-center p-8 overflow-hidden font-sans border-8 border-black rounded-3xl shadow-[0_0_0_10px_rgba(255,255,255,0.2)]">
            
            {/* Retro Kitchen Checkerboard */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ 
                backgroundImage: "linear-gradient(45deg, #fbcfe8 25%, transparent 25%, transparent 75%, #fbcfe8 75%, #fbcfe8), linear-gradient(45deg, #fbcfe8 25%, transparent 25%, transparent 75%, #fbcfe8 75%, #fbcfe8)", 
                backgroundPosition: "0 0, 60px 60px", 
                backgroundSize: "120px 120px" 
            }} />

            {/* Error Banner */}
            {errorMessage && (
                <motion.div 
                    initial={{ scale: 0, y: -50 }} 
                    animate={{ scale: 1, y: 0 }} 
                    className="absolute top-12 bg-[#ef4444] border-8 border-black text-white font-black px-10 py-5 rounded-3xl z-50 shadow-[10px_10px_0px_#000]"
                >
                    <h2 className="text-4xl uppercase tracking-widest drop-shadow-[3px_3px_0px_#000]">{errorMessage}</h2>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="relative w-[600px] h-[500px] flex justify-center items-end mt-20">
                
                {/* The hole in the toaster */}
                <div className="absolute top-[30px] w-[460px] h-[60px] bg-[#0f172a] rounded-[50px] border-8 border-black z-0 shadow-[inset_0px_10px_20px_rgba(0,0,0,0.8)]" />

                {/* The Bread container */}
                <motion.div animate={breadControls} className="absolute top-[-50px] flex gap-4 z-10">
                    <BreadSlot type="email" label="Email" value={email} onChange={(e: any) => { setEmail(e.target.value); setErrorMessage(""); }} disabled={status !== "idle"} toastState={toastState} status={status} />
                    <BreadSlot type="password" label="Password" value={password} onChange={(e: any) => { setPassword(e.target.value); setErrorMessage(""); }} disabled={status !== "idle"} toastState={toastState} status={status} />
                </motion.div>

                {/* The Toaster Front */}
                <motion.div animate={toasterControls} className="relative z-20 w-[540px] h-[300px] bg-[#2dd4bf] border-8 border-black rounded-[70px] shadow-[0_25px_0_rgba(0,0,0,0.15)] flex flex-col items-center pt-8">
                    
                    {/* Toaster top reflection line */}
                    <div className="absolute top-4 w-[460px] h-[20px] border-t-8 border-white/40 rounded-[100%]" />

                    {/* Heating Glow */}
                    <motion.div animate={{ opacity: status === "submitting" ? 1 : 0 }} className="absolute inset-0 bg-gradient-to-t from-red-500/0 via-red-500/40 to-orange-400/80 pointer-events-none rounded-[60px] mix-blend-overlay transition-opacity duration-300" />

                    {/* Toaster Face */}
                    <div className="mt-16 relative z-10 flex flex-col items-center">
                        
                        <div className="flex gap-20 mb-8">
                            {/* Left Eye */}
                            <motion.div animate={status} variants={eyeVariants} className="w-10 h-16 bg-black rounded-full overflow-hidden relative">
                                <div className="w-4 h-6 bg-white rounded-full absolute top-2 right-2" />
                            </motion.div>
                            {/* Right Eye */}
                            <motion.div animate={status} variants={eyeVariants} className="w-10 h-16 bg-black rounded-full overflow-hidden relative">
                                <div className="w-4 h-6 bg-white rounded-full absolute top-2 right-2" />
                            </motion.div>
                        </div>
                        
                        {/* Mouth */}
                        <motion.div animate={status} variants={mouthVariants} className="border-black border-x-0" />
                        
                        {/* Rosy Cheeks */}
                        <motion.div animate={{ opacity: status === "idle" || status === "success" ? 1 : 0 }} className="absolute top-12 -left-12 w-10 h-6 bg-rose-400/50 rounded-full blur-sm" />
                        <motion.div animate={{ opacity: status === "idle" || status === "success" ? 1 : 0 }} className="absolute top-12 -right-12 w-10 h-6 bg-rose-400/50 rounded-full blur-sm" />

                    </div>

                    {/* Toaster feet */}
                    <div className="absolute -bottom-10 left-20 w-16 h-12 bg-slate-300 border-8 border-black rounded-b-2xl z-[-1]" />
                    <div className="absolute -bottom-10 right-20 w-16 h-12 bg-slate-300 border-8 border-black rounded-b-2xl z-[-1]" />

                    {/* Lever mechanics */}
                    <div className="absolute -right-14 top-16 w-8 h-48 bg-[#0f172a] border-4 border-black rounded-full" />
                    
                    {/* The Lever Button */}
                    <motion.button 
                        type="submit"
                        animate={leverControls}
                        disabled={status !== "idle"}
                        className="absolute -right-24 top-24 w-28 h-20 bg-red-500 border-8 border-black rounded-full shadow-[8px_8px_0px_#000] flex items-center justify-center font-black text-white text-2xl tracking-widest z-30 cursor-pointer hover:bg-red-400 disabled:opacity-90 outline-none focus:bg-red-400"
                    >
                        PUSH
                    </motion.button>

                </motion.div>
            </form>
        </div>
    );
}
