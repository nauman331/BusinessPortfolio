"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { StaggerHeading } from "@/components/site/stagger-heading";

type StepItem = {
  step: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
};

const items: StepItem[] = [
  {
    step: "01",
    label: "Roster Sync",
    title: "Connect Your Roster & Website",
    description:
      "Seamlessly integrate our AI calling agent with your existing security portal and guard scheduling system. The AI continuously syncs active shifts, standby guards, and post assignments in real time.",
    image: "/images/how-it-works/step1-roster-sync.jpg",
    imageAlt: "Security Roster and Website AI Synchronization",
    accent: "bg-[#00d4ff]",
  },
  {
    step: "02",
    label: "AI Voice Call",
    title: "Autonomous Voice Dispatch",
    description:
      "When an open shift, absent guard alert, or incident callout is triggered, the AI agent immediately dials guards with natural, conversational voice intelligence and sub-second latency.",
    image: "/images/how-it-works/step2-ai-calling.jpg",
    imageAlt: "Autonomous AI Voice Calling Engine",
    accent: "bg-[#00e5ff]",
  },
  {
    step: "03",
    label: "Guard Response",
    title: "Two-Way Dynamic Verification",
    description:
      "The AI conducts real-time phone dialog with guards—confirming shift availability, verifying security clearance, and handling schedule objections with zero supervisor overhead.",
    image: "/images/how-it-works/step3-guard-response.jpg",
    imageAlt: "Guard Phone Call Verification",
    accent: "bg-[#38bdf8]",
  },
  {
    step: "04",
    label: "Live Update",
    title: "Instant Portal Synchronization",
    description:
      "Confirmed guards are instantly locked into your roster portal. Full audio recordings, call transcripts, and dispatch timestamps are immediately updated on your operations dashboard.",
    image: "/images/how-it-works/step4-live-sync.jpg",
    imageAlt: "Live Roster Status and Call Verification",
    accent: "bg-[#2dd4bf]",
  },
];

export function AboutTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const headingInView = useInView(headingRef, { amount: 0.35 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardWidth = 560;
  const gap = 80;

  const startOffset = useMemo(() => {
    if (!viewportWidth) return 0;
    return Math.max((viewportWidth - cardWidth) / 2, 0);
  }, [viewportWidth]);

  // Exact offset to center the LAST card right in the middle of the viewport
  const endOffset = useMemo(() => {
    if (!viewportWidth) return 0;
    return startOffset - (items.length - 1) * (cardWidth + gap);
  }, [viewportWidth, startOffset]);

  // Last card reaches center by 0.80 scroll progress, and stays centered until 1.0
  const x = useTransform(
    scrollYProgress,
    [0, 0.80, 1],
    [startOffset, endOffset, endOffset],
    { clamp: true }
  );

  const smoothX = useSpring(x, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });

  return (
    <section ref={sectionRef} id="how-it-works" className="relative bg-[#070d18] text-white border-t border-cyan-900/30">
      <div className="mx-auto max-w-[1600px] px-3 pt-24 sm:px-6">
        <div ref={headingRef} className="relative flex justify-center text-center">
          <StaggerHeading
            text="How It Works"
            inView={headingInView}
            className="font-display text-[clamp(3.5rem,14.5vw,14rem)] uppercase leading-[0.9] tracking-[-0.01em] text-white text-center"
            badgeText="AI Workflow"
          />
        </div>
      </div>
      <div className="relative h-[480vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x: smoothX }} className="flex h-full gap-20 px-6 will-change-transform sm:px-8 lg:px-12">
            {items.map((item) => (
              <article
                key={item.step}
                className="relative flex h-full w-[560px] shrink-0 flex-col justify-start py-10"
              >
                {/* Step number with tilted sticker badge across its middle */}
                <div className="relative inline-block w-fit">
                  <div className="font-display text-[clamp(8rem,13vw,13rem)] leading-none tracking-[-0.05rem] text-cyan-400/80">
                    {item.step}
                  </div>
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] whitespace-nowrap px-5 py-2 font-display text-[clamp(0.95rem,1.4vw,1.35rem)] uppercase leading-none text-[#08101e] shadow-[0_16px_40px_rgba(0,0,0,0.6)] font-bold z-10 ${item.accent}`}
                  >
                    {item.label}
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="h-px w-full bg-cyan-500/20" />
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="max-w-[470px] text-[1.04rem] leading-7 text-white/75">
                    {item.description}
                  </p>

                  <div className="relative h-[300px] w-[480px] overflow-hidden rounded-[2rem] bg-black/40 border border-cyan-500/30 shadow-[0_28px_80px_rgba(0,0,0,0.6)]">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="480px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d18]/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
