
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navItems = [
  { label: "Discover", href: "#experience" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#how-it-works" },
];

export default function HeroEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".editorial-nav", {
        opacity: 0,
        y: -18,
        duration: 1.2,
      })
        .from(
          ".editorial-meta",
          {
            opacity: 0,
            y: 12,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          ".editorial-title-line",
          {
            yPercent: 110,
            stagger: 0.14,
            duration: 1.3,
          },
          "-=0.6"
        )
        .from(
          ".editorial-bottom",
          {
            opacity: 0,
            y: 16,
            duration: 0.9,
          },
          "-=0.7"
        );
    },
    { scope: containerRef }
  );

  // Prevent page scrolling behind the menu.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // Close the mobile menu if the viewport switches to desktop.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      if (media.matches) setMenuOpen(false);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      menuTimelineRef.current?.kill();

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      menuTimelineRef.current?.kill();

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const duration = reducedMotion ? 0 : 1;

      if (menuOpen) {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
        }

        setMenuVisible(true);

        gsap.set(menu, {
          visibility: "visible",
          pointerEvents: "auto",
        });

        const timeline = gsap.timeline();

        timeline.fromTo(
          menu,
          {
            xPercent: 105,
            rotationY: reducedMotion ? 0 : -9,
            transformPerspective: 1500,
            transformOrigin: "100% 50%",
          },
          {
            xPercent: 0,
            rotationY: 0,
            duration,
            ease: "expo.inOut",
          }
        );

        timeline.fromTo(
          ".aether-mobile-menu-inner",
          {
            x: reducedMotion ? 0 : 45,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: reducedMotion ? 0 : 0.9,
            ease: "power3.out",
          },
          reducedMotion ? 0 : 0.4
        );

        timeline.fromTo(
          ".aether-mobile-menu-link",
          {
            yPercent: reducedMotion ? 0 : 115,
            opacity: 0,
            rotationX: reducedMotion ? 0 : -12,
          },
          {
            yPercent: 0,
            opacity: 1,
            rotationX: 0,
            stagger: reducedMotion ? 0 : 0.09,
            duration: reducedMotion ? 0 : 0.9,
            ease: "power4.out",
          },
          reducedMotion ? 0 : 0.48
        );

        timeline.fromTo(
          ".aether-mobile-menu-footer",
          {
            opacity: 0,
            y: reducedMotion ? 0 : 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0 : 0.7,
            ease: "power2.out",
          },
          reducedMotion ? 0 : 0.8
        );

        menuTimelineRef.current = timeline;
      } else if (menuVisible) {
        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(menu, {
              visibility: "hidden",
              pointerEvents: "none",
            });

            setMenuVisible(false);
            triggerRef.current?.focus({ preventScroll: true });
          },
        });

        timeline.to(".aether-mobile-menu-inner", {
          x: reducedMotion ? 0 : 25,
          opacity: 0,
          duration: reducedMotion ? 0 : 0.28,
          ease: "power2.in",
        });

        timeline.to(
          menu,
          {
            xPercent: 105,
            rotationY: reducedMotion ? 0 : -6,
            duration: reducedMotion ? 0 : 0.85,
            ease: "expo.inOut",
          },
          reducedMotion ? 0 : 0.08
        );

        menuTimelineRef.current = timeline;
      }
    },
    {
      dependencies: [menuOpen],
      scope: menuRef,
    }
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible text-[#f1f0ed]"
    >
      {/* DESKTOP / MOBILE HEADER */}
      <header className="editorial-nav pointer-events-auto absolute inset-x-0 top-0 z-30 px-6 pt-2 md:px-12 md:pt-2">
        <div className="grid h-12 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#home"
            aria-label="Aether home"
            className="justify-self-start font-[family-name:var(--font-manrope)] text-[26px] font-semibold leading-none tracking-[-0.09em] text-[#f1f2f4] md:text-[30px]"
          >
            aether
            <span className="text-[#a6b8ce]">.</span>
          </a>

          <nav
            aria-label="Main navigation"
            className="aether-optical-glass relative hidden h-[38px] w-fit items-center justify-self-center gap-0.5 rounded-full px-[5px] lg:inline-flex"
          >
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`aether-optical-link flex h-[28px] items-center rounded-full px-[18px] text-[11px] font-medium tracking-[-0.01em] ${
                  index === 0
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#get-started"
            className="aether-optical-cta group relative hidden h-[38px] w-fit shrink-0 items-center justify-self-end gap-3 rounded-full px-5 text-[11px] font-medium tracking-[-0.01em] text-white lg:inline-flex"
          >
            <span className="relative z-10">Get started</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 19 19 5" />
              <path d="M8 5h11v11" />
            </svg>
          </a>

          {/* MOBILE TOGGLE */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="aether-mobile-menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="aether-glass-cta relative z-50 flex h-10 w-12 items-center justify-center justify-self-end rounded-full lg:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-5 bg-white transition-transform duration-500 ${
                  menuOpen
                    ? "translate-y-[3px] rotate-45"
                    : ""
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-500 ${
                  menuOpen
                    ? "w-5 -translate-y-[3px] -rotate-45"
                    : "w-3.5 self-end"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* FULL SCREEN MOBILE NAVIGATION */}
      <nav
        ref={menuRef}
        id="aether-mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className="aether-mobile-menu pointer-events-none fixed inset-0 z-40 hidden h-[100dvh] w-full overflow-hidden lg:!hidden"
        style={{
          display: "block",
          visibility: "hidden",
        }}
      >
        {/* MOBILE MENU CLOSE BUTTON */}
        <button
        type="button"
        onClick={closeMenu}
        aria-label="Close navigation"
        className="aether-mobile-close absolute right-6 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full sm:right-12"
        >
        <span className="relative block h-5 w-5">
            <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-white" />
            <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-white" />
        </span>
        </button>

        {/* ANIMATED BACKGROUND */}
        <div className="aether-mobile-menu-background" aria-hidden="true">
          <div className="aether-mobile-gradient-one" />
          <div className="aether-mobile-gradient-two" />
          <div className="aether-mobile-gradient-three" />
          <div className="aether-mobile-menu-grain" />
        </div>

        <div className="aether-mobile-menu-inner relative z-10 flex h-full flex-col px-7 pb-8 pt-24 sm:px-12">
          <div className="flex-1 flex flex-col justify-center">
            <span className="mb-8 text-[10px] font-medium tracking-[0.24em] text-[#8397b1]">
              NAVIGATION 
            </span>

            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="overflow-hidden border-b border-white/[0.12]"
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="aether-mobile-menu-link group flex items-center gap-4 py-5 text-[#edf2f8]"
                  >
                    <span className="w-6 shrink-0 text-[10px] text-[#8397b1]">
                      0{index + 1}
                    </span>

                    <span className="flex-1 font-[family-name:var(--font-manrope)] text-[clamp(2.3rem,9vw,4.4rem)] font-light leading-[1.1] tracking-[-0.075em] transition-colors duration-300 group-hover:text-[#b7cce5]">
                      {item.label}
                    </span>

                    <span className="text-[23px] font-light text-[#9db4ce] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              ))}

              <div className="overflow-hidden border-b border-white/[0.12]">
                <a
                  href="#get-started"
                  onClick={closeMenu}
                  className="aether-mobile-menu-link group flex items-center gap-4 py-5 text-[#edf2f8]"
                >
                  <span className="w-6 shrink-0 text-[10px] text-[#8397b1]">
                    04
                  </span>

                  <span className="flex-1 font-[family-name:var(--font-manrope)] text-[clamp(2.3rem,9vw,4.4rem)] font-light leading-[1.1] tracking-[-0.075em]">
                    Get started
                  </span>

                  <span className="text-[23px] font-light text-[#9db4ce]">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="aether-mobile-menu-footer flex items-end justify-between gap-5 border-t border-white/[0.12] pt-5">
            <p className="max-w-[190px] text-[10px] font-light leading-[1.7] tracking-[0.07em] text-[#9cacc0]">
              A DIFFERENT PERSPECTIVE
              <br />
              ON CREDIT.
            </p>

            <span className="text-[10px] tracking-[0.12em] text-[#778ba3]">
              AETHER © 2026
            </span>
          </div>
        </div>
      </nav>

      {/* TOP EDITORIAL LABEL */}
      <div className="absolute left-6 top-[110px] max-w-[320px] md:left-12 md:top-[115px] md:max-w-[390px]">
        <p className="editorial-meta font-[family-name:var(--font-manrope)] text-[13px] font-light leading-[1.65] tracking-[-0.01em] text-[#c8d2e2]">
          Automate financial operations, monitor cash flow in real time,
          <br className="hidden md:block" /> generate intelligent
          forecasts, & make faster.
        </p>
      </div>

      {/* BOTTOM EDITORIAL COMPOSITION */}
      <div className="pointer-events-none absolute inset-x-6 bottom-4 z-20 flex flex-col-reverse gap-5 sm:bottom-5 md:inset-x-12 md:bottom-4 md:flex-row md:items-end md:justify-between">
        <div className="editorial-bottom pointer-events-auto flex items-center gap-3">
          <a
            href="#get-started"
            className="aether-bottom-primary group inline-flex h-[38px] items-center gap-5 rounded-full px-5 text-[11px] font-medium text-white"
          >
            Explore the card
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>

          <a
            href="#how-it-works"
            className="aether-bottom-secondary group inline-flex h-[38px] items-center gap-3 rounded-full px-5 text-[11px] font-medium text-white/85 transition-colors hover:text-white"
          >
            How it works
          </a>
        </div>

        <div className="max-w-[650px] text-left md:text-right">
          <h1 className="font-[family-name:var(--font-manrope)] text-[clamp(2.25rem,4.2vw,5rem)] leading-[1.02] tracking-[-0.065em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="editorial-title-line block font-light text-[#aebbd0]">
                Smarter credit,
              </span>
            </span>

            <span className="block overflow-hidden pb-[0.08em]">
              <span className="editorial-title-line block font-normal text-[#f3f5f8]">
                Simpler possibilities.
              </span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
