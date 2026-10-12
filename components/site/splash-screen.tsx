"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useWhenVisible } from "@/hooks/useWhenVisible";

const brand = "Nauman Studio";
const EASE = [0.76, 0, 0.24, 1] as const;
const SPLASH_MS = 1650;

function resetScroll() {
  window.scrollTo(0, 0);
}

export function SplashScreen() {
  const ready = useWhenVisible();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  // Always start at the top, never restore an old scroll position
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    resetScroll();
  }, []);

  // Timers + counter only start once the tab is visible
  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setVisible(false), SPLASH_MS);
    const counter = animate(0, 100, {
      duration: (SPLASH_MS - 250) / 1000,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => {
      window.clearTimeout(timer);
      counter.stop();
    };
  }, [ready]);

  // Lock scroll on both html and body while the splash is up
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = visible ? "hidden" : "";
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence onExitComplete={resetScroll}>
      {visible ? (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-50 flex h-screen w-screen flex-col justify-between overflow-hidden bg-[#121212] px-5 py-4 text-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-between border-b border-white/30 pb-3"
          >
            <span className="font-display text-2xl uppercase leading-none">
              {"// Nauman"}
            </span>
            <span className="text-xs uppercase tracking-[0.35em] text-white/60">
              Loading experience
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
            }}
            aria-label={brand}
            className="flex w-full justify-center whitespace-nowrap font-display text-[15vw] font-normal uppercase leading-[0.9] tracking-normal"
          >
            {Array.from(brand).map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden
                className="inline-block overflow-hidden pb-[0.04em]"
              >
                <motion.span
                  variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-white/60">
                Design-first digital agency
              </span>
              <span className="font-display text-5xl leading-none tabular-nums sm:text-7xl">
                {count}
              </span>
            </div>
            <div className="h-px w-full bg-white/20">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: ready ? 1 : 0 }}
                transition={{
                  duration: (SPLASH_MS - 250) / 1000,
                  ease: [0.45, 0, 0.2, 1],
                }}
                className="h-full origin-left bg-white"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}