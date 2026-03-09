import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function EditorialSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      id="editorial" 
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-[#F3EFE6] flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden"
    >
      
      {/* 1. ATMOSPHERE */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        
        {/* --- THE POEM (Arranged Layout) --- */}
        <div className="flex flex-col relative leading-[0.8] uppercase select-none pointer-events-none">
            
            {/* LINE 1: CHAOS */}
            <MaskedReveal delay={0}>
                <div className="flex items-end gap-8">
                    <h2 className="font-bold text-[16vw] md:text-[12vw] tracking-tighter text-[#F3EFE6] mix-blend-difference">
                        Chaos
                    </h2>
                    <span className="hidden md:block text-sm font-mono text-[#F3EFE6]/30 mb-8 max-w-[200px] normal-case tracking-normal leading-tight">
                        / The initial state of all complex systems before intervention.
                    </span>
                </div>
            </MaskedReveal>

            {/* LINE 2: IS JUST */}
            <MaskedReveal delay={0.15}>
                <div className="flex justify-end pr-12 md:pr-32">
                     <h2 className="font-light text-[8vw] tracking-tight text-[#F3EFE6]/40 italic font-serif lowercase">
                        is just
                    </h2>
                </div>
            </MaskedReveal>

            {/* LINE 3: UNRECOGNIZED */}
            <MaskedReveal delay={0.3}>
                <div className="pl-4 md:pl-24">
                    <h2 className="font-bold text-[14vw] md:text-[11vw] tracking-tighter text-[#F3EFE6]">
                        Unrecognized
                    </h2>
                </div>
            </MaskedReveal>

            {/* LINE 4: PATTERN (Gold) */}
            <MaskedReveal delay={0.45}>
                 <div className="flex justify-end items-center gap-6 mt-4 md:mt-0">
                    <div className="h-[1px] w-12 md:w-32 bg-[#D6B97A]" />
                    <h2 className="font-serif italic text-[12vw] md:text-[10vw] tracking-tighter text-[#D6B97A]">
                        Pattern.
                    </h2>
                </div>
            </MaskedReveal>

        </div>

        {/* --- THE CITATION (Tripesh Bodhi) --- */}
        <motion.div 
            style={{ y }}
            className="mt-32 md:mt-48 flex justify-center md:justify-end"
        >
            <a 
                href="https://palerecrite.vercel.app/profile.html?author=TRIPESH%20BODHI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-block pointer-events-auto"
            >
                <div className="flex items-start gap-4 text-left">
                    {/* The Bracket */}
                    <span className="text-[#D6B97A] font-mono text-4xl hidden md:block opacity-50">[</span>
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="text-[#F3EFE6]/40 font-mono text-[10px] uppercase tracking-[0.2em]">
                                Reference_ID :: EXT_MEMORY
                            </span>
                            <div className="h-[1px] w-8 bg-[#F3EFE6]/20 group-hover:w-16 transition-all duration-500" />
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-serif italic text-[#F3EFE6] group-hover:text-[#D6B97A] transition-colors duration-300">
                            Tripesh Bodhi
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-1">
                            <ArrowUpRight className="w-4 h-4 text-[#F3EFE6]/50 group-hover:text-[#D6B97A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            <span className="text-[#F3EFE6]/30 font-mono text-xs hover:underline decoration-[#D6B97A]">
                                read_source_entry
                            </span>
                        </div>
                    </div>

                    <span className="text-[#D6B97A] font-mono text-4xl hidden md:block opacity-50">]</span>
                </div>
                
                {/* Subtle Glow on Hover */}
                <div className="absolute -inset-4 bg-[#D6B97A]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </a>
        </motion.div>

      </div>
    </section>
  );
}

// Text Reveal Wrapper
function MaskedReveal({ children, delay }: { children: React.ReactNode, delay: number }) {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}