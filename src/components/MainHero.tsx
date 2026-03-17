"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { ArrowDownRight, Crosshair } from "lucide-react";

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

  // Dynamic gradient background that follows mouse - upgraded to have a subtle gold core
  const background = useMotionTemplate`radial-gradient(
    800px circle at ${mouseX}px ${mouseY}px,
    rgba(214, 185, 122, 0.25),
    transparent 80%
  )`;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="relative w-full min-h-screen bg-[#0B0B0C] overflow-hidden selection:bg-[#D6B97A] selection:text-[#0B0B0C] flex flex-col justify-between">
      
      {/* 1. TECHNICAL GRID & NOISE */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      {/* 2. THE SPOTLIGHT */}
      <motion.div
        className="absolute inset-0 z-10 opacity-100 pointer-events-none mix-blend-screen"
        style={{ background }}
      />

      {/* 3. STRUCTURAL FRAMING (The HUD Elements) */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-[#F3EFE6]/20 z-0" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-[#F3EFE6]/20 z-0" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-[#F3EFE6]/20 z-0" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-[#F3EFE6]/20 z-0" />
      
      {/* Center Reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0">
         <Crosshair size={400} strokeWidth={0.5} />
      </div>

      {/* --- TOP: STATUS ROW --- */}
      <div className="relative z-30 w-full px-8 md:px-16 lg:px-24 pt-32 flex justify-between items-end">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4"
        >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]" />
            <span className="text-[#F3EFE6] text-xs uppercase tracking-[0.3em] font-mono opacity-80">
                System Status: Nominal
            </span>
        </motion.div>
        
        {/* Telemetry Data (Pune Coordinates) */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden md:flex flex-col text-right text-[#F3EFE6]/30 font-mono text-[10px] uppercase tracking-widest"
        >
            <span>LAT: 18.5204° N</span>
            <span>LNG: 73.8567° E</span>
        </motion.div>
      </div>

      {/* --- CENTER: MASSIVE TYPOGRAPHY --- */}
      <div className="relative z-30 w-full px-8 md:px-16 lg:px-24 flex-grow flex flex-col justify-center pointer-events-none">
        <div className="flex flex-col leading-[0.8] tracking-tighter mix-blend-difference">
            
            {/* First Name */}
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, ease:[0.16, 1, 0.3, 1] }} 
                    className="text-[18vw] md:text-[14vw] font-black text-[#F3EFE6] uppercase"
                >
                    Aadi
                </motion.h1>
            </div>
            
            {/* Last Name (Staggered & Colored) */}
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, delay: 0.1, ease:[0.16, 1, 0.3, 1] }}
                    className="text-[18vw] md:text-[14vw] font-black text-[#D6B97A] uppercase md:pl-32 relative"
                >
                    Gorasia
                    {/* Subtle optical flare behind the text */}
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[40vw] h-[20vh] bg-[#D6B97A]/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
                </motion.h1>
            </div>

        </div>
      </div>

      {/* --- BOTTOM: NARRATIVE & ACTION --- */}
      <div className="relative z-30 w-full px-8 md:px-16 lg:px-24 pb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24">
            
            {/* The Backstory (Now structured like a data log) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="max-w-2xl border-l border-[#D6B97A]/30 pl-6 md:pl-8 py-2 relative"
            >
                {/* Decorative corner on the text box */}
                <div className="absolute top-0 left-0 w-2 h-[1px] bg-[#D6B97A]" />
                <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-[#D6B97A]" />
                
                <p className="text-[#BEB6A8] text-lg md:text-xl font-light leading-relaxed">
                    I live in Pune and the lockdown turned me into <span className="text-[#F3EFE6] font-medium">a nerd</span>, the boredom kicked in and <span className="text-[#F3EFE6] font-medium">programming really got to me</span>, I built a lot of random projects, mainly to teach myself <span className="text-[#F3EFE6] font-medium">but also for the fun of it.</span>
                </p>
            </motion.div>

            {/* The CTA Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleContactClick}
                className="group relative flex items-center justify-between gap-8 px-8 py-5 border border-[#F3EFE6]/20 bg-[#0B0B0C] overflow-hidden transition-all duration-500 hover:border-[#D6B97A] w-full md:w-auto"
            >
                {/* Slide-up Gold Fill */}
                <div className="absolute inset-0 bg-[#D6B97A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                
                <span className="relative z-10 uppercase tracking-widest text-sm font-bold text-[#F3EFE6] group-hover:text-[#0B0B0C] transition-colors duration-300">
                    Meet Up
                </span> 
                
                <div className="relative z-10 w-8 h-8 flex items-center justify-center border border-[#F3EFE6]/20 rounded-full group-hover:border-[#0B0B0C]/20 transition-colors duration-300">
                    <ArrowDownRight className="w-4 h-4 text-[#F3EFE6] group-hover:text-[#0B0B0C] transition-all duration-500 group-hover:rotate-45" />
                </div>
            </motion.button>
      </div>

    </section>
  );
}