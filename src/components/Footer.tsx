import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        timeZoneName: "long" 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0B0B0C] pt-24 pb-8 px-6 md:px-12 border-t border-[#F3EFE6]/10 overflow-hidden">
      
      {/* Background Grid Pattern (Faint) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* TOP ROW: CTA & NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          
          {/* 1. The Call to Action (Span 6) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
                <h2 className="text-[#F3EFE6] text-5xl md:text-7xl font-medium tracking-tighter leading-[0.9] mb-8">
                  Let’s build the <br />
                  <span className="text-[#666] italic font-serif">unseen.</span>
                </h2>
                <button 
                  onClick={() => window.location.href = "mailto:aadigorasia6@gmail.com"}
                  className="group flex items-center gap-4 text-[#F3EFE6] hover:text-[#D6B97A] transition-colors duration-300"
                >
                  <span className="text-sm font-mono uppercase tracking-widest border-b border-[#F3EFE6]/30 pb-1 group-hover:border-[#D6B97A]">
                    Initiate Sequence
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
            </div>
          </div>

          {/* 2. Sitemap (Span 2) */}
          <div className="md:col-span-2 space-y-6">
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
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em]">Network</h4>
            <ul className="space-y-3">
              {["LinkedIn", "GitHub", "Twitter / X", "Read.cv"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#F3EFE6]/70 hover:text-[#F3EFE6] text-sm tracking-wide transition-colors block group">
                    {item} <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Meta Data (Span 2) */}
          <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
            <div>
                <h4 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em] mb-4">Coordinates</h4>
                <p className="text-[#F3EFE6] font-mono text-xs">
                    Pune, MH<br />
                    37.7749° N, 122.4194° W
                </p>
            </div>
            
            <div>
                <h4 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em] mb-4">Local Time</h4>
                <p className="text-[#F3EFE6] font-mono text-xs tabular-nums">
                    {time}
                </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: MASSIVE SIGNATURE */}
        <div className="border-t border-[#F3EFE6]/10 pt-12 flex flex-col md:flex-row items-end justify-between gap-8">
            
            {/* The Name (Fills the space) */}
            <div className="w-full overflow-hidden">
                <h1 className="text-[14vw] leading-[0.8] font-bold text-[#F3EFE6] tracking-tighter uppercase select-none mix-blend-difference opacity-90">
                    GORASIA
                </h1>
            </div>

            {/* Back to Top Button */}
            <button 
                onClick={scrollToTop}
                className="group relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 border border-[#F3EFE6]/20 rounded-full hover:bg-[#F3EFE6] hover:border-[#F3EFE6] transition-all duration-500 shrink-0 mb-4 md:mb-8"
            >
                <div className="absolute inset-0 rounded-full bg-[#F3EFE6] scale-0 group-hover:scale-100 transition-transform duration-500" />
                <ArrowUp className="w-6 h-6 md:w-8 md:h-8 text-[#F3EFE6] group-hover:text-[#0B0B0C] relative z-10 transition-colors duration-500" />
            </button>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-[#F3EFE6]/5 text-[#F3EFE6]/30 text-[10px] uppercase tracking-widest font-mono">
            <span>© {new Date().getFullYear()} Aadi Gorasia Systems. All Rights Reserved.</span>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                <span>System Status: Operational</span>
            </div>
        </div>

      </div>
    </footer>
  );
}