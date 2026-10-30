import { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../lib/project-data";

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", ...new Set(PROJECTS.map((project) => project.category).filter((category): category is string => Boolean(category)))];
  const filteredProjects = filter === "ALL"
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === filter);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-28 text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#000] sm:px-6 md:px-12 md:pt-32">
      <div className="mx-auto max-w-[1600px]">
        <Link to="/" className="fixed left-4 top-[max(0.75rem,env(safe-area-inset-top))] z-40 flex min-h-12 items-center gap-2 border-b border-white/20 bg-[#050505] font-mono text-[9px] uppercase tracking-[0.12em] text-white md:hidden">
          ← Home <span className="text-white/35">/</span> Projects
        </Link>
        <Link to="/" className="fixed left-5 top-6 z-40 hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D6B97A] md:flex">
          ← Home
        </Link>

        <header className="mb-12 flex flex-col gap-8 border-b border-[#F3EFE6]/10 pb-8 md:mb-16 md:flex-row md:items-end md:justify-between md:pb-12">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Projects</p>
            <h1 className="text-[clamp(3.2rem,12vw,6rem)] font-semibold leading-[0.9] tracking-tighter md:text-8xl">
              Selected work
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#F3EFE6]/40">
            Filter projects
            </div>
            <div className="flex max-w-full gap-5 overflow-x-auto pb-2 md:flex-wrap md:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                  className={`min-h-11 shrink-0 border-b px-1 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                    filter === category
                      ? "border-[#D6B97A] text-[#D6B97A]"
                      : "border-transparent text-[#F3EFE6]/55 hover:border-[#F3EFE6]/40 hover:text-[#F3EFE6]"
                  }`}
                >
                  {category === "ALL" ? "All projects" : category}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          {filteredProjects.map((project) => (
            <article key={project.slug} className="group overflow-hidden border-t border-white/15 pt-4">
              <Link to={`/projects/${project.slug}`} className="block">
                {project.coverImage && (
                  <div className="relative aspect-[1.28] overflow-hidden md:aspect-video">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-3xl">{project.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">
                      {project.client && <span>{project.client}</span>}
                      {project.year && <span>{project.year}</span>}
                      {project.category && <span>{project.category}</span>}
                    </div>
                  </div>
                  <span className="sr-only">View project</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
