import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Liquid() {
  const ref = useRef<any>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.2;
      ref.current.rotation.y = s.clock.elapsedTime * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.3, 128, 128]} />
      <MeshDistortMaterial color="#c0c0c0" metalness={1} roughness={0.05} distort={0.3} speed={2} />
    </mesh>
  );
}

/** LiquidMetal3D — Liquid metal sphere. */
export default function LiquidMetal3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="studio" />
        <Liquid />
      </Canvas>
    </div>
  );
}
