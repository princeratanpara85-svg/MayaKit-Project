"use client";

import { Canvas } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import { cn } from "@/lib/utils";

/** GlassOrb3D — Glass orb with refraction (MeshTransmissionMaterial). */
function Orb() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.04}
          backside
          backsideThickness={0.3}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

export default function GlassOrb3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-fuchsia-900/40 to-cyan-900/40", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} />
        <Environment preset="city" />
        <Orb />
      </Canvas>
    </div>
  );
}
