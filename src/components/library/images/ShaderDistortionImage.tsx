"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { LazyCanvas } from '@/components/three/LazyCanvas';

function DistortedPlane({ url }: { url: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, url);
  const hoverRef = useRef(0);
  const { viewport } = useThree();
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Simplistic hit-test for window-level tracking
      const isHovered = (e.clientX > window.innerWidth / 2 - 200) && 
                        (e.clientX < window.innerWidth / 2 + 200) &&
                        (e.clientY > window.innerHeight / 2 - 200) && 
                        (e.clientY < window.innerHeight / 2 + 200);
      hoverRef.current = isHovered ? 1 : 0;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const mat = mesh.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      mat.uniforms.uHover.value += (hoverRef.current - mat.uniforms.uHover.value) * 0.1;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <shaderMaterial
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uHover: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uHover;
          void main() {
            vec2 uv = vUv;
            // Base idle wave strength is 0.01, amplifies to 0.05 on hover
            float strength = 0.01 + (uHover * 0.04);
            uv.x += sin(uv.y * 10.0 + uTime * 2.0) * strength;
            uv.y += cos(uv.x * 10.0 + uTime * 2.0) * strength;
            vec4 color = texture2D(uTexture, uv);
            gl_FragColor = color;
          }
        `}
      />
    </mesh>
  );
}

export default function ShaderDistortionImage() {
  return (
    <div className="w-full h-full min-h-[400px] overflow-hidden rounded-none relative bg-[#0C1E29]">
      <LazyCanvas className="pointer-events-none" camera={{ position: [0, 0, 1] }}>
        <DistortedPlane url="https://picsum.photos/800/600?4" />
      </LazyCanvas>
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10">
        HOVER TO DISTORT
      </span>
    </div>
  );
}
