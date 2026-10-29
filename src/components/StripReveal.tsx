import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STRIP_COUNT = 10;
const BOOT_DURATION = 2200;
const STRIP_DURATION = 1.1;
const STRIP_STAGGER = 0.05;
const CHARS = "ABCDEFGH!@#$%^&*()0123456789";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!active) {
      setOutput(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((character, index) =>
            index < iteration
              ? character
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setOutput(text);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);

  return <>{output}</>;
}

export default function StripReveal({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"boot" | "reveal" | "done">("boot");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("reveal"), BOOT_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "reveal") return;
    const duration = (STRIP_DURATION + STRIP_COUNT * STRIP_STAGGER) * 1000;
    const timer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none">
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0B0C]"
        animate={phase === "reveal" ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="text-[#F3EFE6] font-mono text-xs sm:text-sm tracking-[0.4em] uppercase flex flex-col items-center gap-8">
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
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
          </div>
          <span className="text-[#10B981] font-bold">
            <ScrambleText text="SYS.UPLINK.ESTABLISHED" active={phase === "boot"} />
          </span>
          <span className="text-[#F3EFE6]/40">
            <ScrambleText text="DECRYPTING_PERSONAL_ARCHIVE" active={phase === "boot"} />
          </span>
        </div>
      </motion.div>

      {Array.from({ length: STRIP_COUNT }, (_, index) => (
        <motion.div
          key={index}
          initial={{ scaleY: 1 }}
          animate={phase === "reveal" ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{
            duration: STRIP_DURATION,
            delay: index * STRIP_STAGGER,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="h-full flex-1 origin-top bg-[#0B0B0C] border-r border-[#D6B97A]/10"
        />
      ))}
    </div>
  );
}
