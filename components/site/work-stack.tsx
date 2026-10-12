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
  right: string; // darker right half (match the image background)
};

const works: WorkItem[] = [
  {
    title: "Drink Different Web Design WITH WP",
    description:
      "Drink Different Web Design with WP delivers bold, refreshing WordPress sites featuring custom layouts, vibrant visuals, smooth interactions, and a playful brand style experience.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/6958ad981856872ea999e6bc_card%20image%202.avif",
    alt: "Drink Different Web Design with WP",
    left: "#a899ff",
    right: "#8573ee",
  },
  {
    title: "Push Past Pack Design in New Style",
    description:
      "Push Past Pack Design in New Style delivers bold, modern packaging concepts that redefine visuals, elevate branding, and introduce fresh creative energy.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/695a09e703602d5c373cac12_project%20card%20image.avif",
    alt: "Push Past Pack Design in New Style",
    left: "#ff9460",
    right: "#ff7a3d",
  },
  {
    title: "Packaging Design with On-Demand Experts",
    description:
      "Packaging Design with On-Demand Experts delivers tailored, high-quality packaging solutions created by skilled specialists who craft standout visuals, smart layouts.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/695a0a2496547747739b4e11_project%20card%20image%202.avif",
    alt: "Packaging Design with On-Demand Experts",
    left: "#ff7479",
    right: "#ff5a60",
  },
  {
    title: "Plenova Web Design & Development",
    description:
      "Plenova Web Design & Development builds modern, high-performing websites with clean UX, custom features, responsive layouts, and seamless functionality crafted to elevate brands.",
    image:
      "https://cdn.prod.website-files.com/692f25b223f2b302c5738113/695a08f632223729da7efafb_card%20image%202.avif",
    alt: "Plenova Web Design & Development",
    left: "#b5c868",
    right: "#9fae4a",
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
      <div className="h-full w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
        <div className="grid h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          {/* left half */}
          <div
            style={{ backgroundColor: work.left }}
            className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:gap-8 lg:p-16"
          >
            <h3 className="font-display text-[clamp(2.2rem,5.2vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.01em] text-[#141212]">
              {work.title}
            </h3>
            <p className="max-w-xl text-sm leading-6 text-black/80 sm:text-base lg:text-lg lg:leading-8">
              {work.description}
            </p>
            <button className="inline-flex w-fit items-center gap-4 rounded-full border border-black px-6 py-3 text-sm transition-transform hover:-translate-y-0.5">
              Learn More
            </button>
          </div>

          {/* right half: image sits directly on it, no extra box */}
          <div
            style={{ backgroundColor: work.right }}
            className="relative min-h-0"
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

  // replays every time the heading re-enters the viewport
  const headingInView = useInView(headingRef, { amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-white text-black">
      {/* Heading */}
      <div className="mx-auto max-w-[1600px] px-3 pb-6 pt-24 sm:px-6">
        <div ref={headingRef} className="relative">
          <StaggerHeading text="Featured Works" inView={headingInView} badgeText="Digital Screens" />
        </div>
      </div>

      {/* Scroll stack: each card gets 100vh of scroll */}
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