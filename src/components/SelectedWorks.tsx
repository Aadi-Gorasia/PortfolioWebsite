import { Link } from "react-router-dom";
import { PROJECTS } from "../lib/project-data";

const FEATURED_PROJECTS = PROJECTS.filter((project) =>
  ["gesture-control-car", "tesla-turbine", "a-star-path-finding", "hyper-index-engine"].includes(project.slug)
);

export default function SelectedWorks() {
  return (
    <section
        id="projects"
        className="portfolio-section relative bg-[#050505] py-14 md:py-32 overflow-hidden"
    >

      <div className="relative z-10 md:hidden">
        <div className="mb-6 flex items-end justify-between px-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D6B97A]">A selection of things made</p>
            <h2 className="mt-2 font-display text-4xl font-semibold leading-[0.9] tracking-[-0.07em] text-[#F3EFE6]">
              Selected <span className="font-serif font-medium italic text-[#D6B97A]">work.</span>
            </h2>
          </div>
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FEATURED_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group relative aspect-[0.82] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden border border-white/10 bg-[#151515]"
            >
              {project.coverImage && <img src={project.coverImage} alt={project.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/5" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#D6B97A]">{project.client} <span className="text-white/35">· {project.year}</span></p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-[0.95] tracking-[-0.055em] text-white">{project.title}</h3>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">{project.role}</p>
              </div>
            </Link>
          ))}
          <Link to="/projects" className="flex min-h-full w-[72vw] max-w-[280px] shrink-0 snap-center flex-col justify-between border border-[#D6B97A]/40 p-5 text-[#F3EFE6]">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#D6B97A]">All projects</span>
            <span className="font-display text-3xl font-semibold leading-[0.95] tracking-[-0.06em]">Browse the<br />full archive</span>
          </Link>
        </div>
        <p className="mt-2 px-5 text-xs text-white/45">More projects are available in the archive.</p>
      </div>

      <div className="hidden max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 md:block">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-12 md:mb-24 border-b border-[#F3EFE6]/10 pb-6">
          <h2 className="text-[#F3EFE6] text-[clamp(2.8rem,10vw,6rem)] md:text-8xl font-semibold tracking-tighter leading-[0.9]">
            Selected work
          </h2>
          <div className="hidden md:flex flex-col items-end text-right gap-2">
             <span className="text-[#D6B97A] font-mono text-xs tracking-widest uppercase">
                Featured projects
             </span>
          </div>
        </div>

        {/* THE LIST */}
        <div className="flex flex-col border-b border-[#F3EFE6]/10">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectItem
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* --- 3. THE GATEWAY (Link to All Projects) --- */}
        <div className="mt-12 flex justify-end">
            <Link
                to="/projects"
                className="group flex min-h-16 w-full items-center justify-between border-y border-[#F3EFE6]/20 py-5 transition-colors hover:border-[#D6B97A] md:w-[600px]"
            >
                <span className="text-lg font-bold uppercase tracking-tight text-[#F3EFE6] sm:text-2xl">View all projects</span>
                <span aria-hidden="true" className="text-[#D6B97A]">↗</span>
            </Link>
        </div>

      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col gap-6 border-t border-[#F3EFE6]/10 py-8 transition-colors hover:border-[#D6B97A]/50 md:flex-row md:items-center md:justify-between md:py-10"
    >
      <div className="flex min-w-0 items-center gap-4 sm:gap-8 md:gap-12">
        <span className="font-mono text-sm text-[#F3EFE6]/50">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="break-words text-[clamp(1.7rem,7vw,4.5rem)] font-semibold tracking-tighter text-[#F3EFE6] transition-colors group-hover:text-[#D6B97A] md:text-6xl">
          {project.title}
        </h3>
      </div>

      <div className="flex items-center justify-between gap-6 pl-9 sm:pl-14 md:justify-end md:pl-0">
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="hidden aspect-video w-48 object-cover md:block"
          />
        )}
        <div className="text-right font-mono text-[10px] uppercase tracking-widest text-[#F3EFE6]/50">
          <span className="block">{project.client}</span>
          <span className="block font-bold text-[#F3EFE6]">{project.year}</span>
        </div>
        <span aria-hidden="true" className="text-2xl text-[#F3EFE6]/60 transition-colors group-hover:text-[#D6B97A]">↗</span>
      </div>
    </Link>
  );
}