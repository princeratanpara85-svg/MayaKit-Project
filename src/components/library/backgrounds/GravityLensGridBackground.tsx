"use client";

import React, { useEffect, useRef } from "react";

interface GravityLensGridBackgroundProps {
    children?: React.ReactNode;
}

export default function GravityLensGridBackground({ children }: GravityLensGridBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -999, y: -999, targetX: -999, targetY: -999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        let width: number, height: number, frame: number;
        const GRID_SIZE = 32;
        const LENS_RADIUS = 220;
        const LENS_STRENGTH = 60;

        const style = getComputedStyle(document.documentElement);
        const colorPrimary = style.getPropertyValue('--color-primary').trim() || '#FFFE15';
        const colorBorder = style.getPropertyValue('--color-border').trim() || 'rgba(255, 254, 21, 0.15)';

        const setup = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        setup();
        window.addEventListener("resize", setup);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.targetX = e.clientX - rect.left;
            mouseRef.current.targetY = e.clientY - rect.top;
        };
        canvas.addEventListener("mousemove", onMove);

        const warp = (x: number, y: number, mx: number, my: number) => {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.hypot(dx, dy);
            if (dist > LENS_RADIUS || dist < 1) return { x, y };
            const pull = (1 - dist / LENS_RADIUS) ** 2 * LENS_STRENGTH;
            const angle = Math.atan2(dy, dx);
            return {
                x: x - Math.cos(angle) * pull,
                y: y - Math.sin(angle) * pull,
            };
        };

        const tick = () => {
            ctx.clearRect(0, 0, width, height);

            // ease mouse toward target so the lens itself feels weighty
            mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
            mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            ctx.strokeStyle = colorBorder;
            ctx.lineWidth = 1;

            for (let y = 0; y <= height; y += GRID_SIZE) {
                ctx.beginPath();
                for (let x = 0; x <= width; x += 8) {
                    const w = warp(x, y, mx, my);
                    if (x === 0) ctx.moveTo(w.x, w.y);
                    else ctx.lineTo(w.x, w.y);
                }
                ctx.stroke();
            }
            for (let x = 0; x <= width; x += GRID_SIZE) {
                ctx.beginPath();
                for (let y = 0; y <= height; y += 8) {
                    const w = warp(x, y, mx, my);
                    if (y === 0) ctx.moveTo(w.x, w.y);
                    else ctx.lineTo(w.x, w.y);
                }
                ctx.stroke();
            }

            // dots at intersections, brighter near the lens
            for (let y = 0; y <= height; y += GRID_SIZE) {
                for (let x = 0; x <= width; x += GRID_SIZE) {
                    const w = warp(x, y, mx, my);
                    const dist = Math.hypot(x - mx, y - my);
                    const brightness = dist < LENS_RADIUS ? 1 - dist / LENS_RADIUS : 0;
                    ctx.beginPath();
                    ctx.arc(w.x, w.y, 1.4 + brightness * 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = colorPrimary;
                    ctx.globalAlpha = 0.2 + brightness * 0.7;
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                }
            }

            // faint event-horizon ring
            if (mx > -500) {
                ctx.beginPath();
                ctx.arc(mx, my, LENS_RADIUS * 0.18, 0, Math.PI * 2);
                ctx.strokeStyle = colorPrimary;
                ctx.globalAlpha = 0.15;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }

            frame = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", setup);
            canvas.removeEventListener("mousemove", onMove);
        };
    }, []);

    return (
        <div className="relative min-h-[600px] bg-background overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 pointer-events-none">{children}</div>
        </div>
    );
}
