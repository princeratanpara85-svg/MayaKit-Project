"use client";

import React, { useEffect, useRef } from "react";

interface ClothPokeBackgroundProps {
    children?: React.ReactNode;
}

export default function ClothPokeBackground({ children }: ClothPokeBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -999, y: -999, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        let width: number, height: number, cols: number, rows: number, spacing: number, points: any[][], frame: number;

        const SPRING = 0.045;
        const DAMPING = 0.92;
        const POKE_RADIUS = 90;
        const POKE_STRENGTH = 14;

        const style = getComputedStyle(document.documentElement);
        const colorPrimary = style.getPropertyValue('--color-primary').trim() || '#FFFE15';

        const setup = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            spacing = 34;
            cols = Math.ceil(width / spacing) + 2;
            rows = Math.ceil(height / spacing) + 2;
            points = [];
            for (let r = 0; r < rows; r++) {
                const row = [];
                for (let c = 0; c < cols; c++) {
                    const x = c * spacing;
                    const y = r * spacing;
                    row.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
                }
                points.push(row);
            }
        };
        setup();
        window.addEventListener("resize", setup);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
        };
        const onLeave = () => (mouseRef.current.active = false);
        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);

        const tick = () => {
            ctx.clearRect(0, 0, width, height);
            const m = mouseRef.current;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const p = points[r][c];
                    // spring pulling back to rest position
                    const dx = p.ox - p.x;
                    const dy = p.oy - p.y;
                    p.vx += dx * SPRING;
                    p.vy += dy * SPRING;

                    // cursor poke — pushes points away radially
                    if (m.active) {
                        const mdx = p.x - m.x;
                        const mdy = p.y - m.y;
                        const dist = Math.hypot(mdx, mdy);
                        if (dist < POKE_RADIUS && dist > 0.01) {
                            const force = (1 - dist / POKE_RADIUS) * POKE_STRENGTH;
                            p.vx += (mdx / dist) * force * 0.05;
                            p.vy += (mdy / dist) * force * 0.05;
                        }
                    }

                    p.vx *= DAMPING;
                    p.vy *= DAMPING;
                    p.x += p.vx;
                    p.y += p.vy;
                }
            }

            // draw grid mesh, brightness responds to local displacement
            ctx.strokeStyle = colorPrimary;
            ctx.globalAlpha = 0.25;
            ctx.lineWidth = 1;
            for (let r = 0; r < rows; r++) {
                ctx.beginPath();
                for (let c = 0; c < cols; c++) {
                    const p = points[r][c];
                    if (c === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
            for (let c = 0; c < cols; c++) {
                ctx.beginPath();
                for (let r = 0; r < rows; r++) {
                    const p = points[r][c];
                    if (r === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            frame = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", setup);
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div className="relative min-h-[600px] bg-background overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
            <div className="relative z-10 pointer-events-none">{children}</div>
        </div>
    );
}
