import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Now() {
  const[time, setTime] = useState("");

  // Live India Time (IST)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  },[]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#F3EFE6] selection:text-[#050505] font-sans">
      
      {/* 1. ATMOSPHERE (Static Noise, No Glows) */}
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' /></filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      {/* 2. THE RETURN (Minimalist Back Button) */}
      <Link 
        to="/" 
        className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-4 text-[#F3EFE6]/40 hover:text-[#F3EFE6] transition-colors duration-500 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <span className="font-mono text-xs uppercase tracking-[0.2em]">Index</span>
      </Link>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pt-40 pb-32">
        
        {/* --- HEADER --- */}
        <header className="mb-32">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease:[0.16, 1, 0.3, 1] }}
                className="text-[15vw] md:text-[12vw] leading-[0.75] font-bold tracking-tighter uppercase ml-[-0.05em]"
            >
                Now.
            </motion.h1>
        </header>

        {/* --- THE LEDGER (Brutalist Grid) --- */}
        <div className="border-t border-[#F3EFE6]/20">
            
            {/* ROW 1: TELEMETRY */}
            <Row delay={0.1} label="Current_State">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-[#F3EFE6]/40 uppercase tracking-widest">Location</span>
                        <span className="text-xl md:text-2xl font-medium tracking-tight">India</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-[#F3EFE6]/40 uppercase tracking-widest">Local_Time</span>
                        <span className="text-xl md:text-2xl font-mono tracking-tight tabular-nums">{time || "00:00:00"} IST</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-[#F3EFE6]/40 uppercase tracking-widest">Status</span>
                        <div className="flex items-center gap-3 mt-1">
                            <div className="w-2 h-2 bg-[#F3EFE6] rounded-full animate-pulse" />
                            <span className="text-xl md:text-2xl font-medium tracking-tight">Engineering</span>
                        </div>
                    </div>
                </div>
            </Row>

            {/* ROW 2: PRIMARY FOCUS */}
            <Row delay={0.2} label="Primary_Focus">
                <div className="max-w-3xl">
                    <h3 className="text-3xl md:text-5xl font-serif italic text-[#F3EFE6] leading-tight mb-8">
                        Building adaptive systems that bridge the gap between abstract control theory and raw hardware.
                    </h3>
                    <p className="text-[#F3EFE6]/60 text-lg md:text-xl font-light leading-relaxed">
                        Currently deep in the architecture phase of a new autonomous grid protocol. Spending most of my hours wrestling with Rust compilers and reading whitepapers on mesh networking latency. 
                        Trying to reduce complexity rather than manage it.
                    </p>
                </div>
            </Row>

            {/* ROW 3: CONSUMPTION */}
            <Row delay={0.3} label="Input_Stream">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
                    
                    {/* Reading */}
                    <div className="flex flex-col gap-6">
                        <span className="font-mono text-xs text-[#F3EFE6]/30 uppercase tracking-[0.2em] border-b border-[#F3EFE6]/10 pb-4">
                            Reading
                        </span>
                        <ul className="space-y-6">
                            <ListItem title="Designing Data-Intensive Applications" author="Martin Kleppmann" />
                            <ListItem title="The Master Switch" author="Tim Wu" />
                            <ListItem title="Meditations" author="Marcus Aurelius" />
                        </ul>
                    </div>

                    {/* Listening */}
                    <div className="flex flex-col gap-6">
                        <span className="font-mono text-xs text-[#F3EFE6]/30 uppercase tracking-[0.2em] border-b border-[#F3EFE6]/10 pb-4">
                            Resonance
                        </span>
                        <ul className="space-y-6">
                            <ListItem title="Selected Ambient Works 85-92" author="Aphex Twin" />
                            <ListItem title="Untrue" author="Burial" />
                            <ListItem title="Blade Runner 2049 (OST)" author="Hans Zimmer" />
                        </ul>
                    </div>
                </div>
            </Row>

            {/* ROW 4: PHILOSOPHY / QUOTE */}
            <Row delay={0.4} label="Directive">
                <div className="max-w-4xl py-12">
                    <blockquote className="text-4xl md:text-6xl font-serif italic text-[#F3EFE6]/80 leading-[1.1] tracking-tight">
                        "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
                    </blockquote>
                    <cite className="block mt-8 font-mono text-xs text-[#F3EFE6]/40 uppercase tracking-[0.2em]">
                        — Antoine de Saint-Exupéry
                    </cite>
                </div>
            </Row>

        </div>

        {/* --- FOOTER --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-32 pt-8 border-t border-[#F3EFE6]/20 flex justify-between items-center"
        >
            <span className="font-mono text-[10px] text-[#F3EFE6]/30 uppercase tracking-widest">
                Last_Updated :: March 2026
            </span>
            <span className="font-mono text-[10px] text-[#F3EFE6]/30 uppercase tracking-widest">
                End_Of_File
            </span>
        </motion.div>

      </div>
    </div>
  );
}

/* =========================================
   SUBCOMPONENTS FOR STRICT BRUTALIST GRID
   ========================================= */

// The "Ledger Row"
function Row({ children, label, delay }: { children: React.ReactNode, label: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row border-b border-[#F3EFE6]/20"
        >
            {/* The Label Column (Fixed width on desktop) */}
            <div className="lg:w-1/4 py-8 lg:py-16 pr-8 border-b lg:border-b-0 lg:border-r border-[#F3EFE6]/10">
                <span className="font-mono text-xs text-[#F3EFE6]/50 uppercase tracking-[0.2em] sticky top-32">
                    // {label}
                </span>
            </div>
            
            {/* The Content Column */}
            <div className="lg:w-3/4 py-12 lg:py-16 lg:pl-16">
                {children}
            </div>
        </motion.div>
    );
}

// Minimalist List Item
function ListItem({ title, author }: { title: string, author: string }) {
    return (
        <li className="flex flex-col gap-1 group">
            <span className="text-xl md:text-2xl font-medium tracking-tight text-[#F3EFE6] group-hover:text-[#F3EFE6]/70 transition-colors">
                {title}
            </span>
            <span className="font-mono text-[10px] text-[#F3EFE6]/40 uppercase tracking-widest">
                {author}
            </span>
        </li>
    );
}