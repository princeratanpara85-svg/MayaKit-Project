"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arms = 4, perArm = 600;
    const arr = new Float32Array(arms * perArm * 3);
    let i = 0;
    for (let a = 0; a < arms; a++) {
      for (let j = 0; j < perArm; j++) {
        const t = j / perArm;
        const r = t * 4 + (Math.random() - 0.5) * 0.3;
        const angle = a * (Math.PI * 2 / arms) + t * 4 + (Math.random() - 0.5) * 0.3;
        arr[i++] = Math.cos(angle) * r;
        arr[i++] = (Math.random() - 0.5) * 0.4 * (1 - t);
        arr[i++] = Math.sin(angle) * r;
      }
    }
    return arr;
  }, []);
  const colors = useMemo(() => {
    const arr = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i], z = positions[i + 2];
      const t = Math.hypot(x, z) / 4;
      const c = new THREE.Color().setHSL(0.6 + t * 0.3, 0.9, 0.5 + t * 0.3);
      arr[i] = c.r; arr[i + 1] = c.g; arr[i + 2] = c.b;
    }
    return arr;
  }, [positions]);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.1; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

/** ParticleGalaxy3D — Particle galaxy, slow rotation. */
export default function ParticleGalaxy3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      <Canvas camera={{ position: [0, 3, 5], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <Galaxy />
      </Canvas>
    </div>
  );
}
