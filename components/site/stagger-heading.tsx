"use client";

import { motion } from "framer-motion";

export function StaggerHeading({
  text,
  inView,
  className = "font-display text-[clamp(3.5rem,14.5vw,14rem)] uppercase leading-[0.9] tracking-[-0.01em] text-white text-center",
  badgeText,
  badgeClassName = "bg-[#00d4ff] px-6 py-2.5 font-display text-[clamp(1.1rem,2.5vw,2.4rem)] uppercase leading-none text-[#08101e] shadow-[0_18px_40px_rgba(0,0,0,0.5)] font-bold -rotate-[10deg]",
}: {
  text: string;
  inView: boolean;
  className?: string;
  badgeText?: string;
  badgeClassName?: string;
}) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <div className="relative inline-block">
      <h2 aria-label={text} className={className}>
        {words.map((word, wi) => (
          <span
            key={wi}
            aria-hidden
            className="mr-[0.22em] inline-block overflow-hidden py-[0.06em] align-top last:mr-0"
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
          </span>
        ))}
      </h2>

      {badgeText ? (
        <motion.div
          initial={{ scale: 0, rotate: -10, opacity: 0 }}
          animate={inView ? { scale: 1, rotate: -10, opacity: 1 } : { scale: 0, rotate: -10, opacity: 0 }}
          transition={{
            delay: inView ? 0.45 : 0,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <div className={`whitespace-nowrap ${badgeClassName}`}>
            {badgeText}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
