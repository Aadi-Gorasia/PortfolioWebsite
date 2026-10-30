export default function MainHero() {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="portfolio-section relative w-full min-h-[100svh] bg-[#0B0B0C] overflow-hidden selection:bg-[#D6B97A] selection:text-[#0B0B0C] flex flex-col justify-between">
      
      {/* Desktop introduction */}
      <div className="hidden md:flex relative z-30 w-full px-6 sm:px-8 md:px-16 lg:px-24 flex-grow flex-col justify-center pointer-events-none">
        <div className="flex flex-col leading-[0.9] tracking-tighter">
            
            {/* First Name */}
            <div className="overflow-hidden">
                <h1
                    className="text-[clamp(5rem,14vw,12rem)] font-display font-semibold text-[#F3EFE6] tracking-[-0.06em]"
                >
                    Aadi
                </h1>
            </div>
            
            <div className="overflow-hidden">
                <h1
                    className="text-[clamp(5rem,14vw,12rem)] font-serif font-medium italic text-[#D6B97A] tracking-[-0.05em] md:pl-32"
                >
                    Gorasia
                </h1>
            </div>

        </div>
      </div>

      {/* --- BOTTOM: NARRATIVE & ACTION --- */}
      <div className="hidden md:flex relative z-30 w-full px-6 sm:px-8 md:px-16 lg:px-24 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-24 flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 lg:gap-24">
            
            <div className="max-w-2xl border-l border-[#D6B97A]/50 pl-4 md:pl-8 py-2">
                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed">
                    I live in Pune. I started programming during lockdown and built projects to teach myself.
                </p>
            </div>

            <button
                onClick={handleContactClick}
                className="group flex min-h-12 items-center justify-between gap-8 border-b border-[#F3EFE6]/30 py-3 text-left transition-colors hover:border-[#D6B97A] hover:text-[#D6B97A] md:w-auto"
            >
                <span className="uppercase tracking-widest text-sm font-bold">Contact</span>
                <span aria-hidden="true">↘</span>
            </button>
      </div>

      <div className="mobile-home-hero relative z-20 flex min-h-[100svh] flex-col justify-between px-5 pb-28 pt-24 md:hidden">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3EFE6]/55">
            Pune, India
          </div>
        </div>

        <div className="mobile-home-art relative -mx-5 my-8 min-h-[34svh] flex-1 overflow-hidden">
          <img
            src="/aboutPhoto.jpeg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/35" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <h1
              className="font-display text-[16vw] font-semibold leading-[0.85] tracking-[-0.07em] text-[#F3EFE6]"
            >
              Aadi
              <span className="mt-2 block font-serif font-medium italic text-[16vw] text-[#D6B97A]">Gorasia</span>
            </h1>
          </div>
        </div>

        <div>
          <p className="max-w-sm text-[15px] leading-6 text-[#F3EFE6]/70">
            I started programming during lockdown and built projects to teach myself.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex min-h-12 items-center justify-between border-b border-[#D6B97A] py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#D6B97A]"
            >
              See my work <span aria-hidden="true">↓</span>
            </button>
            <button
              onClick={handleContactClick}
              className="flex min-h-12 items-center justify-between border-b border-white/20 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#F3EFE6]"
            >
              Say hello <span aria-hidden="true">↓</span>
            </button>
          </div>
          <div className="mobile-home-meta mt-6 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F3EFE6]/35">
            <span>Software and hardware projects</span>
          </div>
        </div>
      </div>

    </section>
  );
}