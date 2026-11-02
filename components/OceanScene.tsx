
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Environment, Lightformer } from "@react-three/drei";

import DebitCard from "./DebitCard";
import CinematicSky from "./CinematicSky";
import MouseTracker from "./MouseTracker";
import WaterHoverRipples from "./WaterHoverRipples";

/* =========================================
   RESPONSIVE CAMERA
========================================= */

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const width = size.width;

    if (width < 390) {
      // SMALL MOBILE
      camera.position.set(0, 1.35, 13.5);
      camera.fov = 42;
    } else if (width < 640) {
      // STANDARD MOBILE
      camera.position.set(0, 1.3, 12);
      camera.fov = 42;
    } else if (width < 1024) {
      // TABLET
      camera.position.set(0, 1.2, 10.8);
      camera.fov = 42;
    } else {
      // DESKTOP — ORIGINAL
      camera.position.set(0, 1.2, 10);
      camera.fov = 42;
    }

    camera.lookAt(0, 1.2, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

/* =========================================
   OCEAN
========================================= */

function Ocean() {
  const waterNormals = useMemo(() => {
    const texture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/waternormals.jpg"
    );

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
  }, []);

  const water = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(10000, 10000);

    const surface = new Water(geometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(
        0,
        0.15,
        -1
      ).normalize(),
      sunColor: 0xe0e5f5,
      waterColor: 0x172238,
      distortionScale: 0.8,
      fog: false,
    });

    surface.rotation.x = -Math.PI / 2;

    return surface;
  }, [waterNormals]);

  useEffect(() => {
    return () => {
      water.geometry.dispose();
      water.material.dispose();
      waterNormals.dispose();
    };
  }, [water, waterNormals]);

  useFrame((_, delta) => {
    water.material.uniforms.time.value += delta * 0.3;
  });

  return <primitive object={water} />;
}

/* =========================================
   MAIN SCENE
========================================= */

export default function OceanScene() {
  return (
    <Canvas
      className="!absolute !inset-0"
      style={{
        width: "100%",
        height: "100%",
      }}
      camera={{
        position: [0, 1.2, 10],
        fov: 42,
        near: 0.1,
        far: 20000,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
    >
      <ResponsiveCamera />

      <CinematicSky />

      {/* AMBIENT LIGHTING */}
      <ambientLight
        intensity={0.85}
        color="#aab8d8"
      />

      <hemisphereLight
        args={[
          "#c8d0e8",
          "#080d17",
          1.5,
        ]}
      />

      {/* HORIZON LIGHTING */}
      <directionalLight
        position={[0, 4, -15]}
        intensity={4}
        color="#e2e7f5"
      />

      {/* COOL CINEMATIC RIM LIGHT */}
      <spotLight
        position={[4, 7, 5]}
        intensity={65}
        angle={0.55}
        penumbra={0.85}
        color="#a6bddc"
      />

      {/* COOL BLUE FILL LIGHT */}
      <pointLight
        position={[-4, 3, 4]}
        intensity={12}
        color="#6e8fb5"
      />

      {/* STUDIO REFLECTIONS */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          color="#c3d7ed"
          scale={[5, 2, 1]}
          position={[-3, 3, 4]}
          rotation={[0, 0.3, 0]}
        />

        <Lightformer
          form="rect"
          intensity={2.5}
          color="#6987ab"
          scale={[2, 5, 1]}
          position={[4, 1, 3]}
          rotation={[0, -0.4, 0]}
        />

        <Lightformer
          form="rect"
          intensity={1.5}
          color="#e0e9f4"
          scale={[7, 0.6, 1]}
          position={[0, -2, 4]}
        />
      </Environment>

      <MouseTracker />

      <Ocean />

      <WaterHoverRipples />

      <DebitCard />
    </Canvas>
  );
}
