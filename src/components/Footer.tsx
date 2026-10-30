import { Link, useNavigate, useLocation } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "About", id: "about" },
  { label: "Expertise", id: "work" }, // Maps 'Expertise' to the 'work' ID
  { label: "Projects", id: "projects" },
  { label: "Editorial", id: "editorial" },
];


export default function FatFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. The Universal Scroll Handler
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    // If we are NOT on home, go there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for the home page to mount, then hunt the ID
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If we ARE on home, just hunt the ID
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="portfolio-section relative bg-[#0B0B0C] pt-16 md:pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-8 px-5 sm:px-6 md:px-12 border-t border-[#F3EFE6]/10 overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-xl md:hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
          <span>Contact</span>
          <span className="text-[#D6B97A]">Aadi Gorasia</span>
        </div>
        <h2 className="mt-8 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#F3EFE6]">
          Get in touch.
        </h2>
        <button onClick={(e) => handleScroll(e, "contact")} className="mt-6 flex min-h-12 w-full items-center justify-between border-y border-white/15 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
          Start a conversation <span aria-hidden="true" className="text-[#D6B97A]">↗</span>
        </button>
        <div className="mt-10 grid grid-cols-2 gap-3">
          <Link to="/blog" className="border-t border-white/15 py-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">Read</span>
            <span className="mt-2 block font-display text-lg font-medium text-white">Writing ↗</span>
          </Link>
          <Link to="/now" className="border-t border-white/15 py-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">Today</span>
            <span className="mt-2 block font-display text-lg font-medium text-white">What I’m up to ↗</span>
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-white/50">
            <a href="https://github.com/Aadi-Gorasia" target="_blank" rel="noopener noreferrer" className="min-h-11 flex items-center">GitHub ↗</a>
            <a href="https://x.com/gorasiaaadi" target="_blank" rel="noopener noreferrer" className="min-h-11 flex items-center">X ↗</a>
          </div>
          <button onClick={scrollToTop} className="min-h-11 font-mono text-[10px] uppercase tracking-widest text-[#D6B97A]">Back to top ↑</button>
        </div>
        <div className="mt-4 flex gap-5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">
          <Link to="/privacy-policy" className="min-h-11 flex items-center">Privacy</Link>
          <Link to="/terms-and-conditions" className="min-h-11 flex items-center">Terms</Link>
        </div>
        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/30">© {new Date().getFullYear()} Aadi Gorasia · Pune, India</p>
      </div>

      <div className="hidden max-w-[1600px] mx-auto relative z-10 md:block">
        
        {/* TOP ROW: CTA & NAVIGATION */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 md:gap-8 mb-16 md:mb-24">
          
          {/* 1. The Call to Action (Span 6) */}
          <div className="col-span-2 md:col-span-6 flex flex-col justify-between">
            <div>
                <h2 className="text-[#F3EFE6] text-[clamp(2.7rem,11vw,4.5rem)] md:text-7xl font-medium tracking-tighter leading-[0.9] mb-8">
                  Get in touch.
                </h2>
                <button 
                  onClick={(e) => handleScroll(e, "contact")}
                  className="group flex items-center gap-4 text-[#F3EFE6] hover:text-[#D6B97A] transition-colors duration-300"
                >
                  <span className="text-sm font-mono uppercase tracking-widest border-b border-[#F3EFE6]/30 pb-1 group-hover:border-[#D6B97A]">
                    Contact
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
            </div>
          </div>

          {/* 2. Sitemap (Span 2) */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
        <h4 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em]">
          Index
        </h4>
        <ul className="space-y-3">
          {FOOTER_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={`#${item.id}`} // Fallback for hover preview
                onClick={(e) => handleScroll(e, item.id)}
                className="text-[#F3EFE6]/70 hover:text-[#D6B97A] text-sm tracking-wide transition-colors block cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>


          {/* 3. Socials (Span 2) */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
  <h4 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em]">
    Network
  </h4>

  <ul className="space-y-3">
    {[
      { name: "GitHub", url: "https://github.com/Aadi-Gorasia" },
      { name: "Twitter / X", url: "https://x.com/gorasiaaadi" },
    ].map((item) => (
      <li key={item.name}>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F3EFE6]/70 hover:text-[#F3EFE6] text-sm tracking-wide transition-colors block group"
        >
          {item.name}
          <span className="ml-1">↗</span>
        </a>
      </li>
    ))}
  </ul>
</div>

          {/* 4. Legal links */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <h4 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em]">Information</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-[#F3EFE6]/70 hover:text-[#D6B97A] text-sm tracking-wide transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-[#F3EFE6]/70 hover:text-[#D6B97A] text-sm tracking-wide transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F3EFE6]/10 pt-8 md:pt-12 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="w-full overflow-hidden">
                <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none font-medium text-[#F3EFE6] tracking-tight">
                    Aadi Gorasia
                </h1>
            </div>

            {/* Back to Top Button */}
            <button 
                onClick={scrollToTop}
                className="shrink-0 border-y border-[#F3EFE6]/30 py-4 font-mono text-[10px] uppercase tracking-widest text-[#F3EFE6] transition-colors hover:border-[#D6B97A] hover:text-[#D6B97A] md:mb-8"
            >
                Back to top ↑
            </button>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-[#F3EFE6]/5 text-[#F3EFE6]/30 text-[10px] uppercase tracking-widest font-mono">
            <span>© {new Date().getFullYear()} Aadi Gorasia</span>
            <span className="mt-4 md:mt-0">Pune, India</span>
        </div>

      </div>
    </footer>
  );
}