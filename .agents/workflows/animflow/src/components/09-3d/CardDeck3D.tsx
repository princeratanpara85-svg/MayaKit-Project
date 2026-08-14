import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { cn } from "@/lib/utils";

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["A", "K", "Q", "J", "10"];

function Card({ idx, fanned, suit, value }: { idx: number; fanned: boolean; suit: string; value: string }) {
  const ref = useRef<any>(null);
  useFrame((s) => { if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime + idx) * 0.05; });
  const target = fanned ? [idx * 0.4 - 0.8, 0, -Math.abs(idx - 2) * 0.3] : [0, idx * 0.02, 0];
  const targetRot = fanned ? [0, (idx - 2) * 0.15, (idx - 2) * -0.05] : [0, 0, 0];
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += (target[0] - ref.current.position.x) * 0.1;
      ref.current.position.y += (target[1] - ref.current.position.y) * 0.1;
      ref.current.position.z += (target[2] - ref.current.position.z) * 0.1;
      ref.current.rotation.x += (targetRot[0] - ref.current.rotation.x) * 0.1;
      ref.current.rotation.y += (targetRot[1] - ref.current.rotation.y) * 0.1;
      ref.current.rotation.z += (targetRot[2] - ref.current.rotation.z) * 0.1;
    }
  });
  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 1, 0.02]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <Text position={[0, 0, 0.012]} fontSize={0.2} color={suit === "♥" || suit === "♦" ? "red" : "black"} anchorX="center" anchorY="middle">
        {value}
      </Text>
      <Text position={[0, -0.3, 0.012]} fontSize={0.4} color={suit === "♥" || suit === "♦" ? "red" : "black"} anchorX="center" anchorY="middle">
        {suit}
      </Text>
    </group>
  );
}

/** CardDeck3D — Card deck that fans out in 3D. */
export default function CardDeck3D({ className }: { className?: string }) {
  const [fanned, setFanned] = useState(false);
  return (
    <div
      onMouseEnter={() => setFanned(true)}
      onMouseLeave={() => setFanned(false)}
      className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-emerald-900/30 to-teal-900/30 cursor-pointer", className)}
    >
      <Canvas shadows camera={{ position: [0, 0.4, 2.5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={1} castShadow />
        {VALUES.map((v, i) => (
          <Card key={i} idx={i} fanned={fanned} suit={SUITS[i]} value={v} />
        ))}
      </Canvas>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50">Hover to fan the deck</div>
    </div>
  );
}
