import { Link } from "react-router-dom";

export default function EditorialSection() {
  return (
    <section id="editorial" className="portfolio-section bg-[#050505] px-5 py-20 text-[#F3EFE6] sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-8 border-t border-white/10 pt-8 md:grid-cols-2 md:items-end md:gap-16 md:pt-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Writing</p>
          <h2 className="mt-5 max-w-[12ch] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] md:text-7xl">
            Notes from the work.
          </h2>
        </div>
        <div className="max-w-xl">
          <p className="text-base leading-7 text-white/60 md:text-lg">
            A personal account of a hardware project and what happened while building it.
          </p>
          <Link to="/blog" className="mt-7 inline-flex min-h-12 items-center gap-3 border-b border-[#D6B97A]/50 pb-2 font-mono text-xs uppercase tracking-widest text-[#D6B97A] transition-colors hover:text-white">
            Read the post <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
