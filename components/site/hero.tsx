"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, PhoneCall, ShieldCheck, X } from "lucide-react";
import { useWhenVisible } from "@/hooks/useWhenVisible";

const navItems = ["How It Works", "Capabilities", "Roster Sync", "Contact"];
const menuItems = ["Home", "How It Works", "Security AI", "Roster Sync", "Capabilities", "Contact"];
const heroImage = "/hero-security.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const navLetterContainer = {
  rest: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.025 } },
};

const navLetterTop = {
  rest: { y: 0, opacity: 1 },
  hover: { y: "-110%", opacity: 0 },
};

const navLetterBottom = {
  rest: { y: "110%", opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

function StaggerNavWord({ label }: { label: string }) {
  const letters = Array.from(label);

  return (
    <span
      aria-label={label}
      className="relative inline-block overflow-hidden whitespace-nowrap leading-[1.25]"
    >
      <span aria-hidden className="invisible block">
        {label}
      </span>

      <motion.span
        aria-hidden
        variants={navLetterContainer}
        className="absolute inset-0 flex"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={`${label}-top-${i}`}
            variants={navLetterTop}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>

      <motion.span
        aria-hidden
        variants={navLetterContainer}
        className="absolute inset-0 flex"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={`${label}-bottom-${i}`}
            variants={navLetterBottom}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

const lineTransition = { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const };

/* Rest: three equal, parallel slashes "///" Hover: hamburger */
function MenuButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  const lineClass =
    "absolute left-1/2 top-1/2 -ml-3.5 -mt-px h-[2px] w-7 rounded-full bg-white";

  const SLASH = { rotate: -55, scaleX: 0.75 };

  return (
    <motion.button
      aria-label="Open menu"
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="block w-full border-b border-white pb-3"
      onClick={onClick}
    >
      <span className="relative mx-auto block h-10 w-10">
        <motion.span
          variants={{
            rest: { ...SLASH, x: -6.5, y: -4.6 },
            hover: { rotate: 0, scaleX: 1, x: 0, y: -8 },
          }}
          transition={lineTransition}
          className={lineClass}
        />
        <motion.span
          variants={{
            rest: { ...SLASH, x: 0, y: 0 },
            hover: { rotate: 0, scaleX: 1, x: 0, y: 0 },
          }}
          transition={lineTransition}
          className={lineClass}
        />
        <motion.span
          variants={{
            rest: { ...SLASH, x: 6.5, y: 4.6 },
            hover: { rotate: 0, scaleX: 1, x: 0, y: 8 },
          }}
          transition={lineTransition}
          className={lineClass}
        />
      </span>
    </motion.button>
  );
}

/* Small scattered-dots icon next to the stat */
function DotsIcon() {
  const dots = [
    [2, 0], [0, 2], [4, 2], [2, 4],
    [1, 1], [3, 3], [4, 0], [0, 4], [3, 1],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-12 shrink-0 fill-cyan-400"
    >
      {dots.map(([cx, cy], i) => (
        <rect
          key={i}
          x={cx * 5 + 1}
          y={cy * 5 + 1}
          width="2.4"
          height="2.4"
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const ready = useWhenVisible();
  const [showBackground, setShowBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const backgroundTimer = window.setTimeout(() => setShowBackground(true), 1750);
    const contentTimer = window.setTimeout(() => setShowContent(true), 3300);
    return () => {
      window.clearTimeout(backgroundTimer);
      window.clearTimeout(contentTimer);
    };
  }, [ready]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);
  
  const rowVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[130vh] flex-col overflow-hidden text-white"
    >
      <motion.div
        initial={{ scale: 0.16, borderRadius: "3rem" }}
        animate={
          showBackground
            ? { scale: 1, borderRadius: "0rem" }
            : { scale: 0.16, borderRadius: "3rem" }
        }
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 origin-center bg-cover bg-center"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_100%)]" />

      {/* HEADER */}
      <header
        id="main-nav"
        role="banner"
        className="relative z-20 grid grid-cols-[1fr_auto] items-end gap-x-4 px-5 pt-4 lg:grid-cols-[560fr_270fr_270fr_270fr_270fr_70fr] lg:gap-x-7"
      >
        <a
          href="#top"
          className="box-content flex h-10 items-center border-b border-white pb-3 font-display text-3xl uppercase leading-none"
        >
          {"// Samad Calli"}
        </a>

        {navItems.map((item, i) => (
          <motion.a
            key={item}
            href={item === "How It Works" ? "#how-it-works" : item === "Capabilities" ? "#capabilities" : "#top"}
            initial="hidden"
            animate={showContent ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 + i * 0.09 }}
            className="hidden md:block"
          >
            <motion.span
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="box-content flex h-10 items-center gap-3 border-b border-white pb-3 text-base uppercase"
            >
              <span className="size-3 shrink-0 rounded-full border border-white" />
              <StaggerNavWord label={item} />
            </motion.span>
          </motion.a>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
          className="w-[70px]"
        >
          <MenuButton onClick={() => setMenuOpen((prev) => !prev)} />
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#070d18] text-white"
          >
            {/* Giant faded title + rotated tag */}
            <div className="pointer-events-none relative h-[clamp(14rem,30vw,28rem)] shrink-0 overflow-hidden">
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap bg-gradient-to-b from-white/30 to-transparent bg-clip-text font-display text-[clamp(6rem,22vw,22rem)] uppercase leading-[0.9] tracking-normal text-transparent"
              >
                Samad Calli
              </div>
              <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] whitespace-nowrap bg-[#00d4ff] px-5 py-2 font-display text-[clamp(1.2rem,2.6vw,2.4rem)] uppercase leading-none text-[#08101e] shadow-[0_18px_40px_rgba(0,212,255,0.35)]">
                AI Calling Agent For Security
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-8 top-7 z-20 grid size-[70px] place-items-center rounded-xl border border-white/30 transition-colors hover:bg-cyan-500/10 hover:border-cyan-400"
            >
              <X className="size-8" strokeWidth={1.5} />
            </button>

            {/* Full-width menu rows */}
            <nav className="relative z-10 flex flex-1 flex-col justify-start -mt-32">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={item === "How It Works" ? "#how-it-works" : item === "Capabilities" ? "#capabilities" : "#top"}
                  onClick={() => setMenuOpen(false)}
                  onHoverStart={() => setActiveMenuIndex(index)}
                  onFocus={() => setActiveMenuIndex(index)}
                  className={`relative flex h-[clamp(3.5rem,7.2vw,4.9rem)] ms-center justify-center overflow-hidden border-b border-white/10 font-display text-[clamp(3rem,7.5vw,6.5rem)] uppercase leading-none tracking-normal transition-colors first:border-t-0 ${
                    activeMenuIndex === index ? "text-[#08101e]" : "text-white/40"
                  }`}
                >
                  {activeMenuIndex === index ? (
                    <motion.div
                      layoutId="menu-active-bg"
                      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                      className="absolute inset-0 bg-[#00d4ff]"
                    />
                  ) : null}
                  <span className="relative z-10">{item}</span>
                </motion.a>
              ))}
            </nav>

            {/* Footer row */}
            <div className="relative z-10 flex shrink-0 items-center justify-between px-[3vw] py-6 text-lg border-t border-white/10">
              <a href="mailto:contact@samadcalli.com" className="underline underline-offset-4 hover:text-[#00d4ff] transition-colors">
                contact@samadcalli.com
              </a>

              <div className="flex items-center gap-4">
                <span>Security Dispatch AI</span>
                <span className="h-px w-12 bg-cyan-400" />
                <a href="#top" aria-label="Security Status" className="hover:text-[#00d4ff] transition-colors"><ShieldCheck className="size-5" /></a>
                <a href="#top" aria-label="AI Phone Calling" className="hover:text-[#00d4ff] transition-colors"><PhoneCall className="size-5" /></a>
              </div>

              <a href="tel:+18000000000" className="underline underline-offset-4 hover:text-[#00d4ff] transition-colors">
                +1 (800) SAMAD-AI
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* BODY */}
      <div className="relative z-20 flex flex-1 flex-col px-5 pb-[8vh] pt-10 lg:pt-[6vw]">
        <motion.h1
          initial="hidden"
          animate={showContent ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
          }}
          className="w-full whitespace-nowrap text-center font-display text-[19vw] font-normal uppercase leading-[0.85] tracking-normal [-webkit-text-stroke:0.012em_white]"
        >
          {Array.from("Samad Calli").map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              variants={fadeUp}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* ROW 1: tagline (left) + paragraph (right) */}
        <motion.div
          initial="hidden"
          animate={showContent ? "show" : "hidden"}
          variants={rowVariants}
          className="mt-[14vh] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between xl:pl-[4vw] xl:pr-[4.5vw]"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-[clamp(3rem,5.6vw,6.2rem)] uppercase leading-[0.95]"
          >
            AI Calling Agent
            <br />
            For Security
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-[28rem] text-left text-base font-medium uppercase leading-snug text-white sm:text-lg"
          >
            Intelligent AI voice dispatchers that integrate into security provider platforms, handle calls with live roster sync, and automate 24/7 guard response.
          </motion.p>
        </motion.div>

        {/* ROW 2: follow us (left) + stat (right), sits on the second screen */}
        <motion.div
          initial="hidden"
          animate={showContent ? "show" : "hidden"}
          variants={rowVariants}
          className="mt-auto flex flex-col gap-10 pt-[24vh] sm:flex-row sm:items-end sm:justify-between xl:pl-[4vw] xl:pr-[4.5vw]"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <span className="text-lg">Follow us</span>
            <span className="h-px w-10 bg-cyan-400" />
            <div className="flex items-center gap-2">
              {[
                { label: "Instagram", icon: Instagram },
                { label: "Facebook", icon: Facebook },
              ].map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="grid place-items-center text-white transition-transform duration-300 hover:scale-110 hover:text-[#00d4ff]"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-5"
          >
            <DotsIcon />
            <div>
              <p className="font-display text-[clamp(2.4rem,3.6vw,4rem)] uppercase leading-none text-[#00d4ff]">
                24/7 AI
              </p>
              <p className="mt-2 text-sm uppercase text-white/90">Roster &amp; Dispatch Calling</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
