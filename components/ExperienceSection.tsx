
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiStripe,
  SiPaypal,
  SiWise,
  SiHubspot,
  SiRevolut,
} from "react-icons/si";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* =========================================
   DATA
========================================= */

const topItems = [
  { name: "Stripe", Icon: SiStripe },
  { name: "PayPal", Icon: SiPaypal },
  { name: "Wise", Icon: SiWise },
  { name: "HubSpot", Icon: SiHubspot },
  { name: "Xerox", Icon: null },
  { name: "Revolut", Icon: SiRevolut },
];

const stats = [
  {
    value: 50,
    prefix: "$",
    suffix: "B+",
    label: "Financial Data Processed",
  },
  {
    value: 2000,
    prefix: "",
    suffix: "+",
    label: "Less Manual Work",
  },
  {
    value: 95,
    prefix: "",
    suffix: "%",
    label: "Forecast Accuracy",
  },
];

/* =========================================
   ANIMATED NUMBER
========================================= */

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = numberRef.current;
      if (!element) return;

      const format = (number: number) =>
        prefix +
        Math.round(number).toLocaleString("en-MY") +
        suffix;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      element.textContent = reducedMotion
        ? format(value)
        : format(0);

      if (reducedMotion) return;

      const state = { value: 0 };

      const animation = gsap.to(state, {
        value,
        duration: 1.8,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          element.textContent = format(state.value);
        },
        onComplete: () => {
          element.textContent = format(value);
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 95%",
        once: true,
        onEnter: () => animation.play(),
      });

      return () => {
        trigger.kill();
        animation.kill();
      };
    },
    { dependencies: [value, prefix, suffix] }
  );

  return (
    <span
      ref={numberRef}
      className="
        block whitespace-nowrap
        font-[family-name:var(--font-manrope)]
        text-[clamp(1.05rem,4.7vw,1.5rem)]
        font-normal leading-none
        tracking-[-0.055em]
        text-[#f1f4f9]
        tabular-nums
        lg:text-[clamp(1.5rem,3.4vw,3.7rem)]
      "
      aria-label={`${prefix}${value.toLocaleString("en-MY")}${suffix}`}
    />
  );
}

/* =========================================
   EXPERIENCE SECTION
========================================= */

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // PARTNER LOGOS
          gsap.fromTo(
            ".experience-circle",
            {
              autoAlpha: 0,
              y: 22,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );

          // HEADLINE ENTRANCE
          gsap.fromTo(
            ".experience-statement",
            {
              autoAlpha: 0,
              y: 30,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            }
          );

          // WORD HIGHLIGHT
          gsap.fromTo(
            ".experience-word",
            {
              color: "#56667d",
            },
            {
              color: "#edf3fb",
              stagger: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "bottom 25%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            }
          );

          // SMALL DETAIL
          gsap.fromTo(
            ".experience-small-detail",
            {
              autoAlpha: 0,
              y: 16,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            }
          );

          // STATISTICS
          gsap.fromTo(
            ".experience-stat",
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
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

      mm.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set(".experience-word", {
            color: "#edf3fb",
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="
        relative isolate
        w-full
        overflow-hidden
        bg-[#0a111d] text-white
        lg:h-[100svh]
      "
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0c1523 0%, #0a111d 55%, #080e18 100%)",
        }}
      />

      {/* SUBTLE GRID */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(155,177,207,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(155,177,207,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "33.333% 100%, 100% 50%",
        }}
      />

      {/* MAIN CONTENT */}
      <div
        className="
          relative mx-auto
          grid w-full max-w-[1600px]
          grid-rows-[auto_auto_auto]
          gap-y-9
          px-5 py-12

          sm:gap-y-12
          sm:px-8 sm:py-14

          lg:h-full
          lg:grid-rows-[29%_1fr_25%]
          lg:gap-y-0
          lg:px-12 lg:py-10
        "
      >
        {/* =====================================
            PARTNER LOGOS
        ===================================== */}
        <div
          className="
            grid grid-cols-3
            items-center justify-items-center
            gap-x-4 gap-y-6
            lg:border-b lg:border-white/[0.07]
            pb-2

            sm:gap-x-8 sm:gap-y-8

            lg:min-h-0
            lg:grid-cols-6
            lg:gap-5
            lg:pb-0
          "
        >
          {topItems.map(({ name, Icon }) => (
            <div
              key={name}
              className="
                experience-circle
                flex w-full min-w-0
                items-center justify-center
              "
            >
              <div
                className="
                  group relative
                  flex h-[62px] w-[62px]
                  shrink-0
                  items-center justify-center
                  rounded-full

                  border border-[#91a4c0]/[0.18]
                  bg-[#111d2d]/70

                  transition-all duration-500

                  hover:border-[#a9bfdc]/40
                  hover:bg-[#19283d]/80
                  hover:shadow-[0_0_30px_rgba(110,147,196,0.08)]

                  sm:h-[74px] sm:w-[74px]

                  lg:aspect-square
                  lg:h-auto lg:w-full
                  lg:max-w-[110px]
                "
              >
                {Icon ? (
                  <Icon
                    aria-label={name}
                    className="
                      h-[23px] w-[23px]
                      text-[#edf2f9]
                      transition-transform duration-500
                      group-hover:scale-105

                      lg:h-auto
                      lg:w-[48%]
                      lg:max-h-[27px]
                    "
                  />
                ) : (
                  <span
                    className="
                      text-[11px]
                      font-semibold
                      tracking-[-0.06em]
                      text-[#edf2f9]
                      lg:text-[clamp(9px,1.5vw,21px)]
                    "
                  >
                    xerox
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* =====================================
            CENTER STATEMENT
        ===================================== */}
        <div
          className="
            flex min-h-0 flex-col
            items-center justify-center
            px-0 text-center
            lg:px-2
          "
        >
          <div
            className="
              experience-statement
              mx-auto max-w-[850px]
            "
          >
            <h2
              className="
                font-[family-name:var(--font-manrope)]
                text-[clamp(1.55rem,6.2vw,2.2rem)]
                font-light
                leading-[1.22]
                tracking-[-0.055em]

                lg:text-[clamp(1.3rem,2.8vw,3rem)]
                lg:leading-[1.2]
              "
            >
              <span className="experience-word">
                Revolutionizing financial
              </span>{" "}
              <span className="experience-word">
                operations with AI-powered
              </span>{" "}
              <span className="experience-word">
                automation, insights, accuracy,
              </span>{" "}
              <span className="experience-word">
                and efficiency.
              </span>
            </h2>
          </div>

          {/* SMALL VISUAL DETAIL */}
          <div
            className="
              experience-small-detail
              mt-6 flex items-center gap-2.5
              lg:mt-7
            "
          >
            <span
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                border border-[#7f93ae]/40
                bg-[#152236]
                text-[11px] font-medium
                text-[#d8e5f4]
              "
            >
              a.
            </span>

            <span
              className="
                h-8 w-8 rounded-full
                border border-[#7f93ae]/40
                bg-[linear-gradient(145deg,#506784,#142238)]
              "
            />

            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-full
                border border-[#7f93ae]/40
                text-[14px]
                text-[#d8e5f4]
              "
            >
              +
            </span>
          </div>
        </div>

        {/* =====================================
            STATISTICS
        ===================================== */}
        <div
          className="
            grid min-h-0 grid-cols-3
            items-start
            pt-3
            lg:border-t lg:border-white/[0.07]

            lg:items-stretch
            lg:pt-0
          "
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="experience-stat flex min-w-0 flex-col items-center justify-start px-0.5 text-center lg:justify-center lg:px-8"
              style={{
                gridColumn: "auto",
                gridRow: "auto",
                border: "none",
                paddingTop: 0,
              }}
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />

              <span
                className="
                  mt-2 max-w-[125px]
                  text-[8px] font-light
                  leading-[1.45]
                  tracking-[0.01em]
                  text-[#8292a8]

                  sm:text-[10px]
                  lg:text-[11px]
                "
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
