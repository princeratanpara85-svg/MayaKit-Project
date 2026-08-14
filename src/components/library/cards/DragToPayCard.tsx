"use client";

import React, { useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Check, CreditCard, Nfc } from "lucide-react";

export default function DragToPayCard() {
    const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
    const [cardNum, setCardNum] = useState("");
    const controls = useAnimation();
    const y = useMotionValue(0);
    const scale = useTransform(y, [0, 150], [1, 0.9]);
    const rotateX = useTransform(y, [0, 150], [0, 10]);

    const handleDragEnd = async (e: any, info: any) => {
        if (info.offset.y > 100) {
            setStatus("processing");
            // Pull the card completely behind the front lip
            await controls.start({ y: 300, transition: { duration: 0.5, ease: "backIn" } });
            
            // Simulate processing
            setTimeout(() => setStatus("success"), 1500);
            
            // Reset after a while
            setTimeout(() => {
                setStatus("idle");
                controls.set({ y: -200, opacity: 0 });
                controls.start({ y: 0, opacity: 1, transition: { delay: 0.5, type: "spring" } });
            }, 6000);
        } else {
            // Snap back
            controls.start({ y: 0, transition: { type: "spring", bounce: 0.5 } });
        }
    };

    return (
        <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-start pt-32 bg-neutral-900 overflow-hidden relative font-sans" style={{ perspective: "1000px" }}>
            
            <div className="absolute top-8 text-center z-50">
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-2">Checkout</h2>
                <p className="text-neutral-500 text-sm font-medium">Total: <span className="text-primary font-bold">$149.00</span></p>
            </div>

            {/* The Credit Card (Draggable) */}
            <motion.div
                drag={status === "idle" ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                animate={controls}
                style={{ y, scale, rotateX }}
                className="w-[320px] h-[200px] bg-gradient-to-tr from-neutral-800 to-neutral-700 rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-neutral-600 relative z-30 cursor-grab active:cursor-grabbing"
            >
                <div className="flex justify-between items-start">
                    <Nfc className="text-neutral-400 w-8 h-8 opacity-50" />
                    <CreditCard className="text-primary w-8 h-8" />
                </div>
                
                <div className="flex flex-col gap-3">
                    <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        value={cardNum}
                        onChange={e => setCardNum(e.target.value)}
                        className="bg-transparent text-white font-mono text-xl tracking-widest outline-none placeholder-neutral-500 w-full"
                        maxLength={19}
                        onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking input
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        <span>Cardholder Name</span>
                        <span>Exp 12/28</span>
                    </div>
                </div>
            </motion.div>

            {/* The Slot Architecture */}
            
            {/* 1. The dark hole of the slot (Behind the card) */}
            <div className="absolute bottom-[160px] w-[340px] h-6 bg-black rounded-full z-20 pointer-events-none shadow-[inset_0_5px_15px_rgba(0,0,0,1)] border-b border-neutral-800 flex items-center justify-center overflow-hidden">
                {status === "processing" && (
                    <motion.div 
                        initial={{ x: "-100%" }} 
                        animate={{ x: "100%" }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-1/2 h-full bg-primary/40 blur-md"
                    />
                )}
            </div>

            {/* 2. The Receipt (Slides up from the slot, Z-35 so it's above card but behind front lip) */}
            <div className="absolute bottom-[160px] w-64 h-[280px] z-[35] flex items-end justify-center pointer-events-none overflow-hidden">
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: status === "success" ? "0%" : "100%" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8, delay: 0.2 }}
                    className="w-full h-full bg-white text-black p-6 rounded-t-xl relative flex flex-col"
                >
                    <div className="flex flex-col items-center gap-2 mb-6 mt-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <Check className="w-8 h-8 stroke-[3]" />
                        </div>
                        <h3 className="font-black text-2xl uppercase tracking-widest">Paid</h3>
                    </div>
                    <div className="flex justify-between border-b border-neutral-300 pb-2 mb-2 text-sm font-bold">
                        <span>Total</span>
                        <span>$149.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-6">
                        <span>Visa</span>
                        <span>**** {cardNum.slice(-4) || "0000"}</span>
                    </div>
                    
                    {/* Barcode graphic */}
                    <div className="flex-1 flex items-end justify-center pb-4 opacity-30 gap-[3px]">
                        {[2.4, 4.1, 1.2, 3.8, 2.1, 1.5, 4.8, 2.9, 1.1, 3.4, 4.2, 1.8, 2.5, 3.1, 4.6, 1.3, 2.7, 3.9, 1.6, 4.5].map((w, i) => (
                            <div key={i} className="bg-black h-8" style={{ width: `${w}px` }} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* 3. The Front Lip (Covers everything that slides down, Z-40) */}
            <div className="absolute bottom-0 left-0 right-0 h-[170px] bg-neutral-900 z-40 pointer-events-none shadow-[0_-20px_30px_rgba(0,0,0,0.5)] border-t border-neutral-800/50 flex flex-col items-center pt-8">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest animate-pulse">
                    {status === "idle" ? "↓ Drag Card Down To Pay ↓" : status === "processing" ? "Processing Transaction..." : "Transaction Complete"}
                </p>
            </div>

        </div>
    );
}
