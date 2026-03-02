import { useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// ⚠️ DATA CONFIGURATION
const PROJECTS = [
  {
    id: "01",
    client: "Aerospace Dynamics",
    name: "Autonomous Flight Grid",
    role: "Systems Architecture",
    year: "2024",
    slug: "autonomous-flight-grid",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "02",
    client: "Neural Net Corp",
    name: "Adaptive Vision Mod",
    role: "ML Engineering",
    year: "2023",
    slug: "adaptive-vision-mod",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
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
    img: "https://images.unsplash.com/photo-1614728853913-1e2217713b2e?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function SelectedWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse Position Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement for the image container
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // We want the image centered on the cursor, but we'll offset it in the CSS
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section 
        id="projects" 
        onMouseMove={handleMouseMove}
        className="relative bg-[#050505] py-32 overflow-hidden cursor-none" // Hide default cursor inside section
    >
      
      {/* 1. ATMOSPHERE GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* 2. THE FLOATING EYE (Cursor Follower) */}
      <motion.div
        style={{ 
            left: smoothX, 
            top: smoothY,
        }}
        className="fixed top-0 left-0 w-[400px] h-[280px] pointer-events-none z-30 hidden md:block overflow-hidden rounded-sm -translate-x-1/2 -translate-y-1/2"
      >
        {PROJECTS.map((project, index) => {
            // Logic: Is this the active image?
            const isActive = hoveredIndex === index;
            return (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ 
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 1.2 
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full bg-[#111]"
                >
                    <img 
                        src={project.img} 
                        alt={project.name}
                        className="w-full h-full object-cover filter grayscale contrast-125"
                    />
                    {/* Scanlines on the floating image */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-30" />
                    
                    {/* Overlay Badge */}
                    <div className="absolute bottom-4 left-4 bg-[#D6B97A] text-black px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">
                        Target_Locked
                    </div>
                </motion.div>
            )
        })}
      </motion.div>


      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex items-end justify-between mb-24 border-b border-[#F3EFE6]/10 pb-6">
          <h2 className="text-[#F3EFE6] text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.8]">
            Operational<br /><span className="text-[#F3EFE6]/20">Output</span>
          </h2>
          <div className="hidden md:flex flex-col items-end text-right gap-2">
             <div className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse" />
             <span className="text-[#D6B97A] font-mono text-xs tracking-widest uppercase">
                Secure Archive
             </span>
          </div>
        </div>

        {/* THE LIST */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ProjectItem 
              key={index} 
              project={project} 
              index={index} 
              setHoveredIndex={setHoveredIndex} 
              hoveredIndex={hoveredIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index, setHoveredIndex, hoveredIndex }: any) {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <Link to={`/projects/${project.slug}`} className="block relative group">
      <motion.div
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        animate={{ opacity: isDimmed ? 0.3 : 1, filter: isDimmed ? "blur(2px)" : "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className="relative border-t border-[#F3EFE6]/10 py-16 transition-all duration-500 hover:border-[#D6B97A]/50"
      >
        
        {/* BACKGROUND FLASH (On Hover) */}
        <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: isHovered ? 1 : 0 }}
             transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
             className="absolute inset-0 bg-[#F3EFE6] origin-left z-0"
        />

        {/* CONTENT LAYER */}
        {/* We use mix-blend-difference so when the white background slides in, the text turns black automatically */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-6 mix-blend-difference">
            
            {/* Left: ID + Title */}
            <div className="flex items-baseline gap-8 md:gap-16">
                <span className="text-[#F3EFE6] font-mono text-sm opacity-50">
                    0{index + 1}
                </span>
                <h3 className="text-4xl md:text-7xl text-[#F3EFE6] font-bold uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                    {project.name}
                </h3>
            </div>

            {/* Right: Meta + Arrow */}
            <div className="flex items-center gap-12 pl-14 md:pl-0">
                <div className="hidden md:flex flex-col text-right">
                    <span className="text-[#F3EFE6] text-xs uppercase tracking-widest opacity-50">
                        {project.client}
                    </span>
                    <span className="text-[#F3EFE6] text-xs uppercase tracking-widest font-bold">
                        {project.year}
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <span className="text-[#F3EFE6] font-mono text-xs uppercase tracking-widest hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Access_File
                    </span>
                    <div className="w-12 h-12 border border-[#F3EFE6] rounded-full flex items-center justify-center group-hover:bg-[#F3EFE6] group-hover:text-black transition-colors duration-300">
                         <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile-Only Image (Since floating eye is hidden on mobile) */}
        <div className="md:hidden mt-8 w-full aspect-video overflow-hidden border border-white/10">
            <img src={project.img} className="w-full h-full object-cover grayscale" />
        </div>

      </motion.div>
    </Link>
  );
}