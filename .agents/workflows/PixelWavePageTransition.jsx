import React, { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";

const PAGES = {
    about: {
        label: "About Us",
        content: (
            <div className="p-12">
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
            <div className="p-12">
                <span className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">Get in touch</span>
                <h1 className="text-4xl font-bold text-white mt-3">Contact</h1>
                <p className="text-neutral-400 mt-4 max-w-md">
                    hello@studio.com — usually replies within a day. Or just say hi, we don't bite.
                </p>
            </div>
        ),
    },
};

const COLS = 16;
const ROWS = 10;
const TILE_DURATION = 340; // ms, per-tile fade/scale
const STAGGER_UNIT = 14; // ms, per grid-step of distance from the origin corner

export default function PixelWavePageTransition() {
    const [current, setCurrent] = useState("about");
    const [target, setTarget] = useState(null); // page id mid-transition, once swapped underneath
    const [tiles, setTiles] = useState(null); // { img, origin: 'tl'|'br', w, h }
    const [busy, setBusy] = useState(false);
    const containerRef = useRef(null);

    const navigate = useCallback(
        async (id) => {
            if (busy || id === current) return;
            setBusy(true);

            const el = containerRef.current;
            const rect = el.getBoundingClientRect();

            // capture the CURRENT page exactly as rendered — real pixels, not a mockup
            const canvas = await html2canvas(el, { backgroundColor: "#0a0a0a", scale: 1 });
            const img = canvas.toDataURL("image/png");

            // wave direction: forward nav enters from bottom-right, back nav from top-left
            const order = Object.keys(PAGES);
            const origin = order.indexOf(id) > order.indexOf(current) ? "br" : "tl";

            setTiles({ img, origin, w: rect.width, h: rect.height });
            // swap the REAL page underneath immediately — the tile overlay is the only thing hiding it
            setTarget(id);

            const maxDist = Math.hypot(COLS, ROWS);
            const totalTime = maxDist * STAGGER_UNIT + TILE_DURATION;

            setTimeout(() => {
                setCurrent(id);
                setTarget(null);
                setTiles(null);
                setBusy(false);
            }, totalTime + 40);
        },
        [busy, current]
    );

    const tileWidth = tiles ? tiles.w / COLS : 0;
    const tileHeight = tiles ? tiles.h / ROWS : 0;

    return (
        <div className="bg-neutral-950 rounded-2xl overflow-hidden">
            <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wave-tile { transition-duration: 120ms !important; transition-delay: 0ms !important; }
        }
      `}</style>

            <nav className="flex gap-6 px-8 py-5 border-b border-neutral-800">
                {Object.entries(PAGES).map(([id, p]) => (
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

            <div ref={containerRef} className="relative min-h-[340px]">
                {/* real live page, already swapped underneath */}
                {PAGES[target ?? current].content}

                {/* tile overlay: the departing screenshot of the OLD page */}
                {tiles && (
                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: ROWS }).map((_, r) =>
                            Array.from({ length: COLS }).map((_, c) => {
                                const dist =
                                    tiles.origin === "br"
                                        ? Math.hypot(COLS - 1 - c, ROWS - 1 - r)
                                        : Math.hypot(c, r);
                                return (
                                    <div
                                        key={`${r}-${c}`}
                                        className="wave-tile absolute"
                                        style={{
                                            left: c * tileWidth,
                                            top: r * tileHeight,
                                            width: tileWidth + 0.5, // slight overlap hides sub-pixel seams
                                            height: tileHeight + 0.5,
                                            backgroundImage: `url(${tiles.img})`,
                                            backgroundSize: `${tiles.w}px ${tiles.h}px`,
                                            backgroundPosition: `-${c * tileWidth}px -${r * tileHeight}px`,
                                            opacity: 1,
                                            transform: "scale(1)",
                                            animation: `wave-out ${TILE_DURATION}ms cubic-bezier(0.23,1,0.32,1) ${dist * STAGGER_UNIT}ms forwards`,
                                        }}
                                    />
                                );
                            })
                        )}
                        <style>{`
              @keyframes wave-out {
                to { opacity: 0; transform: scale(0.92); }
              }
            `}</style>
                    </div>
                )}
            </div>
        </div>
    );
}