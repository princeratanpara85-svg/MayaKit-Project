import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, Sparkles } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Rocket, Sparkles as SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import * as THREE from "three";

/**
 * A flying-through neon ring tunnel.
 * The container itself doesn't scroll vertically inside the preview,
 * but we wire useScroll to a virtual scroll progress that loops 0..1..0
 * so the tunnel looks like the camera is being pulled forward.
 */
function TunnelRings({ progress }: { progress: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 24;

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Advance tunnel continuously
      groupRef.current.position.z += delta * 4;
      // Modulate by user "scroll" progress
      groupRef.current.position.z += progress.current * 0.02;
      // Recycle rings when they pass the camera
      if (groupRef.current.position.z > 6) groupRef.current.position.z -= ringCount * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 2]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.4 + (i % 3) * 0.25, 0.04, 16, 64]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#22d3ee" : "#f472b6"}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={ref} position={[0, 0, -2]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          distort={0.55}
          speed={2.4}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function WarpParticles() {
  const points = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.z += delta * 6;
      if (ref.current.position.z > 6) ref.current.position.z = 0;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.025} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.3) * 0.15;
    camera.position.y = Math.cos(t * 0.4) * 0.1;
    camera.lookAt(0, 0, -5);
  });
  return null;
}

export default function Scroll3DTunnelHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  // Bind scroll progress into a ref so R3F can read it cheaply
  useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-[#06010d]"
    >
      {/* R3F tunnel */}
      <Canvas camera={{ position: [0, 0, 4], fov: 70 }} dpr={[1, 2]} className="absolute inset-0">
        <color attach="background" args={["#06010d"]} />
        <fog attach="fog" args={["#06010d", 2, 14]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 2]} color="#c084fc" intensity={2.5} />
        <pointLight position={[2, -1, -2]} color="#22d3ee" intensity={1.5} />
        <Suspense fallback={null}>
          <TunnelRings progress={progressRef} />
          <FloatingCore />
          <WarpParticles />
          <Stars radius={20} depth={20} count={400} factor={2} fade speed={1} />
        </Suspense>
        <CameraRig />
      </Canvas>

      {/* Vignette + grid for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,1,13,0.85)_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Title block */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          <SparklesIcon size={11} className="text-fuchsia-400" />
          Scroll to dive in
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={cn(
            "mt-3 text-5xl md:text-6xl font-bold tracking-tight leading-[0.95]",
            "bg-gradient-to-br from-white via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent"
          )}
          style={{ filter: "drop-shadow(0 0 24px rgba(168,85,247,0.45))" }}
        >
          Tunnel&nbsp;the<br />future.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-3 max-w-md text-sm text-white/70"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
        >
          A neon wormhole rendered in WebGL. Scroll, drag, fall through.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex gap-3"
        >
          <button
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
            }}
            className="group relative overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] transition-all hover:scale-[1.03]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-fuchsia-300 via-white to-cyan-200 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <button className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
            <Rocket size={14} className="mr-2 inline-block" /> Docs
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        scroll ↓
      </motion.div>
    </div>
  );
}
