"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { cn } from "@/lib/utils";

function Geom({ position, geometry, color }: any) {
  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position} castShadow>
        {geometry}
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

/** FloatingGeometry3D — Floating geometric shapes. */
export default function FloatingGeometry3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-violet-900/30 to-rose-900/30", className)}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1} castShadow />
        <Environment preset="sunset" />
        <Geom position={[-1.5, 0, 0]} geometry={<torusKnotGeometry args={[0.5, 0.18, 100, 16]} />} color="#a855f7" />
        <Geom position={[1.5, 0, 0]} geometry={<icosahedronGeometry args={[0.7]} />} color="#ec4899" />
        <Geom position={[0, 1, 0]} geometry={<octahedronGeometry args={[0.6]} />} color="#22d3ee" />
        <Geom position={[0, -1.2, 0]} geometry={<dodecahedronGeometry args={[0.5]} />} color="#fbbf24" />
      </Canvas>
    </div>
  );
}
