"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { cn } from "@/lib/utils";

const SUITS = ["♠", "♥", "♦", "♣", "♠"];
const VALUES = ["A", "K", "Q", "J", "10"];

function Card({ idx, fanned, suit, value }: { idx: number; fanned: boolean; suit: string; value: string }) {
  const ref = useRef<any>(null);
  
  // Create a rock-solid canvas texture to perfectly layout the playing card text without Troika bugs
  const materials = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 731; // aspect ratio 0.7 to 1
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const color = (suit === "♥" || suit === "♦") ? "#ef4444" : "#171717";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Top Left Corner
      ctx.font = "bold 90px Arial, sans-serif";
      ctx.fillText(value, 80, 90);
      ctx.font = "90px Arial, sans-serif";
      ctx.fillText(suit, 80, 180);

      // Bottom Right Corner (inverted)
      ctx.save();
      ctx.translate(canvas.width, canvas.height);
      ctx.rotate(Math.PI);
      ctx.font = "bold 90px Arial, sans-serif";
      ctx.fillText(value, 80, 90);
      ctx.font = "90px Arial, sans-serif";
      ctx.fillText(suit, 80, 180);
      ctx.restore();

      // Center Huge Suit
      ctx.font = "280px Arial, sans-serif";
      ctx.fillText(suit, canvas.width / 2, canvas.height / 2 + 20);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16; // high quality

    const sideMat = new THREE.MeshStandardMaterial({ color: "white" });
    const frontMat = new THREE.MeshStandardMaterial({ map: tex });
    
    // Box geometry materials: right, left, top, bottom, front, back
    return [sideMat, sideMat, sideMat, sideMat, frontMat, sideMat];
  }, [suit, value]);

  useFrame((s) => { 
    if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime + idx) * 0.05; 
  });

  const target = fanned ? [(idx - 2) * 0.4, Math.cos((idx - 2) * 0.5) * 0.2 - 0.2, idx * 0.02] : [0, 0, idx * 0.025];
  const targetRot = fanned ? [0, 0, (2 - idx) * 0.15] : [0, 0, 0];

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += (target[0] - ref.current.position.x) * 0.1;
      ref.current.position.y += (target[1] - ref.current.position.y) * 0.1;
      ref.current.position.z += (target[2] - ref.current.position.z) * 0.1;
      ref.current.rotation.x += (targetRot[0] - ref.current.rotation.x) * 0.1;
      ref.current.rotation.y += (targetRot[1] - ref.current.rotation.y) * 0.1;
      ref.current.rotation.z += (targetRot[2] - ref.current.rotation.z) * 0.1;
    }
  });

  return (
    <mesh ref={ref} castShadow material={materials}>
      <boxGeometry args={[0.7, 1, 0.02]} />
    </mesh>
  );
}

/** CardDeck3D — Card deck that fans out in 3D. */
export default function CardDeck3D({ className }: { className?: string }) {
  const [fanned, setFanned] = useState(false);
  return (
    <div
      onMouseEnter={() => setFanned(true)}
      onMouseLeave={() => setFanned(false)}
      className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-emerald-900/30 to-teal-900/30 cursor-pointer", className)}
    >
      <Canvas shadows camera={{ position: [0, 0.4, 2.5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={1} castShadow />
        {VALUES.map((v, i) => (
          <Card key={i} idx={i} fanned={fanned} suit={SUITS[i]} value={v} />
        ))}
      </Canvas>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50">Hover to fan the deck</div>
    </div>
  );
}
