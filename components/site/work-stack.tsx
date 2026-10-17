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
    image: "/images/capabilities/roster-sync.jpg",
    alt: "Automated Roster Sync & Shift Dispatch",
    left: "#081729",
    right: "#050e1a",
  },
  {
    title: "24/7 Rapid Incident Callout Dispatch",
    description:
      "Instant voice dispatch triggered by alarm alerts or panic codes. The AI dials the nearest active patrol units with exact location data, incident classification, and entry protocols.",
    image: "/images/capabilities/incident-dispatch.jpg",
    alt: "24/7 Rapid Incident Callout Dispatch",
    left: "#061a26",
    right: "#041018",
  },
  {
    title: "Guard Check-In & Safety Verification",
    description:
      "Autonomous hourly voice check-ins for lone guards and overnight patrols. The AI verifies guard responsiveness, logs status check-ins, and immediately escalates missed affirmations.",
    image: "/images/capabilities/guard-verification.jpg",
    alt: "Guard Check-In & Safety Verification",
    left: "#0a1630",
    right: "#060e20",
  },
  {
    title: "Client Incident & Status Voice Briefings",
    description:
      "Automated outbound briefings to property owners and facilities managers during security alerts, delivering calm, professional status updates and resolution reports.",
    image: "/images/capabilities/client-briefings.jpg",
    alt: "Client Incident & Status Voice Briefings",
    left: "#0c1b2f",
    right: "#07111f",
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
  // k = distance from the front card. 0 = front, >0 = waiting below, <0 = leaving upward
  const k = useTransform(progress, (v) => i - v * (N - 1));

  const scale = useTransform(k, (kk) =>
    kk >= 0 ? 1 - STRIP_SCALE * Math.min(kk, 3) : 1
  );
  const y = useTransform(k, (kk) =>
    kk >= 0 ? `${Math.min(kk, 3) * STRIP_PX}px` : `${Math.max(kk, -1.2) * 115}%`
  );
  const opacity = useTransform(k, (kk) =>
    kk >= 0 ? 1 : Math.max(0, 1 + kk * 1.15)
  );
  const pointerEvents = useTransform(k, (kk) =>
    Math.abs(kk) < 0.5 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        pointerEvents,
        zIndex: N - i, // earlier cards sit on top of later ones
      }}
      className="absolute inset-0 origin-bottom will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-[2rem] border border-cyan-500/25 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
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
            <button className="inline-flex w-fit items-center gap-4 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-300 transition-all hover:bg-[#00d4ff] hover:text-[#08101e] hover:border-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:-translate-y-0.5">
              Explore Capability
            </button>
          </div>

          {/* right half */}
          <div
            style={{ backgroundColor: work.right }}
            className="relative min-h-0 p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <Image
                src={work.image}
                alt={work.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
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
    <section id="capabilities" className="bg-[#070d18] text-white border-t border-cyan-900/30">
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
