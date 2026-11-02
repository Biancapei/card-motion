"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
  <div className="aether-feature-glass relative h-[270px] overflow-hidden rounded-[18px] sm:h-[275px]">
    <div
      className="aether-feature-reflection pointer-events-none absolute inset-0"
      aria-hidden="true"
    />

    <div className="relative z-10 flex h-full items-center justify-center px-5 py-4 sm:p-8">
      <div className="flex w-full max-w-[390px] flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-semibold text-[#e2e9f4]">
              a.
            </span>

            <span className="truncate text-[11px] text-[#e5edf7] sm:text-[12px]">
              Financial assistant
            </span>
          </div>

          <span className="shrink-0 rounded-full border border-white/[0.12] px-2 py-1 text-[9px] text-[#a2b2c8]">
            Preview
          </span>
        </div>

        {/* QUESTION */}
        <p className="mt-5 max-w-[270px] text-[11px] leading-[1.65] text-[#a9bbd0] sm:text-[12px]">
          How is our financial performance looking this quarter?
        </p>

        {/* RESPONSE */}
        <div className="mt-4 rounded-[9px] border border-white/[0.08] bg-white/[0.035] p-3">
          <p className="text-[10px] leading-[1.6] text-[#e2eaf4] sm:text-[11px]">
            Your financial overview is ready. Explore trends,
            reporting, and key observations in one place.
          </p>
        </div>

        {/* INPUT */}
        <div className="mt-4 flex h-[38px] items-center justify-between rounded-full border border-white/[0.12] pl-4 pr-2">
          <span className="text-[10px] text-[#7f92aa]">
            Ask a question...
          </span>

          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a9bdd4] text-[12px] text-[#07101d]">
            ↗
          </span>
        </div>
      </div>
    </div>
  </div>
  );
}

function AssistantVisual() {
  return (
    <div className="flex w-full max-w-[390px] flex-col px-2 py-3 sm:p-5">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center text-[11px] text-[#e2e9f4]">a.</span><span className="text-[12px] text-[#e5edf7]">Financial assistant</span></div>
        <span className="rounded-full border border-white/[0.12] px-2 py-1 text-[9px] text-[#a2b2c8]">Preview</span>
      </div>
      <p className="mt-5 max-w-[270px] text-[12px] leading-relaxed text-[#a9bbd0]">How is our financial performance looking this quarter?</p>
      <div className="mt-4 rounded-[9px] border border-white/[0.08] bg-white/[0.035] p-3">
        <p className="text-[11px] leading-[1.6] text-[#e2eaf4]">Your financial overview is ready. Explore trends, reporting, and key observations in one place.</p>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-full border border-white/[0.12] px-4 py-2.5"><span className="text-[10px] text-[#7f92aa]">Ask a question...</span><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a9bdd4] text-[12px] text-[#07101d]">↗</span></div>
    </div>
  );
}

function ForecastVisual() {
  const bars = [36, 48, 42, 59, 54, 69, 65, 79, 72, 88, 83, 96];
  return (
    <div className="w-full max-w-[390px] p-5">
      <div className="flex items-center justify-between"><span className="text-[11px] text-[#a8b8cc]">Revenue outlook</span><span className="rounded-full border border-white/[0.12] px-2 py-1 text-[9px] text-[#a2b2c8]">Illustrative</span></div>
      <div className="mt-5 flex items-end justify-between"><div><div className="text-[30px] font-normal tracking-[-0.055em] text-[#eef3fa]">+22%</div><div className="text-[10px] text-[#8599b0]">Projected growth</div></div><div className="text-right text-[10px] text-[#9eb1c8]">Next 12 months</div></div>
      <div className="mt-6 flex h-[75px] items-end gap-[5px] border-b border-white/[0.1] pb-1">{bars.map((height, index) => <div key={index} className="min-w-0 flex-1 rounded-t-[2px] bg-[linear-gradient(180deg,#849dbb,#30455e)]" style={{ height: `${height}%`, opacity: 0.55 + index * 0.035 }} />)}</div>
      <div className="mt-3 flex justify-between text-[9px] text-[#788ca5]"><span>JAN</span><span>JUN</span><span>DEC</span></div>
    </div>
  );
}

function ReportingVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute bottom-[12%] h-9 w-[58%] rounded-full bg-[#4d6787]/20 blur-2xl" />
      <div className="relative h-[155px] w-[205px] sm:h-[175px] sm:w-[230px]">
        <div className="absolute left-[15%] top-0 h-[130px] w-[70%] rotate-[-8deg] rounded-[7px] border border-[#9daec5]/30 bg-[#d4deea] p-3 shadow-xl"><div className="h-2 w-1/2 rounded-sm bg-[#71859d]" /><div className="mt-4 space-y-2">{["w-full","w-[82%]","w-[93%]","w-[60%]"].map((width, i) => <div key={i} className={`h-[3px] ${width} rounded bg-[#a7b5c6]`} />)}</div><div className="mt-4 flex h-8 items-end gap-1">{[50, 75, 60, 90, 70, 100].map((h, i) => <div key={i} className="flex-1 rounded-t-sm bg-[#6c839f]" style={{height:`${h}%`}} />)}</div></div>
        <div className="absolute bottom-0 left-0 flex h-[105px] w-full items-end justify-center rounded-[14px] border border-[#8196af]/35 bg-[linear-gradient(145deg,#354963,#152439_65%,#0a1422)] pb-5 shadow-[0_22px_35px_rgba(0,0,0,0.35)]"><span className="text-[12px] font-medium tracking-[0.02em] text-[#dce6f3]">FINANCIAL REPORT</span><div className="absolute left-0 right-0 top-0 h-[38px] rounded-t-[14px] border-b border-[#a1b3c9]/20 bg-white/[0.055]" /></div>
      </div>
    </div>
  );
}

function ExpenseVisual() {
  const rings = [{size:176, label:"14K", color:"#273b52"},{size:140,label:"9.3K",color:"#3d536d"},{size:105,label:"6.8K",color:"#5d748f"},{size:70,label:"4K",color:"#91a8c0"}];
  return (
    <div className="flex w-full max-w-[390px] flex-col items-center">
      <div className="flex w-full items-center justify-between"><span className="text-[11px] text-[#a8b8cc]">Annual expense profile</span><span className="rounded-full border border-white/[0.12] px-3 py-1 text-[10px] text-[#a2b2c8]">2026</span></div>
      <div className="relative mt-3 h-[185px] w-[185px]">{rings.map((ring) => <div key={ring.label} className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-start justify-center rounded-full border border-white/[0.12] pt-3 text-[10px] text-[#e9eff7]" style={{width:ring.size,height:ring.size,background:ring.color}}><span>{ring.label}</span></div>)}</div>
      <span className="mt-1 text-[9px] tracking-[0.1em] text-[#8c9fb6]">ILLUSTRATIVE BREAKDOWN</span>
    </div>
  );
}

const features = [
  { title: "AI Financial Assistant", description: "Ask questions, generate reports, and receive intelligent financial recommendations instantly.", Visual: AssistantVisual },
  { title: "Revenue Forecasting", description: "Predict future revenue trends with intelligent financial analytics.", Visual: ForecastVisual },
  { title: "Automated Reporting", description: "Generate board-ready financial reports with accurate insights and clarity.", Visual: ReportingVisual },
  { title: "Expense Intelligence", description: "Automatically categorize transactions and identify unusual spending patterns.", Visual: ExpenseVisual },
];

export default function AetherFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".aether-features-heading, .aether-feature", { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="features" className="aether-features-section relative isolate overflow-hidden px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-20">
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <header className="aether-features-heading mb-8 text-center md:mb-10">
          <h2 className="mt-5 font-[family-name:var(--font-manrope)] text-[clamp(2rem,3.4vw,3.5rem)] font-normal leading-[1.15] tracking-[-0.06em] text-[#f1f5fc]">Everything Finance Teams Need</h2>
        </header>
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 md:gap-y-14">
          {features.map(({ title, description, Visual }) => (
            <article
              key={title}
              className="aether-feature min-w-0"
            >
              <GlassPanel>
                <Visual />
              </GlassPanel>

              <div className="mt-5 flex items-start gap-4 px-1">
                <div>
                  <h3 className="text-[16px] font-medium tracking-[-0.035em] text-[#e9eff8]">
                    {title}
                  </h3>

                  <p className="mt-1.5 max-w-[420px] text-[12px] font-light leading-[1.7] text-[#91a3b9]">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .aether-features-section { background: radial-gradient(70% 60% at 12% 18%, #23395338, #0000 75%), radial-gradient(55% 50% at 92% 85%, #1c314b2e, #0000 75%), linear-gradient(145deg, #35475d 0%, #0e1621 55%, #010305 100%); }
        .aether-feature-glass { background:linear-gradient(135deg,rgba(39,62,89,.42),rgba(11,25,43,.28) 48%,rgba(4,13,26,.62)); backdrop-filter:blur(22px) saturate(110%);-webkit-backdrop-filter:blur(22px) saturate(110%); box-shadow:inset 0 1px 0 rgba(226,239,255,.13),inset 0 -1px 0 rgba(129,154,184,.08),0 22px 50px rgba(0,4,13,.18); transition:border-color .5s ease,transform .5s ease,box-shadow .5s ease; }
        .aether-feature-glass:hover {transform:translateY(-3px);border-color:rgba(168,191,218,.4);box-shadow:inset 0 1px 0 rgba(226,239,255,.2),0 26px 60px rgba(0,4,13,.3);}
        .aether-feature-reflection {background:linear-gradient(120deg,rgba(166,195,225,.065),transparent 32%,transparent 70%,rgba(133,162,195,.035));}
        @media (prefers-reduced-motion:reduce) {.aether-feature-glass {transition:none;}}
      `}</style>
    </section>
  );
}
