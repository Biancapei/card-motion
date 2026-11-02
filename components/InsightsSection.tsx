
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const insights = [
  {
    number: "01",
    title: "A clearer view of your financing.",
    description:
      "Explore the amount, repayment period and illustrative monthly principal together.",
    tag: "Clarity",
  },
  {
    number: "02",
    title: "Consider what works for you.",
    description:
      "Compare different repayment periods and see how the monthly illustration changes.",
    tag: "Flexibility",
  },
  {
    number: "03",
    title: "Understand the details before deciding.",
    description:
      "Review the important figures with a simple, transparent breakdown.",
    tag: "Confidence",
  },
  {
    number: "04",
    title: "Move forward with more perspective.",
    description:
      "Take the time to explore your options before making your next decision.",
    tag: "Perspective",
  },
];

export default function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".insights-intro",
          { autoAlpha: 0, y: 45 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".insights-row",
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.13,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".insights-list",
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".insights-accent",
          { color: "#8797ac" },
          {
            color: "#dce9fb",
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: ".insights-list",
              start: "top 80%",
              end: "bottom 45%",
              scrub: 1.2,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative isolate overflow-hidden bg-[#080f1a] text-white"
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 48% 80% at 0% 40%,
              rgba(53,81,117,0.21),
              transparent 80%
            ),
            linear-gradient(
              115deg,
              #101b2b 0%,
              #0a1321 42%,
              #070e19 100%
            )
          `,
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">

          {/* LEFT EDITORIAL */}
          <div className="insights-intro lg:sticky lg:top-32 lg:self-start">
            <h2 className="max-w-[560px] font-[family-name:var(--font-manrope)] text-[clamp(2.3rem,4.1vw,4.6rem)] font-normal leading-[1.12] tracking-[-0.065em] text-[#f0f4fa]">
              Financial clarity,
              <br />
              <span className="text-[#96a9c2]">
                without the
                <br />
                complexity.
              </span>
            </h2>

            <p className="mt-8 max-w-[380px] text-[13px] font-light leading-[1.95] text-[#92a2b7]">
              Aether continuously analyzes your financial data to surface risk opportunities, & the next best action.
            </p>

            <a
              href="#features"
              className="group mt-10 inline-flex items-center gap-5 text-[11px] tracking-[0.12em] text-[#e0e9f6] transition-colors hover:text-white"
            >
              EXPLORE YOUR OPTIONS

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8ba2c0]/40 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#c4d6ec]/70">
                <span className="text-[18px]">↗</span>
              </span>
            </a>
          </div>

          {/* RIGHT INSIGHTS */}
          <div className="insights-list">
            {insights.map((insight, index) => (
              <article
                key={insight.number}
                className={`insights-row group relative py-8 sm:py-10 ${
                  index > 0
                    ? "border-t border-white/[0.075]"
                    : ""
                }`}
              >
                <div className="flex items-start gap-5 sm:gap-7">
                  <span className="mt-1 shrink-0 font-[family-name:var(--font-manrope)] text-[11px] tracking-[0.07em] text-[#70839e]">
                    [{insight.number}]
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h3 className="insights-accent max-w-[360px] font-[family-name:var(--font-manrope)] text-[clamp(1.05rem,1.5vw,1.35rem)] font-normal leading-[1.45] tracking-[-0.035em]">
                        {insight.title}
                      </h3>

                      <span className="rounded-full border border-[#8197b4]/20 px-3 py-1 text-[9px] text-[#8499b3] transition-colors duration-500 group-hover:border-[#a7bfdc]/40 group-hover:text-[#c2d2e6]">
                        {insight.tag}
                      </span>
                    </div>

                    <p className="mt-4 max-w-[440px] text-[12px] font-light leading-[1.9] text-[#8293a9]">
                      {insight.description}
                    </p>
                  </div>
                </div>

                {/* SUBTLE HOVER LIGHT */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(109,147,194,0.055),transparent_75%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
  