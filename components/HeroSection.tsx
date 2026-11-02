
"use client";

import dynamic from "next/dynamic";
import HeroEditorial from "./HeroEditorial";

const OceanScene = dynamic(
  () => import("./OceanScene"),
  {
    ssr: false,
  }
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative isolate
        h-[100svh]
        min-h-[540px]
        w-full overflow-hidden
        bg-[#0b1220]
        lg:h-[100dvh]
      "
    >
      {/* 3D OCEAN AND FLOATING CARD */}
      <div className="absolute inset-0 z-0">
        <OceanScene />
      </div>

      {/* CINEMATIC VIGNETTE */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,9,17,0.15) 0%, transparent 35%, transparent 65%, rgba(5,9,17,0.28) 100%)",
        }}
      />

      {/* NAVBAR + EDITORIAL CONTENT */}
      <HeroEditorial />
    </section>
  );
}
