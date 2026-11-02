
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MAX_RIPPLES = 12;

type Ripple = {
  x: number;
  z: number;
  start: number;
};

export default function WaterHoverRipples() {
  const { camera, gl } = useThree();

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const ripples = useRef<Ripple[]>([]);
  const lastSpawn = useRef(0);
  const pointer = useRef(new THREE.Vector2());
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const waterPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRipples: {
        value: Array.from(
          { length: MAX_RIPPLES },
          () => new THREE.Vector4(0, 0, -100, 0)
        ),
      },
    }),
    []
  );

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      pointer.current.set(x, y);
      raycaster.setFromCamera(pointer.current, camera);

      const hit = new THREE.Vector3();
      const intersection = raycaster.ray.intersectPlane(waterPlane, hit);

      if (!intersection) return;

      // Prevent ripples far beyond the visible foreground
      if (hit.z < -80 || hit.z > 30) return;

      const now = performance.now() / 1000;

      if (now - lastSpawn.current < 0.065) return;

      lastSpawn.current = now;

      ripples.current.push({
        x: hit.x,
        z: hit.z,
        start: now,
      });

      if (ripples.current.length > MAX_RIPPLES) {
        ripples.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [camera, gl, raycaster, waterPlane]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const now = performance.now() / 1000;

    uniforms.uTime.value = time;

    const values = uniforms.uRipples.value as THREE.Vector4[];

    for (let i = 0; i < MAX_RIPPLES; i++) {
      const ripple = ripples.current[i];

      if (ripple) {
        values[i].set(ripple.x, ripple.z, now - ripple.start, 1);
      } else {
        values[i].set(0, 0, -100, 0);
      }
    }
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.018, 0]}
      frustumCulled={false}
    >
      <planeGeometry args={[10000, 10000]} />

      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vWorldXZ;

          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldXZ = worldPosition.xz;

            gl_Position =
              projectionMatrix * viewMatrix * worldPosition;
          }
        `}
        fragmentShader={`
          precision highp float;

          varying vec2 vWorldXZ;

          uniform float uTime;
          uniform vec4 uRipples[${MAX_RIPPLES}];

          void main() {
            float rippleStrength = 0.0;

            for (int i = 0; i < ${MAX_RIPPLES}; i++) {
              vec4 ripple = uRipples[i];

              if (ripple.w < 0.5 || ripple.z < 0.0) {
                continue;
              }

              float age = ripple.z;
              float distanceToCenter =
                distance(vWorldXZ, ripple.xy);

              float radius = age * 2.5;

              float ring = exp(
                -pow((distanceToCenter - radius) * 4.0, 2.0)
              );

              float wave = sin(
                (distanceToCenter - radius) * 18.0
              );

              float fade = exp(-age * 1.5);

              rippleStrength +=
                ring * (0.65 + 0.35 * wave) * fade;
            }

            rippleStrength = clamp(rippleStrength, 0.0, 1.0);

            vec3 rippleColor = vec3(0.64, 0.72, 0.86);

            gl_FragColor = vec4(
              rippleColor,
              rippleStrength * 0.24
            );
          }
        `}
      />
    </mesh>
  );
}
