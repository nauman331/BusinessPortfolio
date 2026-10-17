"use client";

import { motion } from "framer-motion";

export function StaggerHeading({
  text,
  inView,
  className = "font-display text-[clamp(3.5rem,14.5vw,14rem)] uppercase leading-[0.9] tracking-[-0.01em] text-[#08101e]",
  badgeText,
  badgeClassName = "bg-[#00d4ff] px-[0.7em] py-[0.35em] font-display text-[clamp(0.9rem,2.6vw,2.4rem)] uppercase leading-none text-[#08101e] rotate-[-10deg] shadow-[0_12px_32px_rgba(0,212,255,0.35)]",
}: {
  text: string;
  inView: boolean;
  className?: string;
  badgeText?: string;
  badgeClassName?: string;
}) {
  const words = text.split(" ");
  let letterIndex = 0;
  const badgeWordIndex = badgeText ? Math.min(1, words.length - 1) : -1;

  return (
    <h2 aria-label={text} className={className}>
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className={`mr-[0.22em] inline-block overflow-hidden py-[0.06em] align-top last:mr-0 ${
            wi === badgeWordIndex ? "relative" : ""
          }`}
        >
          {word.split("").map((ch, ci) => {
            const delay = letterIndex++ * 0.045;
            return (
              <motion.span
                key={ci}
                initial={{ y: "115%", rotate: 8 }}
                animate={inView ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 8 }}
                transition={{
                  duration: 0.8,
                  delay: inView ? delay : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block origin-bottom-left"
              >
                {ch}
              </motion.span>
            );
          })}
          {wi === badgeWordIndex && badgeText ? (
            <motion.span
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={inView ? { scale: 1, rotate: -10, opacity: 1 } : { scale: 0, rotate: 0, opacity: 0 }}
              transition={{
                delay: inView ? 0.9 : 0,
                type: "spring",
                stiffness: 260,
                damping: 16,
              }}
              className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${badgeClassName}`}
            >
              {badgeText}
            </motion.span>
          ) : null}
        </span>
      ))}
    </h2>
  );
}
