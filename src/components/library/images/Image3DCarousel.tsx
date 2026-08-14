"use client";

import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { LazyCanvas } from '@/components/three/LazyCanvas';

function Ring({ urls }: { urls: string[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  
  // Scale the carousel radius based on screen size so it always fits nicely
  const radius = Math.min(viewport.width, viewport.height) * 0.4;
  
  useFrame(({ clock }) => {
    if (group.current) {
      // Idle auto-rotation
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  
  const textures = urls.map(url => useLoader(THREE.TextureLoader, url));
  const count = urls.length;
  
  return (
    <group ref={group}>
      {textures.map((tex, i) => {
        const angle = (i / count) * Math.PI * 2;
        // The images shouldn't be too big on mobile
        const planeWidth = radius * 0.8;
        const planeHeight = planeWidth * 0.7;
        
        return (
          <mesh key={i} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]} rotation={[0, -angle, 0]}>
            <planeGeometry args={[planeWidth, planeHeight]} />
            <meshBasicMaterial map={tex} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Image3DCarousel() {
  const urls = [
    "https://picsum.photos/400/300?1",
    "https://picsum.photos/400/300?2",
    "https://picsum.photos/400/300?3",
    "https://picsum.photos/400/300?4",
  ];
  
  return (
    <div className="w-full h-full min-h-[400px] bg-[#0C1E29] rounded-none overflow-hidden relative">
      <LazyCanvas camera={{ position: [0, 0, 4] }}>
        <Ring urls={urls} />
        {/* Disable zoom to protect page scrolling! */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </LazyCanvas>
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10">
        DRAG TO SPIN
      </span>
    </div>
  );
}
