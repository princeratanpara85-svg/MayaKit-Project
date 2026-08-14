"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 180;
const REACTION_RADIUS = 5.0; // Distance at which cursor triggers a flinch
const REPULSION_STRENGTH = 0.15;
const SPRING_STRENGTH = 0.05;
const DAMPING = 0.85;

export function ParticleOrganism() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Pre-calculate particle properties
  const { particles, colors, dummy } = useMemo(() => {
    const pArray = [];
    const colorArray = new Float32Array(PARTICLE_COUNT * 3);
    const dummyObj = new THREE.Object3D();
    
    const colorPrimary = new THREE.Color("#FFFE15");
    const colorSecondary = new THREE.Color("#E2E8F0");
    const colorTertiary = new THREE.Color("#163648");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create a somewhat organic cluster (a central body with radiating clusters)
      const t = i / PARTICLE_COUNT;
      const angle = t * Math.PI * 2 * 3; // spirals
      const radius = 2 + Math.random() * 5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 3;

      let color = colorSecondary;
      let scale = 0.1 + Math.random() * 0.1;
      
      // Core particles
      if (Math.random() > 0.8) {
        color = colorPrimary;
        scale *= 1.5; // Slightly larger for core
      } else if (Math.random() > 0.6) {
        color = colorTertiary;
      }
      
      color.toArray(colorArray, i * 3);

      pArray.push({
        id: i,
        baseX: x,
        baseY: y,
        baseZ: z,
        currX: x,
        currY: y,
        currZ: z,
        velX: 0,
        velY: 0,
        velZ: 0,
        phase: Math.random() * Math.PI * 2,
        scale,
        neighbors: [] as number[],
      });
    }

    // Pre-calculate nearest neighbors (3 neighbors per particle)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p1 = pArray[i];
      const dists = [];
      for (let j = 0; j < PARTICLE_COUNT; j++) {
        if (i === j) continue;
        const p2 = pArray[j];
        const d = Math.hypot(p1.baseX - p2.baseX, p1.baseY - p2.baseY, p1.baseZ - p2.baseZ);
        dists.push({ index: j, d });
      }
      dists.sort((a, b) => a.d - b.d);
      p1.neighbors = dists.slice(0, 3).map(obj => obj.index);
    }

    return { particles: pArray, colors: colorArray, dummy: dummyObj };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Map normalized mouse (-1 to 1) to world space bounds roughly
    const mouseX = (mouseRef.current.x * viewport.width) / 2;
    const mouseY = (mouseRef.current.y * viewport.height) / 2;
    const time = state.clock.elapsedTime;

    // Apply forces
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      
      if (!prefersReducedMotion) {
        // 1. Mouse Repulsion
        const dx = p.currX - mouseX;
        const dy = p.currY - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < REACTION_RADIUS) {
          const force = (REACTION_RADIUS - dist) / REACTION_RADIUS;
          p.velX += (dx / dist) * force * REPULSION_STRENGTH;
          p.velY += (dy / dist) * force * REPULSION_STRENGTH;
        }

        // 2. Neighbor Propagation (Pull toward base positions of neighbors if disturbed)
        // Actually, just pulling towards own base is enough, but to simulate "rippling", 
        // we can apply a fraction of neighbor's velocity.
        for (const nIdx of p.neighbors) {
          const neighbor = particles[nIdx];
          p.velX += neighbor.velX * 0.05;
          p.velY += neighbor.velY * 0.05;
          p.velZ += neighbor.velZ * 0.05;
        }

        // 3. Spring force back to base position (with idle breathing)
        const breatheX = Math.sin(time + p.phase) * 0.2;
        const breatheY = Math.cos(time * 0.8 + p.phase) * 0.2;
        const breatheZ = Math.sin(time * 1.2 + p.phase) * 0.2;

        const targetX = p.baseX + breatheX;
        const targetY = p.baseY + breatheY;
        const targetZ = p.baseZ + breatheZ;

        p.velX += (targetX - p.currX) * SPRING_STRENGTH;
        p.velY += (targetY - p.currY) * SPRING_STRENGTH;
        p.velZ += (targetZ - p.currZ) * SPRING_STRENGTH;

        // Apply damping
        p.velX *= DAMPING;
        p.velY *= DAMPING;
        p.velZ *= DAMPING;

        // Update position
        p.currX += p.velX;
        p.currY += p.velY;
        p.currZ += p.velZ;
      }

      // Set matrix
      dummy.position.set(p.currX, p.currY, p.currZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
    >
      <sphereGeometry args={[1, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.8} />
    </instancedMesh>
  );
}
