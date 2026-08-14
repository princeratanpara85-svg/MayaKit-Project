"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Shell() {
  const ref = useRef<any>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.2; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.3, 128, 128]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        iridescence={1}
        iridescenceIOR={1.8}
        iridescenceThicknessRange={[100, 800]}
        clearcoat={1}
      />
    </mesh>
  );
}

/** IridescentShell3D — Iridescent / thin-film shell. */
export default function IridescentShell3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-rose-900/30 to-cyan-900/30", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <Shell />
      </Canvas>
    </div>
  );
}
