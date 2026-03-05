"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

const PHILOSOPHY = [
  {
    title: "Design",
    desc: "Architecture isn't just visual. It's the silent logic that dictates how a system breathes under pressure.",
    tag: "01"
  },
  {
    title: "Build",
    desc: "Resilience is engineered, not assumed. Every line of code is a structural beam in the final edifice.",
    tag: "02"
  },
  {
    title: "Research",
    desc: "To innovate is to be comfortable in the unknown. I explore the white space between defined disciplines.",
    tag: "03"
  },
];

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative bg-[#F1ECE2] min-h-screen flex items-center py-32 px-6 md:px-16 overflow-hidden"
    >
      {/* Background Texture (Subtle Noise for continuity) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <filter id='noiseLight'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseLight)' />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-16 items-start z-10">
        
        {/* Left Column: Narrative */}
        <div className="md:col-span-7 space-y-12">
            <RevealTitle />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <p className="text-xl md:text-2xl font-light text-[#1A1A1A] leading-relaxed max-w-2xl">
                    I treat engineering as a craft of <span className="font-medium italic">adaptation</span>. 
                    In a world of rigid algorithms, I build systems that learn, flex, and evolve.
                    <br /><br />
                    My work is the bridge between the abstract elegance of mathematics and the chaotic reality of hardware implementation.
                </p>
            </motion.div>

            {/* Interactive List */}
            <div className="pt-10 border-t border-[#1A1A1A]/10">
                {PHILOSOPHY.map((item, i) => (
                    <ListItem key={i} item={item} />
                ))}
            </div>
        </div>

        {/* Right Column: Visual Insight */}
        <div className="md:col-span-5 relative h-[600px] w-full hidden md:block">
            {/* The Image Container with Masking */}
            <div className="overflow-hidden h-full w-full relative">
                <motion.div 
                    style={{ y }} 
                    className="absolute inset-0 w-full h-[120%] -top-[10%]"
                >
                    {/* Replace with your actual image. Using a placeholder that fits the vibe. */}
                    <img 
                        src="/AboutSection.png" 
                        alt="Engineering Schematic"
                        className="w-full h-full object-cover grayscale contrast-[0.9] brightness-[1.1]"
                    />
                </motion.div>
                
                {/* Technical Overlay */}
                <div className="absolute inset-0 border-[1px] border-[#1A1A1A]/10 m-4 pointer-events-none">
                    <div className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase font-mono text-[#1A1A1A]">
                        Fig. 01 — The Process
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component for the reveal animation of the title
function RevealTitle() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.h2 
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-semibold text-[#1A1A1A] tracking-tight leading-[1.1]"
            >
                From blueprint <br />
                to <span className="text-[#888] italic serif">full bloom.</span>
            </motion.h2>
        </div>
    )
}

// Sub-component for the Interactive List Items
function ListItem({ item }: { item: { title: string, desc: string, tag: string } }) {
    return (
        <motion.div 
            initial="initial"
            whileHover="hover"
            className="group relative border-b border-[#1A1A1A]/10 py-8 cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-6">
                    <span className="text-xs font-mono text-[#1A1A1A]/40">{item.tag}</span>
                    <h3 className="text-3xl font-medium text-[#1A1A1A] group-hover:pl-4 transition-all duration-300 ease-out">
                        {item.title}
                    </h3>
                </div>
                
                {/* Icon turns into Arrow on hover */}
                <div className="relative overflow-hidden w-6 h-6">
                    <motion.div 
                        variants={{ initial: { y: 0 }, hover: { y: -24 } }}
                        transition={{ duration: 0.3 }}
                    >
                        <Plus className="w-6 h-6 text-[#1A1A1A]/40" />
                    </motion.div>
                    <motion.div 
                        variants={{ initial: { y: 24 }, hover: { y: -24 } }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0"
                    >
                        <ArrowRight className="w-6 h-6 text-[#1A1A1A]" />
                    </motion.div>
                </div>
            </div>

            {/* Expandable Description */}
            <motion.div
                variants={{ initial: { height: 0, opacity: 0 }, hover: { height: "auto", opacity: 1 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
            >
                <p className="pt-4 text-[#1A1A1A]/70 text-lg max-w-md ml-10">
                    {item.desc}
                </p>
            </motion.div>
        </motion.div>
    );
}