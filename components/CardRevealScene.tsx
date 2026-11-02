
"use client";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

export type CardRevealSceneHandle = {
  motion: {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    y: number;
    scale: number;
  };
};

function CardModel({
  motion,
}: {
  motion: CardRevealSceneHandle["motion"];
}) {
  const group = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current || !floatGroup.current) return;

    const easing = 1 - Math.exp(-delta * 10);

    // SMOOTH ROTATION
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      motion.rotationX,
      easing
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      motion.rotationY,
      easing
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      motion.rotationZ,
      easing
    );

    // POSITION
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      motion.y,
      easing
    );

    // SCALE
    const nextScale = THREE.MathUtils.lerp(
      group.current.scale.x,
      motion.scale,
      easing
    );

    group.current.scale.setScalar(nextScale);

    // SUBTLE FLOAT
    floatGroup.current.position.y =
      Math.sin(clock.elapsedTime * 0.65) * 0.035;
  });

  return (
    <group ref={group}>
      <group ref={floatGroup}>

        {/* METALLIC CARD BODY */}
        <RoundedBox
          args={[3.65, 2.3, 0.065]}
          radius={0.09}
          smoothness={5}
        >
          <meshPhysicalMaterial
            color="#111821"
            metalness={0.85}
            roughness={0.28}
            clearcoat={0.8}
            clearcoatRoughness={0.16}
          />
        </RoundedBox>

        {/* CHIP */}
        <RoundedBox
          args={[0.4, 0.31, 0.008]}
          radius={0.035}
          smoothness={4}
          position={[-1.17, 0.49, 0.042]}
        >
          <meshStandardMaterial
            color="#a7b3c4"
            metalness={0.85}
            roughness={0.28}
          />
        </RoundedBox>

        {/* DIAGONAL SURFACE DETAIL */}
        <mesh
          position={[0, 0, 0.039]}
          rotation={[0, 0, -0.45]}
        >
          <planeGeometry args={[0.009, 4.2]} />
          <meshBasicMaterial
            color="#8799b3"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* AETHER WORDMARK */}
        <Text
          position={[1.08, -0.81, 0.045]}
          fontSize={0.29}
          color="#f1f4fa"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.06}
        >
          aether.
        </Text>

      </group>
    </group>
  );
}

const CardRevealScene = forwardRef<
  CardRevealSceneHandle,
  object
>(function CardRevealScene(_props, ref) {
  // INITIAL SCROLL POSITION
  const motion = useMemo(
    () => ({
      rotationX: -0.25,
      rotationY: -Math.PI * 0.9,
      rotationZ: -0.3,
      y: -0.4,
      scale: 0.78,
    }),
    []
  );

  useImperativeHandle(
    ref,
    () => ({ motion }),
    [motion]
  );

  return (
    <Canvas
      camera={{
        position: [0, 0, 8.5],
        fov: 40,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{
        background: "transparent",
      }}
    >
      {/* SOFT AMBIENT LIGHT */}
      <ambientLight
        intensity={0.75}
        color="#a8b7d0"
      />

      {/* COOL KEY LIGHT */}
      <directionalLight
        position={[-4, 5, 5]}
        intensity={3.2}
        color="#c7d8f1"
      />

      {/* EDGE LIGHT */}
      <directionalLight
        position={[4, -2, 3]}
        intensity={1.5}
        color="#6c8aaf"
      />

      {/* METALLIC REFLECTION */}
      <pointLight
        position={[0, 3, 2]}
        intensity={12}
        distance={9}
        color="#d7e5ff"
      />

      <CardModel motion={motion} />
    </Canvas>
  );
});

CardRevealScene.displayName = "CardRevealScene";

export default CardRevealScene;
