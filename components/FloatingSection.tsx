
"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function GlassCard({
    children,
    className = "",
    }: {
    children: ReactNode;
    className?: string;
    }) {
    const cardRef = useRef<HTMLDivElement>(null);

    function handleMouseMove(
        e: MouseEvent<HTMLDivElement>
    ) {
        const card = cardRef.current;
        if (!card || !window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

        const rect = card.getBoundingClientRect();

        const x =
        (e.clientX - rect.left) / rect.width - 0.5;
        const y =
        (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
        rotationY: x * 7,
        rotationX: -y * 7,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
        });

        card.style.setProperty(
        "--mx",
        `${(x + 0.5) * 100}%`
        );

        card.style.setProperty(
        "--my",
        `${(y + 0.5) * 100}%`
        );
    }

    function handleMouseLeave() {
        if (!cardRef.current || !window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

        gsap.to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.85,
        ease: "power3.out",
        overwrite: "auto",
        });
    }

    return (
        <div className={`aether-float-wrap ${className}`}>
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="aether-floating-glass"
        >
            <div className="aether-glass-sheen" />
            <div className="aether-glass-edge" />

            <div className="relative z-10 h-full">
            {children}
            </div>
        </div>

        <div className="aether-floating-shadow" />
        </div>
    );
    }

    function VisibilityCard() {
    return (
        <GlassCard className="aether-float-left">
        <div className="flex h-full flex-col">
            <div className="flex items-start justify-between">
            <h3 className="text-[18px] font-normal leading-[1.25] tracking-[-0.04em] text-[#eef2f8] sm:text-[22px]">
                Real-time
                <br />
                Financial Visibility
            </h3>

            <span className="aether-arrow-button">
                ↗
            </span>
            </div>

            <div className="relative mt-6 flex-1 overflow-hidden rounded-[9px] bg-[linear-gradient(145deg,#19283a,#080e17)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(120,145,175,0.15),transparent_65%)]" />

            <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] tracking-[0.1em] text-[#8c9eb4]">
                YOUR FINANCIAL OVERVIEW
                </span>

                <div className="mt-3 flex items-end justify-between">
                <div>
                    <p className="text-[11px] text-[#a0aec0]">
                    Example balance
                    </p>

                    <p className="mt-1 text-[clamp(1.6rem,2.5vw,2.3rem)] font-normal tracking-[-0.055em] text-white">
                    RM 248,750
                    </p>
                </div>

                <span className="text-[12px] text-[#b8cce2]">
                    +12.8%
                </span>
                </div>

                <svg
                viewBox="0 0 320 70"
                className="mt-5 w-full"
                fill="none"
                >
                <path
                    d="M0 55 C35 55 42 22 75 30 S120 60 160 39 S205 9 240 24 S285 39 320 12"
                    stroke="#a8bfd8"
                    strokeWidth="2"
                />

                <circle
                    cx="320"
                    cy="12"
                    r="5"
                    fill="#dbe8f7"
                />
                </svg>
            </div>
            </div>
        </div>
        </GlassCard>
    );
    }

    function InsightCard() {
    return (
        <GlassCard className="aether-float-middle">
        <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
            <h3 className="text-[19px] font-normal tracking-[-0.04em] text-[#f0f4f9] sm:text-[22px]">
                AI-Powered Insight
            </h3>

            <span className="text-[24px] text-[#c6d5e7]">
                ↗
            </span>
            </div>

            <div className="relative my-8 flex h-[115px] items-center justify-center overflow-hidden">
            <svg
                viewBox="0 0 340 110"
                className="absolute inset-0 h-full w-full"
                fill="none"
                preserveAspectRatio="none"
            >
                <path
                d="M0 85 C80 110 135 10 210 35 S290 75 340 12"
                stroke="#8ca8c6"
                strokeWidth="1.2"
                />

                <path
                d="M0 85 C80 110 135 10 210 35 S290 75 340 12 L340 110 L0 110 Z"
                fill="url(#insightFill)"
                />

                <defs>
                <linearGradient
                    id="insightFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                    stopColor="#7897ba"
                    stopOpacity="0.18"
                    />
                    <stop
                    offset="1"
                    stopColor="#7897ba"
                    stopOpacity="0"
                    />
                </linearGradient>
                </defs>
            </svg>

            <span className="relative text-[52px] text-[#d8e6f5]">
                ✦
            </span>
            </div>

            <p className="max-w-[270px] text-[13px] font-light leading-[1.8] text-[#a8b8cb]">
            Explore your financial information
            through a clearer, more considered
            perspective.
            </p>
        </div>
        </GlassCard>
    );
    }

    function SecurityCard() {
    return (
        <GlassCard className="aether-float-right">
        <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
            <h3 className="text-[19px] font-normal tracking-[-0.04em] text-[#f0f4f9] sm:text-[22px]">
                Security by Design
            </h3>

            <span className="text-[24px] text-[#c6d5e7]">
                ↗
            </span>
            </div>

            <div className="relative my-6 flex h-[125px] items-center justify-center">
            <svg
                width="84"
                height="96"
                viewBox="0 0 84 96"
                fill="none"
            >
                <path
                d="M42 5 L76 19 V45 C76 67 60 82 42 91 C24 82 8 67 8 45 V19 Z"
                stroke="#b7cbe1"
                strokeWidth="2"
                fill="rgba(110,140,175,0.05)"
                />

                <rect
                x="29"
                y="43"
                width="26"
                height="22"
                rx="4"
                stroke="#d8e4f1"
                strokeWidth="2"
                />

                <path
                d="M34 43 V35 C34 24 50 24 50 35 V43"
                stroke="#d8e4f1"
                strokeWidth="2"
                />
            </svg>
            </div>

            <p className="max-w-[270px] text-[13px] font-light leading-[1.8] text-[#a8b8cb]">
            A thoughtfully designed interface
            that keeps important information
            clear and accessible.
            </p>
        </div>
        </GlassCard>
    );
    }

    export default function AetherFloatingSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const mm = gsap.matchMedia();

            // Desktop: retain the original entrance and independent floating motion.
            mm.add(
                "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                () => {
                    gsap.from(".aether-floating-heading", {
                        opacity: 0,
                        y: 35,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            once: true,
                        },
                    });

                    gsap.from(".aether-float-wrap", {
                        opacity: 0,
                        y: 65,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            once: true,
                        },
                    });

                    const floats = [
                        { selector: ".aether-float-left", distance: -24, duration: 2.8, delay: 0 },
                        { selector: ".aether-float-middle", distance: -30, duration: 3.2, delay: 0.45 },
                        { selector: ".aether-float-right", distance: -22, duration: 2.6, delay: 0.85 },
                    ];

                    floats.forEach(({ selector, distance, duration, delay }) => {
                        gsap.to(selector, {
                            y: distance,
                            duration: duration / 2,
                            delay,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                        });
                    });

                    gsap.to(".aether-floating-shadow", {
                        scaleX: 0.8,
                        opacity: 0.35,
                        duration: 1.5,
                        stagger: 0.3,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            );

            // Mobile/tablet: each card reveals as it enters the viewport.
            // No perpetual floating, no pinning, and no touch-driven tilt.
            mm.add(
                "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
                () => {
                    gsap.fromTo(
                        ".aether-floating-heading",
                        { autoAlpha: 0, y: 18 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: ".aether-floating-heading",
                                start: "top 90%",
                                once: true,
                            },
                        }
                    );

                    const cards = gsap.utils.toArray<HTMLElement>(
                        ".aether-float-wrap",
                        section
                    );

                    cards.forEach((card) => {
                        // Animate the outer wrapper, leaving the glass surface untouched.
                        // The scroll distance controls the reveal; no idle movement.
                        gsap.fromTo(
                            card,
                            {
                                autoAlpha: 0.4,
                                y: 34,
                                rotationX: 3,
                                scale: 0.975,
                                transformPerspective: 1100,
                                transformOrigin: "50% 70%",
                            },
                            {
                                autoAlpha: 1,
                                y: 0,
                                rotationX: 0,
                                scale: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 94%",
                                    end: "top 54%",
                                    scrub: 0.65,
                                    invalidateOnRefresh: true,
                                },
                            }
                        );
                    });
                }
            );

            // Accessibility: display everything immediately without motion.
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(".aether-floating-heading, .aether-float-wrap, .aether-floating-shadow", {
                    clearProps: "transform,opacity,visibility",
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
        ref={sectionRef}
        id="aether-platform"
        className="aether-floating-section relative isolate overflow-hidden px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-20"
        >
        <div className="aether-floating-atmosphere" />

        <div className="relative mx-auto max-w-[1450px]">
            <div className="aether-floating-heading text-center">
            <h2 className="mx-auto mt-7 max-w-[800px] font-[family-name:var(--font-manrope)] text-[clamp(2.2rem,4vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.06em] text-[#f1f4f9]">
                Designed for a clearer
                <br className="hidden sm:block" />
                {" "}financial picture.
            </h2>
            </div>

            <div className="relative mt-10 grid items-center gap-5 sm:gap-7 lg:mt-18 lg:grid-cols-3 lg:gap-6">
            <span className="aether-background-number hidden lg:block left-[32%] bottom-[-6%]">
                02
            </span>

            <span className="aether-background-number hidden lg:block right-[3%] top-[-15%]">
                03
            </span>

            <VisibilityCard />
            <InsightCard />
            <SecurityCard />
            </div>
        </div>
        </section>
    );
}

