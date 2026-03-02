import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Crosshair, Filter } from "lucide-react";
import { PROJECTS } from "../lib/project-data";

export default function Projects() {
  const [filter, setFilter] = useState("ALL_SYSTEMS");
  const categories = ["ALL_SYSTEMS", ...new Set(PROJECTS.map(p => p.category))];

  const filtered = filter === "ALL_SYSTEMS" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#000] relative overflow-hidden pt-32 pb-24 px-6 md:px-12">
      
      {/* Atmosphere */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' /></filter><rect width='100%' height='100%' filter='url(#noise)' /></svg>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        <Link to="/" className="fixed top-8 left-6 z-40 group mix-blend-difference">
         <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-[#D6B97A] mb-1 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowLeft size={12} />
                <span className="font-mono text-[20px] uppercase tracking-widest">Abort</span>
            </div>
         </div>
      </Link>
        {/* Header */}
        <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#F3EFE6]/10 pb-12">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse shadow-[0_0_10px_#D6B97A]" />
                    <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em]">System Inventory</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-[#F3EFE6] uppercase">
                    Deployed <br /><span className="text-[#F3EFE6]/20">Units</span>
                </h1>
            </div>

            {/* Filter */}
            <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-2 text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest mb-2">
                    <Filter size={12} />
                    <span>Filter_Protocol</span>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 border text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                                filter === cat 
                                ? "bg-[#D6B97A] text-[#000] border-[#D6B97A]" 
                                : "bg-transparent text-[#F3EFE6]/50 border-[#F3EFE6]/10 hover:border-[#D6B97A] hover:text-[#D6B97A]"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* The Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-20">
            <AnimatePresence>
                {filtered.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group block"
        >
            <Link to={`/projects/${project.slug}`}>
                {/* Image Window */}
                <div className="relative aspect-video w-full bg-[#111] mb-6 overflow-hidden border border-[#F3EFE6]/10 group-hover:border-[#D6B97A] transition-colors duration-500">
                    <img 
                        src={project.coverImage} 
                        alt={project.title} 
                        className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
                    
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="bg-[#050505]/80 backdrop-blur border border-[#F3EFE6]/20 text-[#F3EFE6] px-2 py-1 text-[10px] font-mono uppercase tracking-widest">
                            {project.category}
                        </span>
                        <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest border ${
                             project.status === "LIVE_ORBIT" ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" :
                             project.status === "CLASSIFIED" ? "bg-red-500/20 border-red-500 text-red-500" :
                             "bg-[#F3EFE6]/10 border-[#F3EFE6]/20 text-[#F3EFE6]"
                        }`}>
                            {project.status}
                        </span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#D6B97A] text-[#000] px-4 py-2 text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2">
                            <Crosshair size={14} /> Initialize
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="flex justify-between items-start pl-6 border-l border-[#F3EFE6]/10 group-hover:border-[#D6B97A] transition-colors">
                    <div>
                        <h3 className="text-3xl font-bold text-[#F3EFE6] uppercase tracking-tight mb-2 group-hover:text-[#D6B97A] transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex gap-2">
                            {project.tech.slice(0, 3).map((t: string) => (
                                <span key={t} className="text-[#F3EFE6]/40 text-xs font-mono uppercase">
                                    [{t}]
                                </span>
                            ))}
                        </div>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[#F3EFE6]/30 group-hover:text-[#D6B97A] transition-colors" />
                </div>
            </Link>
        </motion.div>
    );
}