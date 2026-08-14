import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Blob() {
  const ref = useRef<any>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.2; });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.3, 32]} />
      <MeshDistortMaterial color="#a855f7" attach="material" distort={0.5} speed={2} metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

/** WobbleBlob3D — Wobbling metaball-like blob. */
export default function WobbleBlob3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={1} />
        <Environment preset="warehouse" />
        <Blob />
      </Canvas>
    </div>
  );
}
