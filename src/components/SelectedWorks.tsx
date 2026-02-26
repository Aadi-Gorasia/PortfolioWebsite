import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    client: "Aerospace Dynamics",
    name: "Autonomous Flight Grid",
    role: "Systems Architecture",
    year: "2024",
    img: "https://images.unsplash.com/photo-1559067515-bf7d799b23e2?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: "02",
    client: "Neural Net Corp",
    name: "Adaptive Vision Mod",
    role: "ML Engineering",
    year: "2023",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "03",
    client: "DefSpec",
    name: "Protocol: OMEGA",
    role: "Full Stack Security",
    year: "2023",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "04",
    client: "Private Sector",
    name: "Hyper-Index Engine",
    role: "Backend Optimization",
    year: "2022",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
  }
];

export default function SelectedWorks() {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef(null);

  return (
    <section id="projects" className="bg-[#0B0B0C] py-32 relative overflow-hidden">
      
      {/* Background Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-6">
          <h2 className="text-[#F3EFE6] text-6xl md:text-8xl font-medium tracking-tighter">
            Selected Works
          </h2>
          <span className="hidden md:block text-[#F3EFE6]/40 font-mono text-xs tracking-widest uppercase">
            // Case Files 2022—2024
          </span>
        </div>

        {/* The Project List */}
        <div ref={containerRef} className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ProjectItem 
              key={index} 
              project={project} 
              index={index} 
              setHovered={setHovered} 
              hovered={hovered} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index, setHovered, hovered }: any) {
  const isHovered = hovered === index;

  return (
    <motion.div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="group relative border-t border-white/10 py-12 cursor-pointer"
    >
      {/* The Hover Reveal Image (Floating) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.9,
          x: isHovered ? 20 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 md:right-20 top-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[500px] md:h-[300px] overflow-hidden z-20 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src={project.img} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20" />
      </motion.div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-30 mix-blend-difference">
        
        <div className="flex items-baseline gap-6 md:gap-12">
            <span className="text-[#F3EFE6]/30 font-mono text-sm">
                {project.id}
            </span>
            <h3 className="text-3xl md:text-5xl text-[#F3EFE6] font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                {project.name}
            </h3>
        </div>

        <div className="flex items-center gap-8 md:gap-16 pl-12 md:pl-0">
            <span className="text-[#F3EFE6]/50 text-sm uppercase tracking-widest hidden md:block">
                {project.client}
            </span>
            <span className="text-[#F3EFE6]/50 text-sm uppercase tracking-widest">
                {project.role}
            </span>
             <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#F3EFE6] group-hover:border-[#F3EFE6] transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#F3EFE6] group-hover:text-[#0B0B0C] transition-colors" />
             </div>
        </div>
      </div>

      {/* Background Hover Flash */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#F3EFE6] origin-left z-0 mix-blend-exclusion"
      />
    </motion.div>
  );
}