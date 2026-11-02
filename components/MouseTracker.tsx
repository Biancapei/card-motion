
"use client";

import { useEffect } from "react";
import * as THREE from "three";

export const mouseState = {
  position: new THREE.Vector2(0, 0),
  target: new THREE.Vector2(0, 0),
  active: false,
};

export default function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseState.target.set(x, y);
      mouseState.active = true;
    };

    const handleMouseLeave = () => {
      mouseState.active = false;
      mouseState.target.set(0, 0);
    };

    // Track mouse movement without clicking
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
}
