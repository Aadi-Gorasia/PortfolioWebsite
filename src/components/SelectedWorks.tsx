import { useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, Database } from "lucide-react";
import { Link } from "react-router-dom";

// ⚠️ DATA CONFIGURATION (Top 4 Featured)
const PROJECTS =[
  {
    id: "01",
    client: "Machine Learning",
    name: "Gesture Control Car",
    role: "Systems Architecture",
    year: "2023",
    slug: "gesture-control-car",
    img: "/gesturecontrolcar.png",
  },
  {
    id: "02",
    client: "Applied Physics",
    name: "Tesla Turbine",
    role: "ML Engineering",
    year: "2024",
    slug: "tesla-turbine",
    img: "/teslaturbine.png"
  },
  {
    id: "03",
    client: "Algorithmic Technologies",
    name: "A* Path Finding Algorithm",
    role: "Algorithm Design",
    year: "2024",
    slug: "a-star-path-finding",
    img: "/a*pathfindingalgorithm.png"
  },
  {
    id: "04",
    client: "Aerospace Systems",
    name: "PLEN",
    role: "Backend Optimization",
    year: "2025 (ONGOING)",
    slug: "hyper-index-engine",
    img: "/plen.png"
  }
];

export default function SelectedWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse Position Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section 
        id="projects" 
        onMouseMove={handleMouseMove}
        className="relative bg-[#050505] py-32 overflow-hidden cursor-none" 
    >
      
      {/* 1. ATMOSPHERE GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* 2. THE FLOATING EYE */}
      <motion.div
        style={{ 
            left: smoothX, 
            top: smoothY,
        }}
        className="fixed top-0 left-0 w-[400px] h-[280px] pointer-events-none z-30 hidden md:block overflow-hidden rounded-sm -translate-x-1/2 -translate-y-1/2"
      >
        {PROJECTS.map((project, index) => {
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
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-30" />
                    
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
                Featured Archive
             </span>
          </div>
        </div>

        {/* THE LIST */}
        <div className="flex flex-col border-b border-[#F3EFE6]/10">
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

        {/* --- 3. THE GATEWAY (Link to All Projects) --- */}
        <div className="mt-12 flex justify-end">
            <Link 
                to="/projects" 
                className="group relative flex items-center justify-between w-full md:w-[600px] border border-[#F3EFE6]/20 bg-[#0A0A0A] p-8 overflow-hidden transition-colors duration-500 hover:border-[#D6B97A]"
            >
                {/* Background Fill Animation */}
                <div className="absolute inset-0 bg-[#D6B97A] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-6 mix-blend-difference">
                    <Database className="w-8 h-8 text-[#F3EFE6]" />
                    <div className="flex flex-col">
                        <span className="text-[#F3EFE6]/50 font-mono text-[10px] uppercase tracking-widest mb-1">
                            // Unrestricted_Access
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-[#F3EFE6] uppercase tracking-tighter">
                            Access Full Database
                        </span>
                    </div>
                </div>

                {/* Arrow */}
                <div className="relative z-10 mix-blend-difference">
                    <ArrowUpRight className="w-8 h-8 text-[#F3EFE6] group-hover:rotate-45 transition-transform duration-500" />
                </div>
            </Link>
        </div>

      </div>
    </section>
  );
}

// --- ROW COMPONENT ---
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
             transition={{ duration: 0.5, ease:[0.16, 1, 0.3, 1] }}
             className="absolute inset-0 bg-[#F3EFE6] origin-left z-0"
        />

        {/* CONTENT LAYER */}
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

        {/* Mobile-Only Image */}
        <div className="md:hidden mt-8 w-full aspect-video overflow-hidden border border-white/10">
            <img src={project.img} className="w-full h-full object-cover grayscale" />
        </div>

      </motion.div>
    </Link>
  );
}