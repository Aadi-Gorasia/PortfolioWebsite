import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Cpu, Layers, Calendar, User, Terminal } from "lucide-react";
import { PROJECTS } from "../lib/project-data";
import { Navigate } from "react-router-dom";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) { return <Navigate to="/dangerZone" replace/>; }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#000] relative">
      
      {/* Fuel Line */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#D6B97A] origin-left z-50 mix-blend-difference" style={{ scaleX }} />

      {/* Back Button */}
      <Link to="/projects" className="fixed top-8 left-8 z-40 group mix-blend-difference">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-[#F3EFE6] rounded-full flex items-center justify-center group-hover:bg-[#F3EFE6] transition-all duration-300">
                <ArrowLeft className="w-5 h-5 text-[#F3EFE6] group-hover:text-[#000]" />
            </div>
            <span className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] text-[#F3EFE6]">Abort</span>
        </div>
      </Link>

      {/* --- HERO SECTION --- */}
      <header className="relative h-[80vh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12 border-b border-[#F3EFE6]/10">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover opacity-40 filter grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
            <div className="flex items-center gap-4 mb-6">
                 <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border ${
                     project.status === "LIVE_ORBIT" ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" :
                     "bg-[#D6B97A]/20 border-[#D6B97A] text-[#D6B97A]"
                 }`}>
                    Status: {project.status}
                </span>
                <div className="h-[1px] w-24 bg-[#F3EFE6]/20" />
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] max-w-5xl">
                {project.title}
            </h1>
        </div>
      </header>

      {/* --- MISSION SPECS (Data Grid) --- */}
      <section className="border-b border-[#F3EFE6]/10 bg-[#0A0A0A]">
          <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#F3EFE6]/10">
              <SpecItem icon={<User size={16} />} label="Client" value={project.client} />
              <SpecItem icon={<Calendar size={16} />} label="Year" value={project.year} />
              <SpecItem icon={<Layers size={16} />} label="Role" value={project.role} />
              <SpecItem icon={<Cpu size={16} />} label="Core Tech" value={project.tech[0]} />
          </div>
      </section>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* --- LEFT: NARRATIVE --- */}
        <div className="lg:col-span-7 space-y-16">
            
            {/* Description */}
            <div>
                <h3 className="text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Terminal size={14} /> Mission Brief
                </h3>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-[#F3EFE6]">
                    {project.description}
                </p>
            </div>

            {/* The Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#F3EFE6]/10">
                <div>
                    <h4 className="text-[#F3EFE6]/50 font-mono text-xs uppercase tracking-widest mb-4">
                        // The Challenge
                    </h4>
                    <p className="text-[#BEB6A8] leading-relaxed">
                        {project.challenge}
                    </p>
                </div>
                <div>
                    <h4 className="text-[#F3EFE6]/50 font-mono text-xs uppercase tracking-widest mb-4">
                        // The Solution
                    </h4>
                    <p className="text-[#BEB6A8] leading-relaxed">
                        {project.solution}
                    </p>
                </div>
            </div>

             {/* Tech Stack Full List */}
             <div className="pt-12">
                <h4 className="text-[#F3EFE6]/50 font-mono text-xs uppercase tracking-widest mb-6">
                    // Full Arsenal
                </h4>
                <div className="flex flex-wrap gap-3">
                    {project.tech.map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-[#F3EFE6]/5 border border-[#F3EFE6]/10 text-xs font-mono uppercase tracking-widest text-[#D6B97A]">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* --- RIGHT: VISUAL EVIDENCE (Gallery) --- */}
        <div className="lg:col-span-5 space-y-8">
            <h3 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em] mb-6 text-right">
                Visual_Evidence
            </h3>
            
            {project.gallery.map((img: string, i: number) => (
                <div key={i} className="group relative aspect-[4/3] bg-[#111] border border-[#F3EFE6]/10 overflow-hidden">
                    <img 
                        src={img} 
                        alt={`Evidence ${i}`} 
                        className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                    />
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 text-[10px] font-mono bg-black/50 text-[#F3EFE6] px-2 py-1">
                        FIG_0{i + 1}
                    </div>
                </div>
            ))}
        </div>

      </main>

      {/* --- FOOTER (Next Project) --- */}
      <footer className="border-t border-[#F3EFE6]/10 bg-[#0A0A0A] py-24 text-center">
        <Link to="/projects" className="group inline-flex flex-col items-center gap-4">
            <span className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-widest">
                Mission Complete
            </span>
            <span className="text-4xl md:text-6xl font-bold text-[#F3EFE6] uppercase tracking-tighter group-hover:text-[#D6B97A] transition-colors">
                Return to Base
            </span>
            <div className="w-12 h-12 border border-[#F3EFE6]/20 rounded-full flex items-center justify-center mt-4 group-hover:bg-[#D6B97A] group-hover:border-[#D6B97A] transition-all">
                 <ArrowUpRight className="text-[#F3EFE6] group-hover:text-[#000]" />
            </div>
        </Link>
      </footer>

    </div>
  );
}

// Subcomponent for specs
function SpecItem({ icon, label, value }: any) {
    return (
        <div className="p-6 md:p-8 flex flex-col gap-3 group hover:bg-[#F3EFE6]/5 transition-colors">
            <div className="text-[#D6B97A]">{icon}</div>
            <div>
                <p className="text-[#F3EFE6]/40 text-[10px] font-mono uppercase tracking-widest mb-1">{label}</p>
                <p className="text-[#F3EFE6] font-medium text-lg md:text-xl">{value}</p>
            </div>
        </div>
    )
}