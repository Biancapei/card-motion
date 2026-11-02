
"use client";

import { useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner",
    quote:
      "AETHER brings everything into focus. Managing our finances feels more intuitive, and the clarity it gives us has completely changed how we approach everyday decisions.",
    rating: 5,
    image: "/images/sarah.png",
  },
  {
    name: "Daniel Carter",
    role: "Founder & CEO",
    quote:
      "What stands out is how effortless the entire experience feels. From understanding our position to planning what comes next, everything feels thoughtfully connected.",
    rating: 5,
    image: "/images/daniel.png",
  },
  {
    name: "Olivia Bennett",
    role: "Finance Director",
    quote:
      "The level of visibility is remarkable. Information that once felt complicated is now presented with clarity, helping our team move forward with greater confidence.",
    rating: 5,
    image: "/images/olivia.png",
  },
  {
    name: "James Anderson",
    role: "Entrepreneur",
    quote:
      "AETHER feels different from traditional financial platforms. It's considered, straightforward, and gives me a much clearer perspective on the possibilities ahead.",
    rating: 5,
    image: "/images/james.png",
  },
  {
    name: "Emily Foster",
    role: "Operations Manager",
    quote:
      "A beautifully simple experience that makes financial information feel approachable. The attention to detail makes every interaction feel genuinely premium.",
    rating: 5,
    image: "/images/emily.png",
  },
];

export default function AetherTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);

  const active = testimonials[activeIndex];

  const changeTestimonial = (direction: number) => {
    if (animating) return;

    const nextIndex =
      (activeIndex + direction + testimonials.length) %
      testimonials.length;

    const content = contentRef.current;

    if (!content) {
      setActiveIndex(nextIndex);
      return;
    }

    setAnimating(true);

    gsap.to(content, {
      opacity: 0,
      y: direction > 0 ? -14 : 14,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(nextIndex);
      },
    });
  };

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          onComplete: () => setAnimating(false),
        }
      );
    },
    { dependencies: [activeIndex] }
  );

  
useGSAP(
  () => {
    const quote = quoteRef.current;
    if (!quote) return;

    const phrases = gsap.utils.toArray<HTMLElement>(
      ".aether-testimonial-phrase",
      quote
    );

    if (!phrases.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        phrases,
        {
          color: "#50647d",
        },
        {
          color: "#edf3fb",
          stagger: 0.24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(phrases, {
        color: "#edf3fb",
      });
    });

    return () => mm.revert();
  },
  {
    scope: sectionRef,
    dependencies: [activeIndex],
    revertOnUpdate: true,
  }
);

  return (
    <section
    ref={sectionRef}
    id="testimonials"
      className="relative isolate overflow-hidden bg-[#050a12] px-5 py-24 text-[#edf2f8] sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 22% 48%, rgba(33,51,75,0.22), transparent 52%), linear-gradient(120deg, #091321 0%, #050a12 65%, #040810 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="mb-14 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.28em] text-[#91a5bd]">
                CUSTOMER STORIES
          </span>

          <span className="text-[11px] tracking-[0.12em] text-[#657b94]">
            0{activeIndex + 1} / 0{testimonials.length}
          </span>
        </div>

        <div
          ref={contentRef}
          className="grid items-center gap-12 md:grid-cols-[0.75fr_1.4fr] md:gap-16 lg:gap-24"
        >
          {/* Portrait */}
          <div>
            <div className="relative aspect-[4/5] max-w-[330px] overflow-hidden border border-[#b5c7dc]/20 bg-[#111d2b]">
              <img
                src={active.image}
                alt={active.name}
                className="h-full w-full object-cover grayscale-[18%]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050a12]/30 via-transparent to-transparent" />
            </div>

            <div className="mt-4">
              <p className="text-[13px] font-medium text-[#e8eef7]">
                {active.name}
              </p>

              <p className="mt-1 text-[11px] text-[#8194ab]">
                {active.role}
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="flex min-h-[340px] flex-col justify-between">
            <div>
              <span className="text-[52px] leading-none text-[#9bb2ce]/45">
                “
              </span>

                <blockquote
                ref={quoteRef}
                className="
                    mt-5 max-w-[740px]
                    font-[family-name:var(--font-manrope)]
                    text-[clamp(1.45rem,2.5vw,2.6rem)]
                    font-light
                    leading-[1.48]
                    tracking-[-0.045em]
                "
                >
                {active.quote
                    .match(/\S+\s*/g)
                    ?.reduce<string[]>((groups, word, index) => {
                    const groupIndex = Math.floor(index / 5);
                    groups[groupIndex] =
                        (groups[groupIndex] || "") + word;
                    return groups;
                    }, [])
                    .map((phrase, index) => (
                    <span
                        key={`${activeIndex}-${index}`}
                        className="aether-testimonial-phrase"
                        style={{ color: "#50647d" }}
                    >
                        {phrase}{" "}
                    </span>
                    ))}
                </blockquote>
            </div>

            <div className="mt-12 flex items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-1 text-[14px] tracking-[0.1em] text-[#b8cce3]">
                  {Array.from(
                    { length: active.rating },
                    (_, index) => (
                      <span key={index}>★</span>
                    )
                  )}
                </div>

                <p className="mt-2 text-[11px] text-[#8094ac]">
                  Concept testimonial
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeTestimonial(-1)}
                  disabled={animating}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center border border-[#b7c8dc]/25 text-[#c5d5e8] transition-colors hover:bg-white/[0.08] disabled:opacity-40"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => changeTestimonial(1)}
                  disabled={animating}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center border border-[#c4d5e9]/45 bg-[#cbd8e8] text-[#07111d] transition-colors hover:bg-[#e5edf6] disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[#9db4cf]/20 to-transparent" />
      </div>
    </section>
  );
}
