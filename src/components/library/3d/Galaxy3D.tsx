"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float } from "@react-three/drei";
import { AdditiveBlending, Color, Points, ShaderMaterial } from "three";
import { cn } from "@/lib/utils";

/**
 * Galaxy3D — A procedurally-generated spiral galaxy rendered as a custom
 * shader point-cloud, with a hot core, three spiral arms, ambient starfield
 * (drei Stars) and a glitter halo of Sparkles. Rotates on a slow axis and a
 * faster arm-shear. Mixes 21st.dev three.js scene techniques with Magic UI
 * orbiting-particles style.
 */

type GalaxyProps = {
  className?: string;
  /** Number of stars in the spiral arms */
  count?: number;
  /** Color of the arms */
  armColor?: string;
  /** Color of the core */
  coreColor?: string;
};

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aArm;
  attribute vec3  aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 pos = position;

    // gentle inward breathing
    float r = length(pos.xz);
    pos.xz *= 0.985 + 0.015 * sin(uTime * 0.6 + aArm * 1.7);

    // twinkle alpha
    vAlpha = 0.55 + 0.45 * sin(uTime * 2.0 + aSize * 30.0 + aArm * 2.4);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (220.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float glow = exp(-d * 7.0);
    vec3 col = vColor * (core * 0.9 + glow * 1.2);
    gl_FragColor = vec4(col, vAlpha * core);
  }
`;

function SpiralGalaxy({ count = 6500, armColor, coreColor }: { count: number; armColor: string; coreColor: string }) {
  const ref = useRef<Points>(null!);
  const matRef = useRef<ShaderMaterial>(null!);

  const { positions, sizes, arms, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ar = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const cArm = new Color(armColor);
    const cCore = new Color(coreColor);
    const cMid = cArm.clone().lerp(cCore, 0.4);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      // radius with bias toward center
      const r = Math.pow(Math.random(), 0.6) * 3.4;
      // arm index 0..3
      const armIdx = i % 3;
      const armOffset = (armIdx / 3) * Math.PI * 2;
      // tighter spiral near center
      const spinAngle = r * 1.7;
      // scatter
      const branchSpread = (Math.random() - 0.5) * 0.55 * Math.pow(r, 0.55);
      const radialJitter = (Math.random() - 0.5) * 0.18 * r;
      const angle = armOffset + spinAngle + branchSpread;
      const x = Math.cos(angle) * (r + radialJitter);
      const z = Math.sin(angle) * (r + radialJitter);
      // vertical puff
      const y = (Math.random() - 0.5) * 0.18 * (1.0 + r * 0.25);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      sz[i] = 0.012 + Math.random() * 0.045;
      ar[i] = armIdx;
      // color: core -> mid -> arm
      const c = (r < 0.6 ? cCore : r < 1.6 ? cMid : cArm).clone();
      // brighten core
      c.multiplyScalar(0.6 + Math.random() * 0.6 + (r < 0.6 ? 0.7 : 0));
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, sizes: sz, arms: ar, colors: col };
  }, [count, armColor, coreColor]);

  const geom = useMemo(() => {
    const g = (ref.current?.geometry as any) ?? null;
    return g;
  }, []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    }
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize"   args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aArm"    args={[arms, 1]} />
        <bufferAttribute attach="attributes-aColor"  args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
        }}
      />
      {geom ? null : null}
    </points>
  );
}

export default function Galaxy3D({ className, count = 6500, armColor = "#7c5cff", coreColor = "#ffd1f0" }: GalaxyProps) {
  return (
    <div className={cn("relative h-[380px] w-full overflow-hidden rounded-xl bg-[#05020d]", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(124,92,255,0.18),transparent_60%)]" />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.6, 5.6], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#05020d"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2.4} color="#ff9ae6" />
        <pointLight position={[3, -2, 3]} intensity={1.2} color="#5c8bff" />
        <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.25}>
          <SpiralGalaxy count={count} armColor={armColor} coreColor={coreColor} />
        </Float>
        <Stars radius={50} depth={50} count={2400} factor={4} fade speed={0.6} />
        <Sparkles count={70} scale={6} size={2.4} speed={0.4} color="#c8b4ff" />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Andromeda · M31</div>
        <div className="text-sm text-white/70">~1 trillion stars · 220k ly diameter</div>
      </div>
    </div>
  );
}
