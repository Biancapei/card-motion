
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardRevealScene, {
  type CardRevealSceneHandle,
} from "./CardRevealScene";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CardRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<CardRevealSceneHandle>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const motion = sceneRef.current?.motion;

      if (!section || !motion) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const headline = section.querySelector(
            ".card-reveal-headline"
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=200%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(
            ".aether-card-scroll-cue",
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.5,
              ease: "power2.out",
            },
            0.8
          );

          // CARD ROTATION
          timeline.fromTo(
            motion,
            {
              rotationY: -Math.PI * 0.9,
              rotationX: -0.25,
              rotationZ: -0.3,
              y: -0.4,
              scale: 0.78,
            },
            {
              rotationY: Math.PI * 0.12,
              rotationX: -0.1,
              rotationZ: -0.12,
              y: 0,
              scale: 0.94,
              duration: 3.2,
              ease: "none",
            },
            0
          );

          // RIGHT SIDE TEXT — ENTERS FROM BELOW VIEWPORT
          if (headline) {
            timeline.fromTo(
              headline,
              {
                y: () => window.innerHeight * 0.85,
                z: -260,
                rotationX: -22,
                scale: 0.84,
                autoAlpha: 0,
                filter: "blur(10px)",
                transformPerspective: 1100,
                transformOrigin: "50% 80%",
              },
              {
                y: 0,
                z: 0,
                rotationX: 0,
                scale: 1,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 2.3,
                ease: "power2.out",
              },
              0.25
            );
          }

          // HEADING COLOUR SHIFTS
          timeline
            .to(
              ".card-reveal-blue",
              {
                color: "#9ec6ff",
                duration: 0.9,
                stagger: 0.12,
                ease: "none",
              },
              1.2
            )
            .to(
              ".card-reveal-blue",
              {
                color: "#b2c0d4",
                duration: 1.1,
                stagger: 0.12,
                ease: "none",
              },
              2.15
            );

          // LABEL
          timeline.fromTo(
            ".card-reveal-label",
            {
              autoAlpha: 0,
              y: 40,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            },
            1.1
          );

          // DESCRIPTION
          timeline.fromTo(
            ".card-reveal-description",
            {
              autoAlpha: 0,
              y: 90,
              filter: "blur(6px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power2.out",
            },
            1.8
          );

          // CTA
          timeline.fromTo(
            ".card-reveal-cta",
            {
              autoAlpha: 0,
              y: 80,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            2.4
          );

          return () => timeline.kill();
        }
      );

      // MOBILE — SIMPLER, NO PIN
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            motion,
            {
              rotationY: -1.1,
              rotationX: -0.15,
              rotationZ: -0.2,
              y: -0.2,
              scale: 0.85,
            },
            {
              rotationY: 0.15,
              rotationX: -0.1,
              rotationZ: -0.12,
              y: 0,
              scale: 0.94,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "center center",
                scrub: 0.6,
              },
            }
          );

          gsap.fromTo(
            ".card-reveal-headline, .card-reveal-label, .card-reveal-description, .card-reveal-cta",
            {
              autoAlpha: 0,
              y: 55,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 65%",
                once: true,
              },
            }
          );
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        Object.assign(motion, {
          rotationX: -0.1,
          rotationY: 0.12,
          rotationZ: -0.12,
          y: 0,
          scale: 0.94,
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [],
    }
  );

  return (
    <section
      ref={sectionRef}
      id="card"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#09111d] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 40%, rgba(55,80,115,.23), transparent 48%), linear-gradient(120deg,#111d2e 0%,#09111d 58%,#060c15 100%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1600px] items-center gap-8 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:py-0">

        {/* LEFT CARD */}
        <div className="relative z-0 h-[310px] w-full min-w-0 sm:h-[410px] lg:h-[560px]">
          <CardRevealScene ref={sceneRef} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative z-20 w-full min-w-0 max-w-[560px] lg:pl-6">
          {/* 3D HEADLINE */}
          <div className="card-reveal-headline">
            <h2 className="font-[family-name:var(--font-manrope)] text-[clamp(2.3rem,3.6vw,4.2rem)] font-light leading-[1.15] tracking-[-0.065em]">
              <span className="card-reveal-blue block text-[#a7b4c8]">
                A more personal
              </span>

              <span className="card-reveal-blue mt-2 block text-[#a7b4c8]">
                way to access
              </span>

              <span className="mt-2 block text-white">
                greater possibilities.
              </span>
            </h2>
          </div>

          <p className="card-reveal-description mt-7 max-w-[420px] text-[14px] font-light leading-[1.9] text-[#8c9aaf]">
            Explore a more considered approach to credit,
            with financing options that put clarity and
            flexibility at the centre of every decision.
          </p>

          <a
            href="#experience"
            className="card-reveal-cta group mt-9 inline-flex items-center gap-5 text-[11px] tracking-[0.17em] text-[#dce5f2] transition-colors hover:text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#65778e]/60 text-[18px] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            EXPLORE FINANCING
          </a>
        </div>
      </div>

      {/* SUBTLE SCROLL INDICATOR */}
      <div
        className="aether-card-scroll-cue pointer-events-none absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-4 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#94a3b8]">
          Continue to explore
        </span>

        <span className="aether-card-scroll-track">
          <span className="aether-card-scroll-progress" />
        </span>
      </div>
    </section>
  );
}
