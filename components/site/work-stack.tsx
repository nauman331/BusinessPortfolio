"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { StaggerHeading } from "@/components/site/stagger-heading";

type WorkItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
  left: string; // lighter left half
  right: string; // darker right half
};

const works: WorkItem[] = [
  {
    title: "Automated Roster Sync & Shift Dispatch",
    description:
      "Bi-directional API sync with your security scheduling platform. The AI calls off-duty and standby guards to confirm shifts, fill open roster gaps, and instantly updates your live dashboard.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/6958ad981856872ea999e6bc_card%20image%202.avif",
    alt: "Automated Roster Sync & Shift Dispatch",
    left: "#0e7490",
    right: "#083344",
  },
  {
    title: "24/7 Rapid Incident Callout Dispatch",
    description:
      "Instant voice dispatch triggered by alarm alerts or panic codes. The AI dials the nearest active patrol units with exact location data, incident classification, and entry protocols.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/695a09e703602d5c373cac12_project%20card%20image.avif",
    alt: "24/7 Rapid Incident Callout Dispatch",
    left: "#0f766e",
    right: "#134e4a",
  },
  {
    title: "Guard Check-In & Safety Verification",
    description:
      "Autonomous hourly voice check-ins for lone guards and overnight patrols. The AI verifies guard responsiveness, logs status check-ins, and immediately escalates missed affirmations.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/695a0a2496547747739b4e11_project%20card%20image%202.avif",
    alt: "Guard Check-In & Safety Verification",
    left: "#1d4ed8",
    right: "#1e1b4b",
  },
  {
    title: "Client Incident & Status Voice Briefings",
    description:
      "Automated outbound briefings to property owners and facilities managers during security alerts, delivering calm, professional status updates and resolution reports.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/695a08f632223729da7efafb_card%20image%202.avif",
    alt: "Client Incident & Status Voice Briefings",
    left: "#0284c7",
    right: "#0c4a6e",
  },
];

const N = works.length;
const STRIP_PX = 26; // how much each waiting strip peeks out below
const STRIP_SCALE = 0.05; // how much narrower each waiting strip is

function Card({
  work,
  i,
  progress,
}: {
  work: WorkItem;
  i: number;
  progress: MotionValue<number>;
}) {
  const cardStart = i / N;
  const cardEnd = (i + 1) / N;

  const y = useTransform(progress, (p) => {
    if (p < cardStart) {
      const diff = i - p * N;
      return diff * STRIP_PX;
    }
    if (p <= cardEnd) {
      return 0;
    }
    return 0;
  });

  const scale = useTransform(progress, (p) => {
    if (p < cardStart) {
      const diff = i - p * N;
      return 1 - diff * STRIP_SCALE;
    }
    if (p <= cardEnd) {
      return 1;
    }
    const past = (p - cardEnd) * N;
    return Math.max(0.85, 1 - past * 0.05);
  });

  const opacity = useTransform(progress, (p) => {
    if (p > cardEnd + 0.15 / N) {
      return 0;
    }
    return 1;
  });

  const pointerEvents = useTransform(progress, (p) => {
    return p >= cardStart && p <= cardEnd ? "auto" : "none";
  });

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        pointerEvents,
        zIndex: N - i,
      }}
      className="absolute inset-0 origin-bottom will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-[2rem] border border-cyan-500/20 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="grid h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          {/* left half */}
          <div
            style={{ backgroundColor: work.left }}
            className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:gap-8 lg:p-16 text-white"
          >
            <h3 className="font-display text-[clamp(2.2rem,5.2vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.01em] text-white">
              {work.title}
            </h3>
            <p className="max-w-xl text-sm leading-6 text-white/85 sm:text-base lg:text-lg lg:leading-8">
              {work.description}
            </p>
            <button className="inline-flex w-fit items-center gap-4 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-[#08101e] hover:-translate-y-0.5">
              Explore Capability
            </button>
          </div>

          {/* right half */}
          <div
            style={{ backgroundColor: work.right }}
            className="relative min-h-0 flex items-center justify-center"
          >
            <Image
              src={work.image}
              alt={work.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4 lg:p-10"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export function WorkStack() {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-[#070d18] text-white border-t border-cyan-900/30">
      {/* Heading */}
      <div className="mx-auto max-w-[1600px] px-3 pb-6 pt-24 sm:px-6">
        <div ref={headingRef} className="relative">
          <StaggerHeading
            text="Core Capabilities"
            inView={headingInView}
            badgeText="Security AI"
            className="font-display text-[clamp(3.5rem,14.5vw,14rem)] uppercase leading-[0.9] tracking-[-0.01em] text-white text-center"
          />
        </div>
      </div>

      {/* Scroll stack */}
      <div
        ref={container}
        className="relative"
        style={{ height: `${N * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto w-full max-w-[1600px] px-3 pb-20 sm:px-6">
            <div className="relative h-[72vh] max-h-[760px] min-h-[520px]">
              {works.map((work, i) => (
                <Card
                  key={work.title}
                  work={work}
                  i={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </section>
  );
}
