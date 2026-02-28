import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// ⚠️ MAPPING CONFIGURATION
// The 'slug' must match the filename of a post in /content/blog/ (without .mdx)
const PROJECTS = [
  {
    id: "01",
    client: "Aerospace Dynamics",
    name: "Autonomous Flight Grid",
    role: "Systems Architecture",
    year: "2024",
    slug: "autonomous-flight-grid", // Matches autonomous-flight-grid.mdx
    img: "https://images.unsplash.com/photo-1559067515-bf7d799b23e2?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: "02",
    client: "Neural Net Corp",
    name: "Adaptive Vision Mod",
    role: "ML Engineering",
    year: "2023",
    slug: "adaptive-vision-mod", // Matches adaptive-vision-mod.mdx
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "03",
    client: "DefSpec",
    name: "Protocol: OMEGA",
    role: "Full Stack Security",
    year: "2023",
    slug: "protocol-omega",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "04",
    client: "Private Sector",
    name: "Hyper-Index Engine",
    role: "Backend Optimization",
    year: "2022",
    slug: "hyper-index-engine",
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
            // Classified Archive
          </span>
        </div>

        {/* The Project List */}
        <div ref={containerRef} className="flex flex-col group/list">
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
    <Link to={`/blog/${project.slug}`} className="block relative">
      <motion.div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className="group/item relative border-t border-white/10 py-12 cursor-none md:cursor-pointer transition-colors duration-500 hover:border-white/0"
      >
        
        {/* --- THE REVEAL IMAGE (The "Flashlight") --- */}
        {/* Only visible when this specific item is hovered */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.9,
            x: isHovered ? 20 : 0,
            rotate: isHovered ? -2 : 0
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 md:right-20 top-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[500px] md:h-[300px] overflow-hidden z-20 pointer-events-none"
        >
            {/* Darken Overlay */}
            <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply" />
            
            {/* The Image */}
            <img 
                src={project.img} 
                alt={project.name} 
                className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-90"
            />
            
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-30" />
            
            {/* Technical Data Overlay on Image */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                 <span className="bg-[#D6B97A] text-[#0B0B0C] text-[10px] font-mono px-1 font-bold">
                    IMG_REF_{index}
                 </span>
            </div>
        </motion.div>


        {/* --- TEXT CONTENT --- */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-30 mix-blend-difference">
            
            <div className="flex items-baseline gap-6 md:gap-12 transition-transform duration-500 group-hover/item:translate-x-4">
                <span className="text-[#F3EFE6]/30 font-mono text-sm">
                    {project.id}
                </span>
                <h3 className="text-3xl md:text-5xl text-[#F3EFE6] font-medium tracking-tight">
                    {project.name}
                </h3>
            </div>

            <div className="flex items-center gap-8 md:gap-16 pl-12 md:pl-0">
                <span className="text-[#F3EFE6]/50 text-sm uppercase tracking-widest hidden md:block">
                    {project.client}
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-[#F3EFE6]/50 text-sm uppercase tracking-widest">
                        {project.role}
                    </span>
                    {/* Arrow Animation */}
                    <div className="overflow-hidden w-5 h-5 relative ml-2">
                         <ArrowUpRight className="w-5 h-5 text-[#F3EFE6] absolute top-0 left-0 transition-transform duration-300 group-hover/item:translate-x-full group-hover/item:-translate-y-full" />
                         <ArrowUpRight className="w-5 h-5 text-[#D6B97A] absolute top-0 left-0 -translate-x-full translate-y-full transition-transform duration-300 group-hover/item:translate-x-0 group-hover/item:translate-y-0" />
                    </div>
                </div>
            </div>
        </div>

        {/* --- HOVER BACKGROUND FLASH --- */}
        {/* The white bar that slides in, inverting the text color via mix-blend-difference */}
        <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[#F3EFE6] origin-left z-0 mix-blend-exclusion"
        />
      </motion.div>
    </Link>
  );
}