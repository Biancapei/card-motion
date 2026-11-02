
"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox, Text } from "@react-three/drei";
import { mouseState } from "./MouseTracker";

const CARD_WIDTH = 3.6;
const CARD_HEIGHT = 2.25;
const CARD_DEPTH = 0.045;

export default function DebitCard() {
    const cardRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

    const shaderRef = useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

    const baseHeight = 1.25;

    // Extend the physical material with a soft,
    // animated reflection built into its surface.
    const reflectiveMaterial = useMemo(() => {
        const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#25364a"),
        metalness: 0.78,
        roughness: 0.17,
        clearcoat: 1,
        clearcoatRoughness: 0.045,
        envMapIntensity: 2.8,
        });

        material.onBeforeCompile = (shader) => {
        shaderRef.current = shader;

        shader.uniforms.uAetherTime = { value: 0 };

        shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `
            #include <common>
            varying vec3 vAetherPosition;
            `
        );

        shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            `
            #include <begin_vertex>
            vAetherPosition = position;
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <common>",
            `
            #include <common>

            uniform float uAetherTime;
            varying vec3 vAetherPosition;
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <color_fragment>",
            `
            #include <color_fragment>

            // Local card-space coordinates.
            vec2 uv = vec2(
            vAetherPosition.x / 3.6 + 0.5,
            vAetherPosition.y / 2.25 + 0.5
            );

            // Broad diagonal studio reflection.
            float movement =
            sin(uAetherTime * 0.55) * 0.16;

            float diagonal =
            uv.x + uv.y * 0.24 - movement;

            float reflection =
            exp(
                -pow(
                (diagonal - 0.52) / 0.25,
                2.0
                )
            );

            // Secondary soft reflection.
            float secondary =
            exp(
                -pow(
                (uv.x + uv.y * 0.12 - 0.12) / 0.42,
                2.0
                )
            );

            // Dark navy base with restrained
            // silver-blue optical highlights.
            vec3 reflectionColor =
            vec3(0.44, 0.57, 0.73);

            diffuseColor.rgb +=
            reflectionColor * reflection * 0.65;

            diffuseColor.rgb +=
            vec3(0.13, 0.19, 0.27) *
            secondary * 0.20;
            `
        );
        };

        material.customProgramCacheKey = () =>
        "aether-reflective-card-v1";

        return material;
    }, []);

    useFrame(({ clock }, delta) => {
        const card = cardRef.current;
        if (!card) return;

        const t = clock.getElapsedTime();

        const mouseX = mouseState.target.x;
        const mouseY = mouseState.target.y;

        const magneticX = mouseState.active
        ? mouseX * 0.12
        : 0;

        const magneticY = mouseState.active
        ? mouseY * 0.08
        : 0;

        const smoothing = 1 - Math.exp(-delta * 3);

        // Magnetic horizontal movement
        card.position.x = THREE.MathUtils.lerp(
        card.position.x,
        magneticX,
        smoothing
        );

        // Gentle floating
        card.position.y = THREE.MathUtils.lerp(
        card.position.y,
        baseHeight +
            Math.sin(t * 0.65) * 0.025 +
            magneticY,
        smoothing
        );

        // Magnetic horizontal rotation
        card.rotation.y = THREE.MathUtils.lerp(
        card.rotation.y,
        -0.18 + mouseX * 0.22,
        smoothing
        );

        // Magnetic vertical tilt
        card.rotation.x = THREE.MathUtils.lerp(
        card.rotation.x,
        -mouseY * 0.14,
        smoothing
        );

        // Subtle floating rotation
        card.rotation.z =
        -0.035 + Math.sin(t * 0.4) * 0.008;

        // Animate the reflection automatically.
        // It does not depend on hover.
        if (shaderRef.current) {
        shaderRef.current.uniforms.uAetherTime.value =
            t;
        }

        // Slight surface roughness response
        if (materialRef.current) {
        const targetRoughness =
            0.17 + Math.abs(mouseX) * 0.025;

        materialRef.current.roughness =
            THREE.MathUtils.lerp(
            materialRef.current.roughness,
            targetRoughness,
            smoothing
            );
        }
    });

    return (
        <group
        ref={cardRef}
        position={[0, baseHeight, 0]}
        >
        {/* Main reflective card */}
        <RoundedBox
            args={[
            CARD_WIDTH,
            CARD_HEIGHT,
            CARD_DEPTH,
            ]}
            radius={0.045}
            smoothness={8}
        >
            <primitive
            object={reflectiveMaterial}
            ref={materialRef}
            attach="material"
            />
        </RoundedBox>

        {/* Metallic chip */}
        <RoundedBox
            args={[0.42, 0.32, 0.008]}
            radius={0.025}
            smoothness={5}
            position={[-1.08, 0.46, 0.031]}
        >
            <meshPhysicalMaterial
            color="#b6c5d7"
            metalness={0.9}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.07}
            />
        </RoundedBox>

        {/* AETHER wordmark */}
        <group position={[0.95, -0.82, 0.034]}>
            <Text
            fontSize={0.29}
            fontWeight={700}
            color="#f1f3f7"
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.065}
            material-toneMapped={false}
            >
            aether
            </Text>

            {/* Signature blue-grey dot */}
            <mesh position={[0.49, -0.065, 0]}>
            <circleGeometry args={[0.035, 24]} />
            <meshBasicMaterial
                color="#a5b7ca"
                toneMapped={false}
            />
            </mesh>
        </group>
        </group>
    );
}
