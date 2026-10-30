import { useEffect } from "react";
import { motion } from "framer-motion";

interface DesktopIntroProps {
  onFinish: () => void;
}

export default function DesktopIntro({ onFinish }: DesktopIntroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 2600);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      role="status"
      aria-label="Introducing Aadi Gorasia's portfolio"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] hidden flex-col justify-between overflow-hidden bg-[#0B0B0C] px-8 py-8 text-[#F3EFE6] md:flex md:px-16 md:py-12"
    >
      <div className="flex items-start justify-between border-b border-[#F3EFE6]/15 pb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F3EFE6]/55">
        <span>Aadi Gorasia</span>
        <button
          type="button"
          onClick={onFinish}
          className="text-[#F3EFE6] transition-colors hover:text-[#D6B97A]"
        >
          Enter portfolio <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="relative">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute -top-8 left-0 h-px w-32 origin-left bg-[#D6B97A]"
          aria-hidden="true"
        />
        <motion.h1
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden font-display text-[clamp(5rem,15vw,15rem)] font-medium leading-[0.78] tracking-[-0.09em]"
        >
          Aadi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 pl-[12vw] font-serif text-[clamp(3.5rem,10vw,10rem)] italic leading-[0.9] tracking-[-0.06em] text-[#D6B97A]"
        >
          Gorasia
        </motion.p>
      </div>

      <div className="flex items-end justify-between border-t border-[#F3EFE6]/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F3EFE6]/45">
        <span>Portfolio · Pune, India</span>
        <span>Scroll to explore</span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.2, ease: "linear" }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#D6B97A]"
        aria-hidden="true"
      />
    </motion.div>
  );
}
