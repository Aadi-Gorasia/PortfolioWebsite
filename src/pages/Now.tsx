import { Link } from "react-router-dom";

export default function Now() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-28 text-[#F3EFE6] sm:px-6 md:px-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <Link to="/" className="mb-12 inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#D6B97A]">
          ← Home
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Current update</p>
        <h1 className="mt-4 text-[clamp(4rem,20vw,12rem)] font-bold uppercase leading-[0.8] tracking-tighter">Now</h1>
        <div className="mt-12 max-w-2xl border-t border-white/10 pt-8 md:mt-16">
          <p className="text-xl leading-relaxed text-white/65 md:text-2xl">
            I have not posted a current update here. The project list shows the work currently featured on this site.
          </p>
          <Link to="/projects" className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-white/20 font-mono text-xs uppercase tracking-widest transition-colors hover:border-[#D6B97A] hover:text-[#D6B97A]">
            View projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
