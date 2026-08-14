"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

const PAGES: any = {
    about: {
        label: "About Us",
        content: (
            <div className="p-12 w-full h-full min-h-[340px]">
                <span className="text-xs font-semibold tracking-[0.2em] text-sky-400 uppercase">Who we are</span>
                <h1 className="text-4xl font-bold text-white mt-3">About Us</h1>
                <p className="text-neutral-400 mt-4 max-w-md">
                    Founded on the idea that good design should feel inevitable — we build tools people actually enjoy using.
                </p>
            </div>
        ),
    },
    contact: {
        label: "Contact",
        content: (
            <div className="p-12 w-full h-full min-h-[340px] bg-yellow-400 text-black">
                <span className="text-xs font-semibold tracking-[0.2em] text-black/60 uppercase">Get in touch</span>
                <h1 className="text-4xl font-bold text-black mt-3">Contact</h1>
                <p className="text-black/80 mt-4 max-w-md">
                    hello@studio.com — usually replies within a day. Or just say hi, we don't bite.
                </p>
            </div>
        ),
    },
};

const COLS = 8;
const ROWS = 5;
const FLIP_DURATION = 380;
const STAGGER_UNIT = 32;

export default function DOMBoxFlipTransition() {
    const [current, setCurrent] = useState("about");
    const [flip, setFlip] = useState<any>(null); // { oldId, newId, origin, w, h }
    const [busy, setBusy] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useCallback(
        (id: string) => {
            if (busy || id === current || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const order = Object.keys(PAGES);
            const origin = order.indexOf(id) > order.indexOf(current) ? "br" : "tl";

            setBusy(true);
            setFlip({ oldId: current, newId: id, origin, w: rect.width, h: rect.height });

            const maxDist = Math.hypot(COLS, ROWS);
            const totalTime = maxDist * STAGGER_UNIT + FLIP_DURATION;

            setTimeout(() => {
                setCurrent(id);
                setFlip(null);
                setBusy(false);
            }, totalTime + 40);
        },
        [busy, current]
    );

    const tileW = flip ? flip.w / COLS : 0;
    const tileH = flip ? flip.h / ROWS : 0;

    return (
        <div className="bg-neutral-950 rounded-2xl overflow-hidden">
            <style>{`
        @media (prefers-reduced-motion: reduce) {
          .flip-card { transition-duration: 150ms !important; }
        }
      `}</style>

            <nav className="flex gap-6 px-8 py-5 border-b border-neutral-800">
                {Object.entries(PAGES).map(([id, p]: [string, any]) => (
                    <button
                        key={id}
                        onClick={() => navigate(id)}
                        disabled={busy}
                        className={`text-sm font-medium transition-colors duration-150 disabled:cursor-wait ${current === id ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                            }`}
                    >
                        {p.label}
                    </button>
                ))}
            </nav>

            <div 
                ref={containerRef} 
                className="relative min-h-[340px]"
                style={flip ? { height: flip.h, width: flip.w } : undefined}
            >
                {/* the real live page — single copy, always the source of truth */}
                {!flip && PAGES[current].content}

                {/* while flipping, real content is hidden behind the tile grid, which
            itself contains the SAME live content, just clipped into windows */}
                {flip && (
                    <div className="absolute inset-0" style={{ perspective: 1400 }}>
                        {Array.from({ length: ROWS }).map((_, r) =>
                            Array.from({ length: COLS }).map((_, c) => {
                                const dist =
                                    flip.origin === "br"
                                        ? Math.hypot(COLS - 1 - c, ROWS - 1 - r)
                                        : Math.hypot(c, r);
                                const delay = dist * STAGGER_UNIT;
                                const offsetX = -c * tileW;
                                const offsetY = -r * tileH;

                                return (
                                    <div
                                        key={`${r}-${c}`}
                                        className="absolute overflow-hidden"
                                        style={{
                                            left: c * tileW,
                                            top: r * tileH,
                                            width: tileW + 0.5,
                                            height: tileH + 0.5,
                                        }}
                                    >
                                        <div
                                            className="flip-card relative w-full h-full"
                                            style={{
                                                transformStyle: "preserve-3d",
                                                transform: "rotateY(0deg)",
                                                animation: `card-flip ${FLIP_DURATION}ms cubic-bezier(0.77,0,0.175,1) ${delay}ms forwards`,
                                            }}
                                        >
                                            {/* FRONT face — a window onto the OLD page's real content,
                          shifted so this exact square lines up with the full layout */}
                                            <div
                                                className="absolute inset-0 overflow-hidden"
                                                style={{ backfaceVisibility: "hidden" }}
                                            >
                                                <div
                                                    className="absolute"
                                                    style={{ width: flip.w, height: flip.h, left: offsetX, top: offsetY }}
                                                >
                                                    {PAGES[flip.oldId].content}
                                                </div>
                                            </div>

                                            {/* BACK face — a window onto the NEW page's real content,
                          same crop coordinates, pre-rotated so it's correct once flipped */}
                                            <div
                                                className="absolute inset-0 overflow-hidden"
                                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                            >
                                                <div
                                                    className="absolute"
                                                    style={{ width: flip.w, height: flip.h, left: offsetX, top: offsetY }}
                                                >
                                                    {PAGES[flip.newId].content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <style>{`
              @keyframes card-flip {
                to { transform: rotateY(180deg); }
              }
            `}</style>
                    </div>
                )}
            </div>
        </div>
    );
}