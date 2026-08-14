"use client";

import React, { useEffect, useRef } from "react";

interface BoidSwarmBackgroundProps {
    children?: React.ReactNode;
}

export default function BoidSwarmBackground({ children }: BoidSwarmBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -999, y: -999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        let width: number, height: number, boids: any[], frame: number;

        const COUNT = 90;
        const FEAR_RADIUS = 100;

        const style = getComputedStyle(document.documentElement);
        const colorPrimary = style.getPropertyValue('--color-primary').trim() || '#FFFE15';
        const colorBg = style.getPropertyValue('--color-background').trim() || '#0C1E29';

        const setup = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            if (!boids) {
                boids = Array.from({ length: COUNT }, () => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    opacity: 0.5 + Math.random() * 0.5,
                }));
            }
        };
        setup();
        window.addEventListener("resize", setup);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", () => (mouseRef.current = { x: -999, y: -999 }));

        const tick = () => {
            // Slight trails
            ctx.fillStyle = colorBg;
            ctx.globalAlpha = 0.25;
            ctx.fillRect(0, 0, width, height);
            ctx.globalAlpha = 1.0;
            
            const m = mouseRef.current;

            boids.forEach((b, i) => {
                let sepX = 0, sepY = 0, aliX = 0, aliY = 0, cohX = 0, cohY = 0, count = 0;

                boids.forEach((other, j) => {
                    if (i === j) return;
                    const dx = other.x - b.x;
                    const dy = other.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 40 && dist > 0) {
                        sepX -= dx / dist;
                        sepY -= dy / dist;
                    }
                    if (dist < 70) {
                        aliX += other.vx;
                        aliY += other.vy;
                        cohX += other.x;
                        cohY += other.y;
                        count++;
                    }
                });

                if (count > 0) {
                    aliX /= count; aliY /= count;
                    cohX = cohX / count - b.x;
                    cohY = cohY / count - b.y;
                }

                // fear response — strong, immediate, overrides flocking briefly
                const mdx = b.x - m.x;
                const mdy = b.y - m.y;
                const mdist = Math.hypot(mdx, mdy);
                let fearX = 0, fearY = 0;
                if (mdist < FEAR_RADIUS && mdist > 0) {
                    const force = (1 - mdist / FEAR_RADIUS) * 3.2;
                    fearX = (mdx / mdist) * force;
                    fearY = (mdy / mdist) * force;
                }

                b.vx += sepX * 0.05 + aliX * 0.02 + cohX * 0.0006 + fearX;
                b.vy += sepY * 0.05 + aliY * 0.02 + cohY * 0.0006 + fearY;

                const speed = Math.hypot(b.vx, b.vy);
                const maxSpeed = mdist < FEAR_RADIUS ? 5.5 : 2.2;
                if (speed > maxSpeed) {
                    b.vx = (b.vx / speed) * maxSpeed;
                    b.vy = (b.vy / speed) * maxSpeed;
                }

                b.x += b.vx;
                b.y += b.vy;

                if (b.x < 0) b.x = width;
                if (b.x > width) b.x = 0;
                if (b.y < 0) b.y = height;
                if (b.y > height) b.y = 0;

                const angle = Math.atan2(b.vy, b.vx);
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(6, 0);
                ctx.lineTo(-5, 3.5);
                ctx.lineTo(-5, -3.5);
                ctx.closePath();
                ctx.fillStyle = colorPrimary;
                ctx.globalAlpha = b.opacity;
                ctx.fill();
                ctx.restore();
            });

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
