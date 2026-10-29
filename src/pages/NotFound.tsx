import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Zap } from "lucide-react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const containerRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 12 });
  const smoothY = useSpring(pointerY, { stiffness: 50, damping: 12 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-8deg", "8deg"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(Math.random() > 0.82 ? "40X" : "404");
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handlePointerMove}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-black cursor-crosshair"
    >
      
      {/* 1. THE VOID BACKGROUND (Dynamic Gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(214,185,122,0.12),transparent_60%)] z-0 pointer-events-none" />
      
      {/* 2. NOISE & SCANLINES */}
      {/* 3. CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Warning Badge */}
        <div className="flex items-center gap-3 mb-8 border border-red-500/30 bg-red-500/10 px-4 py-2 rounded-full">
            <AlertTriangle size={14} className="text-red-500" />
            <span className="text-red-500 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                Critical Failure
            </span>
        </div>

        {/* MASSIVE 3D TEXT */}
        <div className="perspective-1000">
            <motion.h1
                style={{ rotateX, rotateY }}
                className="text-[25vw] leading-[0.8] font-black tracking-tighter text-[#F3EFE6] select-none"
            >
                {glitchText}
            </motion.h1>
        </div>

        {/* Terminal readout */}
        <div className="mt-12 space-y-2 font-mono text-xs md:text-sm text-[#D6B97A]/80">
            <p className="typing-effect">ERR_CODE: PAGE_NOT_FOUND_IN_SECTOR_07</p>
            <p className="typing-effect delay-100 opacity-50">ATTEMPTING_DATA_RECOVERY... FAILED</p>
            <p className="typing-effect delay-200 opacity-50">COORDINATES_LOST.</p>
        </div>

        {/* 4. THE SICK BUTTON (Hard Reset) */}
        <div className="mt-16">
            <Link to="/" className="group relative inline-block">
                
                {/* The Button Container */}
                <div className="relative overflow-hidden bg-black border border-[#F3EFE6]/20 px-12 py-6 transition-all duration-300 group-hover:border-[#D6B97A]">
                    
                    {/* The Fill Animation */}
                    <div className="absolute inset-0 bg-[#D6B97A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4">
                         <div className="flex flex-col items-start">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#F3EFE6]/50 group-hover:text-black/60 transition-colors">
                                System Override
                            </span>
                            <span className="text-2xl font-bold uppercase tracking-tighter text-[#F3EFE6] group-hover:text-black transition-colors">
                                Initiate Reboot
                            </span>
                         </div>
                         <div className="w-10 h-10 border border-[#F3EFE6]/20 flex items-center justify-center group-hover:border-black/20 transition-colors">
                            <Zap className="w-5 h-5 text-[#D6B97A] group-hover:text-black transition-colors group-hover:fill-black" />
                         </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#F3EFE6] group-hover:border-black transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#F3EFE6] group-hover:border-black transition-colors" />
                </div>

                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-[#D6B97A] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
            </Link>
        </div>

      </div>

      {/* 5. FOOTER META */}
      <div className="absolute bottom-8 w-full px-12 flex justify-between font-mono text-[10px] uppercase text-[#F3EFE6]/20 tracking-widest">
            <span>Memory_Dump_Complete</span>
            <span>ID: UNKNOWN</span>
      </div>

    </section>
  );
}