import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = ["Watching a plateau dissolve into even plains."];

export default function IntroHero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toISOString().replace("T", " ").replace("Z", ""));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0B0C] flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.14, 0.24, 0.14] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#D6B97A] blur-[100px] mix-blend-screen"
        />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1E67C6]/10 blur-[100px] mix-blend-screen" />
      </div>

      <div className="absolute right-8 md:right-24 top-0 bottom-0 w-px bg-[#F3EFE6]/10 hidden md:block">
        <motion.div
          animate={{ y: ["-100%", "350%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-[30vh] bg-gradient-to-b from-transparent via-[#D6B97A] to-transparent opacity-50"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-end text-right">
        <div className="flex flex-col items-end mb-8 gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse" />
            <span className="text-[#D6B97A] tracking-[0.4em] text-xs font-mono uppercase">
              Aadi Gorasia
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-mono text-[10px] text-[#F3EFE6] tracking-widest"
          >
            {time} :: LOG_START
          </motion.p>
        </div>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-[#F3EFE6]">
          {LINES.map((line, index) => (
            <div key={line} className="overflow-hidden relative">
              <motion.div
                initial={{ y: "100%", rotate: 2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <span className="block relative z-10">{line}</span>
                <span className="absolute inset-0 text-[#D6B97A] opacity-10 select-none pointer-events-none">
                  {line}
                </span>
              </motion.div>
            </div>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="mt-12 max-w-md text-[#BEB6A8] text-lg font-light leading-relaxed italic border-r-2 border-[#D6B97A]/50 pr-6"
        >
          Complexity is just a signal waiting to be decoded.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4"
      >
        <span className="text-[10px] font-mono text-[#F3EFE6]/30 uppercase tracking-widest">
          Scroll to Initialize
        </span>
        <div className="h-px w-24 bg-[#F3EFE6]/20 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-[#D6B97A]"
          />
        </div>
      </motion.div>
    </section>
  );
}
