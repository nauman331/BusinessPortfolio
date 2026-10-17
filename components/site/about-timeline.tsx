"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { StaggerHeading } from "@/components/site/stagger-heading";

type YearItem = {
  year: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
};

const items: YearItem[] = [
  {
    year: "2022",
    label: "Core Voice AI",
    description:
      "Engineered ultra-low-latency voice synthesis and natural security-domain dialog models capable of real-time conversational dispatch under high pressure.",
    image: "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/68f3377a504a85f461daf821_year%20image.webp",
    imageAlt: "Voice AI Architecture",
    accent: "bg-[#00d4ff]",
  },
  {
    year: "2023",
    label: "Roster Engine",
    description:
      "Developed bi-directional live sync with leading guard scheduling software, enabling automated roster validation and autonomous vacancy-filling callouts.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910d8257abcbca6e7ac961d_about%20year%20card%20image%202.webp",
    imageAlt: "Roster Engine Architecture",
    accent: "bg-[#38bdf8]",
  },
  {
    year: "2024",
    label: "Guard Callouts",
    description:
      "Rolled out autonomous outbound phone dispatch for shift confirmations, guard wellness check-ins, and emergency patrol escalation calling across 100+ sites.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910d8f867741df0a5304d6c_about%20year%20card%20image%203.webp",
    imageAlt: "Guard Dispatch Network",
    accent: "bg-[#2dd4bf]",
  },
  {
    year: "2025",
    label: "National Scale",
    description:
      "Expanded across leading security firms nationwide, handling over 250,000 automated security calls monthly with 99.98% roster shift coverage.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910da33a448d569577ecc79_about%20year%20card%20image%204.webp",
    imageAlt: "National Security Network",
    accent: "bg-[#00e5ff]",
  },
  {
    year: "2026",
    label: "Incident AI",
    description:
      "Integrated autonomous multi-party incident handling: simultaneous dispatch to on-duty guards, supervisor alerts, and automated client status voice calls.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910db16f2fca6862b2d3ddb_about%20year%20card%20image%205.webp",
    imageAlt: "Autonomous Incident AI",
    accent: "bg-[#818cf8]",
  },
  {
    year: "2027",
    label: "Next-Gen Vision",
    description:
      "Pioneering predictive roster optimization, biometric voice verification, and autonomous perimeter response for the future of digital security operations.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910db82ffe127c4e7abd372_about%20year%20card%20image%206.webp",
    imageAlt: "Next-Gen Security Vision",
    accent: "bg-[#67e8f9]",
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

  const distance = useMemo(() => {
    if (!viewportWidth) return 0;
    const cardWidth = 560;
    const gap = 80;
    return Math.max(items.length * cardWidth + (items.length - 1) * gap - viewportWidth, 0);
  }, [viewportWidth]);

  const startOffset = useMemo(() => {
    if (!viewportWidth) return 0;
    const cardWidth = 560;
    return Math.max((viewportWidth - cardWidth) / 2, 0);
  }, [viewportWidth]);

  const travelDistance = distance * 1.08;

  const x = useTransform(scrollYProgress, [0, 1], [startOffset, -(travelDistance - startOffset)], {
    clamp: true,
  });
  const smoothX = useSpring(x, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section ref={sectionRef} className="relative bg-[#070d18] text-white border-t border-cyan-900/30">
      <div className="mx-auto max-w-[1600px] px-3 pt-24 sm:px-6">
        <div ref={headingRef} className="relative">
          <StaggerHeading
            text="Our Journey"
            inView={headingInView}
            className="font-display text-[clamp(3.5rem,14.5vw,14rem)] uppercase leading-[0.9] tracking-[-0.01em] text-white text-center"
            badgeText="Security AI"
          />
        </div>
      </div>
      <div className="relative h-[520vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x: smoothX }} className="flex h-full gap-20 px-6 will-change-transform sm:px-8 lg:px-12">
            {items.map((item) => (
              <article
                key={item.year}
                className="relative flex h-full w-[560px] shrink-0 flex-col justify-start py-10"
              >
                <div className="relative">
                  <div className="font-display text-[clamp(8rem,13vw,13rem)] leading-none tracking-[-0.05rem] text-white/90">
                    {item.year}
                  </div>
                  <div
                    className={`absolute left-1/2 top-[20%] -translate-x-1/2 -rotate-[12deg] px-4 py-2 font-display text-[clamp(0.95rem,1.4vw,1.35rem)] uppercase leading-none text-[#08101e] shadow-[0_18px_40px_rgba(0,0,0,0.4)] font-bold ${item.accent}`}
                  >
                    {item.label}
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="h-px w-full bg-white/15" />
                  <p className="max-w-[470px] text-[1.04rem] leading-8 text-white/70">
                    {item.description}
                  </p>

                  <div className="relative h-[300px] w-[480px] overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="480px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
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
