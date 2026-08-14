"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const TunnelShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec2 uv = vUv - 0.5;
      float r = length(uv);
      float a = atan(uv.y, uv.x);
      vec3 col = 0.5 + 0.5 * cos(uTime + a + r * 8.0 + vec3(0.0, 2.0, 4.0));
      col *= smoothstep(0.6, 0.0, r);
      float lines = 0.5 + 0.5 * sin(r * 50.0 - uTime * 4.0);
      col += lines * 0.2 * smoothstep(0.5, 0.0, r);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

function Plane() {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { if (mat.current) mat.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} args={[{ ...TunnelShader, uniforms: { uTime: { value: 0 } } }]} />
    </mesh>
  );
}

/** TunnelWarp3D — Tunnel warp (custom shader). */
export default function TunnelWarp3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 2]}>
        <Plane />
      </Canvas>
    </div>
  );
}
