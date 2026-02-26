"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const LINES = [
  "Watching a plateau dissolve into even plains."
];

export default function Hero() {
  const [time, setTime] = useState<string>("");

  // A relentless clock to show precision/engineering mindset
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").replace("Z", ""));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full bg-[#0B0B0C] overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-24">
      
      {/* --- LAYER 1: The Living Void (Background) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Slow moving 'Nebula' */}
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#D6B97A] blur-[150px] opacity-20 mix-blend-screen"
        />
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1E67C6] blur-[150px] opacity-10 mix-blend-screen"
        />
        
        {/* Grain Texture (The Film Look) */}
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
      </div>

      {/* --- LAYER 2: The Vertical Line (The Anchor) --- */}
      {/* This creates a sense of structure in the void */}
      <div className="absolute right-8 md:right-24 top-0 bottom-0 w-[1px] bg-[#F3EFE6]/10 hidden md:block">
        <motion.div 
            style={{ scaleY: useSpring(useTransform(scrollY, [0, 1000], [0, 1])) }}
            className="origin-top w-full h-[30vh] bg-gradient-to-b from-transparent via-[#D6B97A] to-transparent opacity-50"
        />
      </div>


      {/* --- LAYER 3: The Content --- */}
      <motion.div 
        style={{ y: y1, opacity }} 
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-end text-right"
      >
        
        {/* The Engineer's Signature */}
        <div className="flex flex-col items-end mb-8 gap-2">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-3"
            >
                <span className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse shadow-[0_0_10px_#D6B97A]"></span>
                <span className="text-[#D6B97A] tracking-[0.4em] text-xs font-mono uppercase">
                    Aadi Gorasia
                </span>
            </motion.div>
            
            {/* The Timestamp */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1 }}
                className="font-mono text-[10px] text-[#F3EFE6] tracking-widest"
            >
                {time} :: LOG_START
            </motion.p>
        </div>

        {/* The Quote (Massive, blurry to sharp) */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-[#F3EFE6] mix-blend-lighten">
          {LINES.map((line, lineIndex) => (
            <div key={lineIndex} className="overflow-hidden relative">
              <motion.div
                initial={{ y: "100%", rotate: 2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{
                  duration: 1.2,
                  delay: lineIndex * 0.15,
                  ease: [0.16, 1, 0.3, 1], // The "Apple" ease
                }}
                className="relative"
              >
                {/* The text itself */}
                <span className="block relative z-10">
                    {line}
                </span>

                {/* The 'Ghost' text behind it for the glow effect */}
                <span className="absolute inset-0 text-[#D6B97A] blur-[40px] opacity-30 select-none pointer-events-none z-0">
                    {line}
                </span>
              </motion.div>
            </div>
          ))}
        </h1>

        {/* The Subtext / Philosophy */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="mt-12 max-w-md text-[#BEB6A8] text-lg font-light leading-relaxed italic border-r-2 border-[#D6B97A]/50 pr-6"
        >
            Complexity is just a signal waiting to be decoded.
        </motion.p>

      </motion.div>

      {/* --- LAYER 4: Scroll Indicator --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4"
      >
        <span className="text-[10px] font-mono text-[#F3EFE6]/30 uppercase tracking-widest">Scroll to Initialize</span>
        <div className="h-[1px] w-24 bg-[#F3EFE6]/20 overflow-hidden">
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