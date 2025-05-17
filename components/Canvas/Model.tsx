"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/model/building.glb");

const Model = () => {
  const { scene } = useGLTF("/model/building.glb");

  return (
    <group position={[-40, -105, -120]}>
      <primitive object={scene} />
    </group>
  );
};

export default Model;
