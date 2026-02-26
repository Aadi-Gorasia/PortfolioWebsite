import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const STRIP_COUNT = 10;
const BOOT_DURATION = 2200;      // boot screen time
const STRIP_DURATION = 1.1;      // each strip animation time
const STRIP_STAGGER = 0.05;      // delay between strips
const CHARS = "ABCDEFGH!@#$%^&*()0123456789";

/* ---------------- SCRAMBLE TEXT ---------------- */

function ScrambleText({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const [output, setOutput] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      setOutput(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((_, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setOutput(text);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, text]);

  return <>{output}</>;
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function StripReveal({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"boot" | "reveal" | "done">("boot");

  /* Boot -> Reveal */
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("reveal");
    }, BOOT_DURATION);

    return () => clearTimeout(t);
  }, []);

  /* Reveal -> Done (deterministic timing) */
  useEffect(() => {
    if (phase === "reveal") {
      const totalTime =
        STRIP_DURATION * 1000 + STRIP_COUNT * STRIP_STAGGER * 1000;

      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, totalTime);

      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none">

      {/* ---------------- BOOT OVERLAY ---------------- */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0B0C]"
        animate={
          phase === "reveal"
            ? { opacity: 0, scale: 1.05 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="text-[#F3EFE6] font-mono text-xs sm:text-sm tracking-[0.4em] uppercase flex flex-col items-center gap-8">

          {/* rotating rings */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute w-32 h-32 border border-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-24 h-24 border-t border-b border-[#10B981]/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_15px_#10B981]" />
          </div>

          {/* scrambled lines */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#10B981] font-bold">
              <ScrambleText
                text="SYS.UPLINK.ESTABLISHED"
                active={phase === "boot"}
              />
            </span>

            <span className="opacity-50 text-[10px]">
              <ScrambleText
                text="DECRYPTING NEURAL PATHWAYS..."
                active={phase === "boot"}
              />
            </span>
          </div>
        </div>
      </motion.div>

      {/* ---------------- STRIPS ---------------- */}
      {Array.from({ length: STRIP_COUNT }).map((_, index) => {
        const delay = index * STRIP_STAGGER;

        return (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            transition={{
              delay,
              duration: STRIP_DURATION,
              ease: [0.86, 0, 0.07, 1],
            }}
            className="flex-1 bg-[#111111] border-r border-white/[0.03] last:border-r-0"
          />
        );
      })}
    </div>
  );
}