"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function MainHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking for the spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      animate(mouseX, e.clientX, {
        type: "spring",
        damping: 50,
        stiffness: 400,
        mass: 0.5, // Lightweight feel
      });
      animate(mouseY, e.clientY, {
        type: "spring",
        damping: 50,
        stiffness: 400,
        mass: 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic gradient background that follows mouse
  const background = useMotionTemplate`radial-gradient(
    650px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.04),
    transparent 80%
  )`;

  return (
    <section id="home" className="relative w-full min-h-screen bg-[#0B0B0C] overflow-hidden selection:bg-[#F3EFE6] selection:text-[#0B0B0C]">
      {/* 1. Technical Grid Layer (Revealed by Spotlight) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* 2. Spotlight Overlay */}
      <motion.div
        className="absolute inset-0 z-10 opacity-100 pointer-events-none"
        style={{ background }}
      />

      {/* 3. Cinematic Grain Overlay (Adds texture/reality) */}
      <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        
        {/* Decorative Label */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
        >
            <span className="h-[1px] w-12 bg-[#F3EFE6]/30"></span>
            <span className="text-[#F3EFE6]/50 text-xs uppercase tracking-[0.2em] font-medium">
                System Status: Nominal
            </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
            <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // "Quiet" ease curve
            className="text-6xl md:text-8xl lg:text-9xl font-semibold text-[#F3EFE6] leading-[0.95] tracking-tight"
            >
            Engineering
            </motion.h1>
        </div>
        
        <div className="overflow-hidden mb-10">
            <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-semibold text-[#8a8a8a] leading-[0.95] tracking-tight relative"
            >
            <span className="text-[#F3EFE6]">Adaptive</span> Systems
            
            {/* Subtle glow on the word Adaptive */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />
            </motion.h1>
        </div>

        {/* Description & Interactive Elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-6xl">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="max-w-xl text-[#BEB6A8] text-lg md:text-xl font-light leading-relaxed"
            >
                Pioneering the intersection of <span className="text-[#F3EFE6]">Aerospace</span>, <span className="text-[#F3EFE6]">Artificial Intelligence</span>, and <span className="text-[#F3EFE6]">Control Systems</span>. We build the architecture for the autonomous future.
            </motion.p>

            {/* Magnetic CTA Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: "#F3EFE6", color: "#0B0B0C" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex items-center justify-between gap-4 px-8 py-4 border border-[#F3EFE6]/20 rounded-full text-[#F3EFE6] transition-colors duration-300 hover:border-[#F3EFE6]"
            >
                <span className="uppercase tracking-widest text-sm font-medium">Explore Research</span>
                <ArrowDownRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </motion.button>
        </div>
      </div>
    </section>
  );
}