"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function MagneticConstellation({ count = 120, connectionDistance = 2.5 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport, camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // z

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const maxLines = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const baseColor = useMemo(() => new THREE.Color("#163648"), []);
  const activeColor = useMemo(() => new THREE.Color("#FFFE15"), []);
  
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionsAttr.array as Float32Array;

    // 1. Update particle positions
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArray[idx] += velocities[idx];
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2];

      // Bounce
      if (Math.abs(posArray[idx]) > 12) velocities[idx] *= -1;
      if (Math.abs(posArray[idx + 1]) > 12) velocities[idx + 1] *= -1;
      if (Math.abs(posArray[idx + 2]) > 4) velocities[idx + 2] *= -1;
    }
    positionsAttr.needsUpdate = true;

    // Convert normalized mouse (-1 to 1) to world space at z=0 plane
    vec.set(mouseRef.current.x, mouseRef.current.y, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    const distance = -camera.position.z / vec.z;
    const mouseWorld = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance));

    // 2. Update lines
    let lineIdx = 0;
    let colorIdx = 0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const distToMouse = Math.sqrt(
        Math.pow(posArray[i3] - mouseWorld.x, 2) + 
        Math.pow(posArray[i3 + 1] - mouseWorld.y, 2)
      );

      // Only check connections if near cursor
      if (distToMouse < 6) {
        for (let j = i + 1; j < count; j++) {
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions[lineIdx++] = posArray[i3];
            linePositions[lineIdx++] = posArray[i3 + 1];
            linePositions[lineIdx++] = posArray[i3 + 2];

            linePositions[lineIdx++] = posArray[j3];
            linePositions[lineIdx++] = posArray[j3 + 1];
            linePositions[lineIdx++] = posArray[j3 + 2];

            const alpha = Math.max(0, 1 - (distToMouse / 6));
            const mixedColor = baseColor.clone().lerp(activeColor, alpha);

            lineColors[colorIdx++] = mixedColor.r;
            lineColors[colorIdx++] = mixedColor.g;
            lineColors[colorIdx++] = mixedColor.b;

            lineColors[colorIdx++] = mixedColor.r;
            lineColors[colorIdx++] = mixedColor.g;
            lineColors[colorIdx++] = mixedColor.b;
          }
        }
      }
    }

    const lineGeo = linesRef.current.geometry as THREE.BufferGeometry;
    lineGeo.setDrawRange(0, lineIdx / 3);
    
    const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute;
    const lineColorAttr = lineGeo.attributes.color as THREE.BufferAttribute;
    
    for(let i = 0; i < lineIdx; i++) linePosAttr.array[i] = linePositions[i];
    for(let i = 0; i < colorIdx; i++) lineColorAttr.array[i] = lineColors[i];

    linePosAttr.needsUpdate = true;
    lineColorAttr.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#FFFE15" transparent opacity={0.6} sizeAttenuation={true} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" count={lineColors.length / 3} array={lineColors} itemSize={3} args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
}
