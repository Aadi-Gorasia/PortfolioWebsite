import { Link, Navigate, useParams } from "react-router-dom";
import { PROJECTS } from "../lib/project-data";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const details = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Core technology", value: project.tech?.[0] },
  ].filter((detail): detail is { label: string; value: string } => Boolean(detail.value));

  return (
    <main className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-black">
      <Link to="/projects" className="fixed left-4 top-[max(0.75rem,env(safe-area-inset-top))] z-40 flex min-h-12 items-center gap-2 border-b border-white/20 bg-[#050505] font-mono text-[9px] uppercase tracking-[0.12em] text-white md:left-8 md:top-8">
        ← All projects
      </Link>

      <header className="relative flex min-h-[65svh] items-end overflow-hidden border-b border-[#F3EFE6]/10 px-5 pb-12 pt-28 sm:px-6 md:min-h-[75vh] md:px-12 md:pb-20">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        ) : (
          <div className="absolute inset-0 bg-[#111]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-[#050505]/10" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <div className="mb-5 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest text-[#D6B97A]">
            {project.status && <span>{project.status}</span>}
            {project.category && <span>{project.category}</span>}
          </div>
          <h1 className="max-w-5xl break-words text-[clamp(2.7rem,11vw,5rem)] font-bold uppercase leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl">
            {project.title}
          </h1>
        </div>
      </header>

      {details.length > 0 && (
        <section aria-label="Project details" className="border-b border-[#F3EFE6]/10 bg-[#0A0A0A]">
          <dl className="mx-auto grid max-w-[1600px] grid-cols-2 divide-x divide-y divide-[#F3EFE6]/10 md:grid-cols-4 md:divide-y-0">
            {details.map((detail) => (
              <div key={detail.label} className="p-4 sm:p-6 md:p-8">
                <dt className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#F3EFE6]/40">{detail.label}</dt>
                <dd className="break-words text-sm font-medium text-[#F3EFE6] sm:text-base md:text-xl">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">
        {project.description && (
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Overview</h2>
            <p className="text-lg font-light leading-relaxed text-[#F3EFE6] md:text-2xl">{project.description}</p>
          </section>
        )}
        {project.challenge && (
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Challenge</h2>
            <p className="leading-relaxed text-[#BEB6A8]">{project.challenge}</p>
          </section>
        )}
        {project.solution && (
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Approach</h2>
            <p className="leading-relaxed text-[#BEB6A8]">{project.solution}</p>
          </section>
        )}
        {project.tech && project.tech.length > 0 && (
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Technology</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li key={item} className="border-b border-[#F3EFE6]/10 py-2 font-mono text-xs uppercase tracking-widest text-[#F3EFE6]/70">{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <footer className="border-t border-[#F3EFE6]/10 bg-[#0A0A0A] px-5 py-12 text-center md:py-20">
        <Link to="/projects" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F3EFE6]/65 transition-colors hover:text-[#D6B97A]">
          Browse all projects <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </main>
  );
}
