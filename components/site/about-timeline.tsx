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
    label: "UK Office",
    description:
      "We officially opened UK office, laying foundation for our international operations and enabling us to work closely with global clients while delivering high-quality digital solutions.",
    image: "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/68f3377a504a85f461daf821_year%20image.webp",
    imageAlt: "",
    accent: "bg-[#ff8b61]",
  },
  {
    year: "2023",
    label: "New Team",
    description:
      "We focused on forming a strong and reliable team of designers, developers, and digital specialists. This dedicated team allowed us to improve, increase delivery speed.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910d8257abcbca6e7ac961d_about%20year%20card%20image%202.webp",
    imageAlt:
      "Purple booklet with metallic logo and text reading 'Kearney Group' and 'From transactional to transformational' on a ribbed purple and white surface.",
    accent: "bg-[#c68cff]",
  },
  {
    year: "2024",
    label: "Global Clients",
    description:
      "We expanded our reach and began working with clients across multiple countries. We delivered diverse, high-quality digital solutions worldwide.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910d8f867741df0a5304d6c_about%20year%20card%20image%203.webp",
    imageAlt:
      "Abstract 3D design featuring intertwined orange and red ribbon-like shapes on a white textured background.",
    accent: "bg-[#ff8b61]",
  },
  {
    year: "2025",
    label: "Online Growth",
    description:
      "We experienced strong online growth by expanding our digital presence through strategic branding and performance-driven channels.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910da33a448d569577ecc79_about%20year%20card%20image%204.webp",
    imageAlt: "about year card image",
    accent: "bg-[#ff8b61]",
  },
  {
    year: "2026",
    label: "Creative Hub",
    description:
      "We evolved into a full-scale creative hub, bringing together design, development, strategic thinking to deliver innovative, collaborative, and future-ready digital solutions.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910db16f2fca6862b2d3ddb_about%20year%20card%20image%205.webp",
    imageAlt: "about year card image",
    accent: "bg-[#6cc7ff]",
  },
  {
    year: "2027",
    label: "New Vision",
    description:
      "We defined clear new vision focused on innovation, creativity, and long-term impact—guiding how we design, build, and scale meaningful the best digital experiences for users.",
    image:
      "https://cdn.prod.website-files.com/68efdb35db90f2ad02b2fe4b/6910db82ffe127c4e7abd372_about%20year%20card%20image%206.webp",
    imageAlt: "about year card image",
    accent: "bg-[#8cf07a]",
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
    <section ref={sectionRef} className="relative bg-white text-black">
      <div className="mx-auto max-w-[1600px] px-3 pt-24 sm:px-6">
        <div ref={headingRef} className="relative">
          <StaggerHeading
            text="Our Journey"
            inView={headingInView}
            className="font-display text-[clamp(3.5rem,14.5vw,14rem)] uppercase leading-[0.9] tracking-[-0.01em] text-[#141414] text-center"
            badgeText="Timeline"
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
                  <div className="font-display text-[clamp(8rem,13vw,13rem)] leading-none tracking-[-0.05rem] text-black">
                    {item.year}
                  </div>
                  <div
                    className={`absolute left-1/2 top-[20%] -translate-x-1/2 -rotate-[12deg] px-4 py-2 font-display text-[clamp(0.95rem,1.4vw,1.35rem)] uppercase leading-none text-black shadow-[0_18px_40px_rgba(0,0,0,0.16)] ${item.accent}`}
                  >
                    {item.label}
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="h-px w-full bg-black/20" />
                  <p className="max-w-[470px] text-[1.04rem] leading-8 text-black/75">
                    {item.description}
                  </p>

                  <div className="relative h-[300px] w-[480px] overflow-hidden rounded-[2rem] bg-black/5 shadow-[0_28px_80px_rgba(0,0,0,0.12)]">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="480px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/5" />
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