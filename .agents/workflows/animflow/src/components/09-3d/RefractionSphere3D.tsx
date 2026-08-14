import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Sphere() {
  const ref = useRef<any>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.3; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <MeshTransmissionMaterial thickness={1.5} roughness={0.05} transmission={1} ior={2.4} chromaticAberration={0.1} color="#fbbf24" />
    </mesh>
  );
}

/** RefractionSphere3D — Refraction sphere with environment. */
export default function RefractionSphere3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-amber-900/30 to-orange-900/30", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} />
        <Environment preset="sunset" />
        <Sphere />
      </Canvas>
    </div>
  );
}
