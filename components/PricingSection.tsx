
"use client";

import { useState } from "react";
import PixelCard from "./PixelCard";
import { gsap } from "gsap";

type Plan = {
    name: string;
    subtitle: string;
    monthly: number | null;
    features: string[];
    featured?: boolean;
    };

    const plans: Plan[] = [
    {
        name: "Starter",
        subtitle: "Perfect for growing teams.",
        monthly: 29,
        features: [
        "AI Budget Tracking",
        "Expense Monitoring",
        "Financial Reports",
        "Up to 5 Team Members",
        ],
    },
    {
        name: "Professional",
        subtitle: "For scaling finance teams.",
        monthly: 99,
        featured: true,
        features: [
        "AI Forecasting",
        "Advanced Analytics",
        "Cash Flow Intelligence",
        "Custom Dashboards",
        "Unlimited Reports",
        ],
    },
    {
        name: "Enterprise",
        subtitle: "For larger organizations.",
        monthly: null,
        features: [
        "Multi-Entity Management",
        "Dedicated AI Models",
        "Advanced Security",
        "Priority Support",
        "Custom Integrations",
        ],
    },
    ];

    export default function AetherPricingSection() {
        const [annual, setAnnual] = useState(false);

        const handleCardMove = (
        e: React.MouseEvent<HTMLDivElement>
        ) => {
        if (
            window.matchMedia(
            "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        card.style.setProperty("--px", `${x * 100}%`);
        card.style.setProperty("--py", `${y * 100}%`);

        gsap.to(card, {
            rotationY: (x - 0.5) * 7,
            rotationX: (0.5 - y) * 7,
            duration: 0.65,
            ease: "power3.out",
            overwrite: "auto",
        });
        };

        const handleCardLeave = (
        e: React.MouseEvent<HTMLDivElement>
        ) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
        });
        };

    return (
        <section
        id="pricing"
        className="relative isolate overflow-hidden bg-[#050a12] px-5 py-24 text-[#edf2f8] sm:px-8 lg:px-12 lg:py-32"
        >
        {/* Atmospheric background */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
            background: `
                radial-gradient(
                ellipse at 50% 32%,
                rgba(43,62,86,0.19),
                transparent 58%
                ),
                linear-gradient(
                180deg,
                #050a12 0%,
                #0a1422 52%,
                #040810 100%
                )
            `,
            }}
        />

        <div className="relative mx-auto max-w-[1280px]">
            {/* Heading */}
            <div className="mb-10 text-center md:mb-12">
            <h2 className="mt-6 font-[family-name:var(--font-manrope)] text-[clamp(2rem,3.8vw,4rem)] font-normal leading-[1.15] tracking-[-0.06em]">
                Simple plans.
                <br className="sm:hidden" />{" "}
                <span className="text-[#a6b5c8]">
                Serious impact.
                </span>
            </h2>

            <p className="mx-auto mt-4 max-w-[440px] text-[12px] leading-[1.8] text-[#8c9db1]">
                Start small, scale without limits.
                Every plan includes intelligent automation.
            </p>

            <div className="mt-9 inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.035] p-1">
                <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={`rounded-full px-5 py-2.5 text-[11px] transition-all duration-300 ${
                    !annual
                    ? "bg-[#27374b] text-white"
                    : "text-[#8d9db1] hover:text-white"
                }`}
                >
                Monthly
                </button>

                <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={`rounded-full px-5 py-2.5 text-[11px] transition-all duration-300 ${
                    annual
                    ? "bg-[#27374b] text-white"
                    : "text-[#8d9db1] hover:text-white"
                }`}
                >
                Annually{" "}
                <span className="ml-1 text-[#c1d0e1]">
                    Save 20%
                </span>
                </button>
            </div>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
                const price =
                plan.monthly === null
                    ? null
                    : annual
                    ? plan.monthly * 0.8
                    : plan.monthly;

                return (
                <div
                    key={plan.name}
                    onMouseMove={handleCardMove}
                    onMouseLeave={handleCardLeave}
                    className={`aether-pricing-shell ${
                        plan.featured ? "aether-pricing-featured" : ""
                    }`}
                    style={{
                        perspective: "1400px",
                    }}
                >

                <PixelCard
                colors={[
                    "#09111d",
                    "#34475e",
                    "#b2c5d9",
                    "#050a12",
                ]}
                glowColor="#a6bbd2"
                shape="circle"
                origin="center"
                gap={4}
                pixelSize={2}
                speed={42}
                revealDuration={650}
                spotlight={0.85}
                glow={0.55}
                opacity={0.48}
                fade={0.85}
                trigger="hover"
                radius={24}
                clickPulse
                intro
                theme="dark"
                noFocus={false}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                >
                    <div className="aether-pricing-content">
                        <div>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                            <h3 className="text-[23px] font-normal tracking-[-0.055em] text-[#f2f5fa]">
                                {plan.name}
                            </h3>

                            <p className="mt-1 text-[12px] text-[#98a9bd]">
                                {plan.subtitle}
                            </p>
                            </div>

                            {plan.featured && (
                            <span className="rounded-full border border-[#b9c8db]/25 px-3 py-1 text-[9px] tracking-[0.07em] text-[#d1deed]">
                                POPULAR
                            </span>
                            )}
                        </div>

                        <div className="mt-8 flex h-[64px] items-center gap-2">
                        {price === null ? (
                            <>
                            <span className="text-[clamp(2rem,2.7vw,3rem)] font-normal leading-none tracking-[-0.07em]">
                                Custom
                            </span>

                            <span className="self-center pt-3 text-[11px] text-[#8c9eb4]">
                                pricing
                            </span>
                            </>
                        ) : (
                            <>
                            <span className="text-[clamp(2rem,2.7vw,3rem)] font-normal leading-none tracking-[-0.07em]">
                                ${Number.isInteger(price)
                                ? price
                                : price.toFixed(2)}
                            </span>

                            <span className="self-center pt-3 text-[11px] text-[#8c9eb4]">
                                /month
                            </span>
                            </>
                        )}
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                            }}
                            className="aether-pricing-button mt-4 flex w-full items-center justify-between px-4 py-3 text-[12px]"
                        >
                            <span>
                            {price === null
                                ? "Contact Sales"
                                : "Get Started"}
                            </span>
                            <span aria-hidden="true">↗</span>
                        </button>
                        </div>

                        <div className="mt-8 border-t border-white/[0.12] pt-6">
                        <span className="text-[10px] tracking-[0.16em] text-[#a5b5c9]">
                            WHAT&apos;S INCLUDED
                        </span>

                        <ul className="mt-4 space-y-4">
                            {plan.features.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-center gap-3 text-[12px] leading-[1.5] text-[#c4d0de]"
                            >
                                <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[3px] border border-[#a3b8d0]/30 bg-white/[0.045] text-[10px] text-[#c4d6e9]">
                                ✓
                                </span>
                                {feature}
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    </PixelCard>
                </div>
                );
            })}
            </div>
        </div>
        </section>
    );
}
