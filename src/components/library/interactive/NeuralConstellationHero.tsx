"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function NeuralConstellationHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    // MayaKit Background #0C1E29
    scene.background = new THREE.Color(0x0c1e29);
    scene.fog = new THREE.FogExp2(0x0c1e29, 0.045);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ---- Build graph topology ----
    const NODE_COUNT = 46;
    const nodes: { base: THREE.Vector3; pos: THREE.Vector3; vel: THREE.Vector3; size: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
      const r = 3.4 + Math.random() * 0.6;
      const base = new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      nodes.push({
        base,
        pos: base.clone(),
        vel: new THREE.Vector3(),
        size: 0.03 + Math.random() * 0.05,
      });
    }

    // connect each node to its 2-4 nearest neighbors
    const edges: { a: number; b: number; pulses: any[] }[] = [];
    nodes.forEach((n, i) => {
      const distances = nodes
        .map((m, j) => ({ j, d: n.base.distanceTo(m.base) }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2 + Math.floor(Math.random() * 2));
      distances.forEach(({ j }) => {
        if (!edges.some((e) => (e.a === i && e.b === j) || (e.a === j && e.b === i))) {
          edges.push({ a: i, b: j, pulses: [] });
        }
      });
    });

    // node points (MayaKit Yellow)
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(NODE_COUNT * 3);
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0xfffe15,
      size: 0.09,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // edge lines (White/translucent)
    const edgeGeo = new THREE.BufferGeometry();
    const edgePositions = new Float32Array(edges.length * 2 * 3);
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // traveling pulses — small glowing spheres moving along random edges (White)
    const pulseGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const pulsePool = Array.from({ length: 18 }, () => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(pulseGeo, mat);
      mesh.userData = { active: false, edge: null, t: 0, speed: 0 };
      scene.add(mesh);
      return mesh;
    });

    const spawnPulse = () => {
      const free = pulsePool.find((p) => !p.userData.active);
      if (!free) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      free.userData = { active: true, edge, t: 0, speed: 0.35 + Math.random() * 0.4 };
      free.material.opacity = 1;
    };

    const key = new THREE.PointLight(0xfffe15, 3, 20);
    key.position.set(4, 4, 6);
    scene.add(key, new THREE.AmbientLight(0x0c1e29, 1));

    // cursor influence
    let targetMouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    mount.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let lastSpawn = 0;
    let frame: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // camera figure-eight drift
      camera.position.x = Math.sin(t * 0.15) * 1.2;
      camera.position.y = Math.sin(t * 0.3) * 0.6;
      camera.position.z = 9 - Math.cos(t * 0.15) * 0.8;
      camera.lookAt(0, 0, 0);

      // nodes gently drawn toward cursor-projected point, spring back to base
      const cursorInfluence = new THREE.Vector3(targetMouse.x * 2.2, targetMouse.y * 2.2, 0);
      nodes.forEach((n, i) => {
        const toCursor = cursorInfluence.clone().sub(n.pos);
        const dist = toCursor.length();
        const pull = dist < 2.5 ? (1 - dist / 2.5) * 0.0025 : 0;
        const spring = n.base.clone().sub(n.pos).multiplyScalar(0.02);
        n.vel.add(toCursor.normalize().multiplyScalar(pull)).add(spring).multiplyScalar(0.9);
        n.pos.add(n.vel);
        nodePositions[i * 3] = n.pos.x;
        nodePositions[i * 3 + 1] = n.pos.y;
        nodePositions[i * 3 + 2] = n.pos.z;
      });
      nodeGeo.attributes.position.needsUpdate = true;

      // update edge line positions to follow nodes
      edges.forEach((e, i) => {
        const a = nodes[e.a].pos;
        const b = nodes[e.b].pos;
        edgePositions[i * 6] = a.x;
        edgePositions[i * 6 + 1] = a.y;
        edgePositions[i * 6 + 2] = a.z;
        edgePositions[i * 6 + 3] = b.x;
        edgePositions[i * 6 + 4] = b.y;
        edgePositions[i * 6 + 5] = b.z;
      });
      edgeGeo.attributes.position.needsUpdate = true;

      // spawn + advance pulses
      if (t - lastSpawn > 0.15) {
        spawnPulse();
        lastSpawn = t;
      }
      pulsePool.forEach((p) => {
        if (!p.userData.active) return;
        p.userData.t += p.userData.speed * 0.016;
        if (p.userData.t >= 1) {
          p.userData.active = false;
          p.material.opacity = 0;
          return;
        }
        const a = nodes[p.userData.edge.a].pos;
        const b = nodes[p.userData.edge.b].pos;
        p.position.lerpVectors(a, b, p.userData.t);
        p.material.opacity = Math.sin(p.userData.t * Math.PI);
      });

      nodePoints.rotation.y += 0.0006;
      edgeLines.rotation.y += 0.0006;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      nodeGeo.dispose();
      nodeMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      pulseGeo.dispose();
      pulsePool.forEach((p) => p.material.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-[#0C1E29] rounded-2xl overflow-hidden font-sans">
      <div ref={mountRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-10 pointer-events-none bg-gradient-to-t from-[#0C1E29] via-transparent to-transparent">
        <span className="text-xs font-bold tracking-[0.2em] text-[#FFFE15] uppercase mb-2">Intelligence, visualized</span>
        <h2 className="text-4xl font-black text-white max-w-lg leading-tight tracking-tight">
          Every signal finds its path.
        </h2>
      </div>
    </div>
  );
}
