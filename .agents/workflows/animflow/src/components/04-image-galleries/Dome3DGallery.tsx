import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const TILES = Array.from({ length: 18 }, (_, i) => ({
  hue: (i * 23) % 360,
  label: ["Aurora", "Tide", "Pulse", "Drift", "Echo", "Halo", "Storm", "Glow"][i % 8],
}));

function Photo({ idx, angle, radius, hue, label }: { idx: number; angle: number; radius: number; hue: number; label: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current?.parent?.parent) return;
    const group = ref.current.parent.parent;
    group.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={ref} position={[Math.sin(angle) * radius, Math.cos(idx * 0.5) * 1.5, Math.cos(angle) * radius]} rotation={[0, -angle + Math.PI / 2, 0]}>
      <mesh>
        <planeGeometry args={[1.6, 1]} />
        <meshBasicMaterial color={new THREE.Color().setHSL(hue / 360, 0.7, 0.5)} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.5, 0.2]} />
        <meshBasicMaterial color="white" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function Dome() {
  const ref = useRef<THREE.Group>(null);
  return (
    <group ref={ref}>
      {TILES.map((t, i) => (
        <Photo key={i} idx={i} angle={(i / TILES.length) * Math.PI * 2} radius={4} hue={t.hue} label={t.label} />
      ))}
    </group>
  );
}

export default function Dome3DGallery({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#05010a]", className)}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Dome />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 text-white/80 text-xs uppercase tracking-widest">Dome Gallery</div>
    </div>
  );
}
