"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace these with your actual gritty engineering photos/videos
const EXPERTISE = [
  {
    id: 0,
    title: "Adaptive Control",
    category: "System Dynamics",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop", // Industrial/Tech
  },
  {
    id: 1,
    title: "Aerospace Proto",
    category: "Hardware Integration",
    src: "https://images.unsplash.com/photo-1559067515-bf7d799b23e2?q=80&w=2574&auto=format&fit=crop", // Turbine/Jet
  },
  {
    id: 2,
    title: "Machine Learning",
    category: "Neural Architectures",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop", // AI/Data
  },
  {
    id: 3,
    title: "Auto Navigation",
    category: "Path Planning",
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop", // Robot/Drone
  },
  {
    id: 4,
    title: "System Arch",
    category: "Full Stack Engineering",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // Server/Structure
  },
];

export default function ExpertiseSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="relative bg-[#0B0B0C] min-h-screen py-32 px-4 md:px-16 overflow-hidden flex flex-col justify-center">
      
      {/* 1. The Background Image Reveal Layer */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <AnimatePresence mode="popLayout">
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Image with Grayscale & Contrast filter for that 'Classified' look */}
              <img
                src={EXPERTISE[hoveredIndex].src}
                alt="Expertise"
                className="w-full h-full object-cover filter grayscale contrast-[1.2] brightness-75"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-transparent to-[#0B0B0C]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. The List */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between border-b border-[#F3EFE6]/10 pb-4">
          <h2 className="text-[#F3EFE6]/40 text-sm font-mono tracking-widest uppercase">
            // Core Competencies
          </h2>
          <div className="hidden md:flex gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-[#F3EFE6]/40 text-xs font-mono">OPERATIONAL</span>
          </div>
        </div>

        {/* The Menu */}
        <div className="flex flex-col">
          {EXPERTISE.map((item, index) => (
            <ExpertiseItem
              key={item.id}
              item={item}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseItem({ item, index, hoveredIndex, setHoveredIndex }: any) {
  // Determine the state of this specific item
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      className="group relative border-b border-[#F3EFE6]/10 py-10 cursor-none md:cursor-pointer transition-colors duration-500"
    >
      {/* Container Layout */}
      <div className="flex items-center justify-between relative z-20 mix-blend-difference">
        
        {/* Title */}
        <motion.h3
          animate={{
            x: isHovered ? 20 : 0,
            opacity: isDimmed ? 0.2 : 1,
            filter: isDimmed ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-[#F3EFE6] uppercase"
        >
          {item.title}
        </motion.h3>

        {/* Category Tag & Arrow */}
        <motion.div
           animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? -20 : 0,
          }}
          className="hidden md:flex items-center gap-4 text-[#F3EFE6]"
        >
          <span className="text-sm font-mono tracking-widest uppercase opacity-70">
            {item.category}
          </span>
          {/* <MoveRight className="w-8 h-8" /> */}
        </motion.div>
      </div>

      {/* Hover Background Strip (The 'Selection' Highlight) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#F3EFE6] origin-left z-0 mix-blend-exclusion opacity-100"
      />
    </motion.div>
  );
}