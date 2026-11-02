
"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function CinematicSky() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
        uTime: { value: 0 },
        uTop: { value: new THREE.Color("#03050c") },
        uMiddle: { value: new THREE.Color("#101729") },
        uHorizon: { value: new THREE.Color("#69758f") },
        }),
        []
    );

    useFrame(({ clock }) => {
        if (materialRef.current) {
        materialRef.current.uniforms.uTime.value =
            clock.getElapsedTime();
        }
    });

    return (
        <mesh>
        <sphereGeometry args={[9000, 64, 32]} />

        <shaderMaterial
            ref={materialRef}
            side={THREE.BackSide}
            depthWrite={false}
            toneMapped={false}
            uniforms={uniforms}
            vertexShader={`
            varying vec3 vWorldDirection;

            void main() {
                vec4 worldPosition =
                modelMatrix * vec4(position, 1.0);

                vWorldDirection =
                normalize(worldPosition.xyz - cameraPosition);

                gl_Position =
                projectionMatrix * viewMatrix * vec4(position, 1.0);
            }
            `}
            fragmentShader={`
            uniform float uTime;
            uniform vec3 uTop;
            uniform vec3 uMiddle;
            uniform vec3 uHorizon;

            varying vec3 vWorldDirection;

            float hash(vec2 p) {
                return fract(
                sin(dot(p, vec2(127.1, 311.7))) *
                43758.5453123
                );
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);

                f = f * f * (3.0 - 2.0 * f);

                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));

                return mix(
                mix(a, b, f.x),
                mix(c, d, f.x),
                f.y
                );
            }

            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;

                for (int i = 0; i < 4; i++) {
                value += amplitude * noise(p);
                p *= 2.03;
                amplitude *= 0.5;
                }

                return value;
            }

            void main() {
                vec3 dir = normalize(vWorldDirection);

                float height = clamp(dir.y, 0.0, 1.0);

                // Original cinematic sky gradient
                float middleBlend =
                smoothstep(0.0, 0.65, height);

                vec3 color =
                mix(uMiddle, uTop, middleBlend);

                // Slow-moving atmospheric coordinates
                vec2 atmosphereUV =
                vec2(dir.x * 2.2, dir.y * 3.5);

                vec2 drift =
                vec2(uTime * 0.006, uTime * 0.002);

                float atmosphere =
                fbm(atmosphereUV + drift);

                float secondaryAtmosphere =
                fbm(
                    atmosphereUV * 1.45 -
                    drift * 0.65 +
                    vec2(8.3, 2.1)
                );

                // Atmospheric movement is strongest
                // in the middle of the sky
                float atmosphereMask =
                smoothstep(0.03, 0.18, height) *
                (1.0 - smoothstep(0.65, 0.95, height));

                float atmosphericLight =
                smoothstep(
                    0.35,
                    0.78,
                    atmosphere * 0.7 +
                    secondaryAtmosphere * 0.3
                );

                // Cool diffused light
                vec3 mistColor =
                vec3(0.12, 0.17, 0.28);

                color = mix(
                color,
                mistColor,
                atmosphericLight *
                atmosphereMask *
                0.24
                );

                // Soft moving light across the sky
                float lightField =
                sin(
                    dir.x * 3.0 -
                    uTime * 0.025 +
                    atmosphere * 2.0
                );

                lightField =
                lightField * 0.5 + 0.5;

                color +=
                vec3(0.012, 0.018, 0.035) *
                lightField *
                atmosphereMask;

                // Horizon glow
                float horizonGlow =
                exp(-pow(height * 12.0, 2.0));

                // Very slow horizon breathing
                float breathing =
                0.96 +
                sin(uTime * 0.16) * 0.04;

                color = mix(
                color,
                uHorizon,
                horizonGlow * 0.65 * breathing
                );

                gl_FragColor =
                vec4(color, 1.0);

                #include <tonemapping_fragment>
                #include <colorspace_fragment>
            }
            `}
        />
        </mesh>
    );
}
