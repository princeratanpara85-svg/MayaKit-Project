"use client";

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { LazyCanvas } from '@/components/three/LazyCanvas';

function Kaleidoscope({ url }: { url: string }) {
  const texture = useLoader(THREE.TextureLoader, url);
  const group = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (group.current) {
      // Idle spin animation
      group.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });
  
  const slices = 8;
  const geometries = [];
  
  // Create 8 radial slices
  for (let i = 0; i < slices; i++) {
    const angle = (i / slices) * Math.PI * 2;
    const geom = new THREE.PlaneGeometry(0.5, 1);
    geom.rotateZ(angle);
    geometries.push(geom);
  }
  
  return (
    <group ref={group}>
      {geometries.map((geom, i) => (
        <mesh key={i} geometry={geom}>
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function KaleidoscopeImage() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-none overflow-hidden bg-[#0C1E29] relative">
      <LazyCanvas camera={{ position: [0, 0, 1.2] }}>
        <Kaleidoscope url="https://picsum.photos/400/400" />
        {/* Disable zoom to protect page scrolling! */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </LazyCanvas>
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10">
        DRAG TO ROTATE
      </span>
    </div>
  );
}
