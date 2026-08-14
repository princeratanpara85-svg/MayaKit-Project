"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";

export default function SceneCanvas({ children, camera, ...props }: { children: React.ReactNode, camera?: any, [key: string]: any }) {
  return (
    <Canvas
      camera={camera || { position: [0, 0, 10], fov: 75 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%", background: "transparent", pointerEvents: "none" }}
      {...props}
    >
      {children}
    </Canvas>
  );
}
