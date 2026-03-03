import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

/* -------------------- TYPES -------------------- */
interface NavItemType {
  name: string;
  id: string;
  isRoute?: boolean;
}

/* -------------------- DATA -------------------- */
const NAV_ITEMS: NavItemType[] = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Expertise", id: "work" },
  { name: "Projects", id: "projects" },
  { name: "Editorial", id: "editorial" },
  { name: "Blogs", id: "blog", isRoute: true },
];

/* -------------------- MAIN COMPONENT -------------------- */
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>("home");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");

  // Ref to prevent Scroll Spy from reactivating tabs while we auto-scroll to contact
  const isManualScroll = useRef(false);

  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* CLOCK */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* SCROLL SPY (Desktop Only) */
  useEffect(() => {
    const handleScroll = () => {
      // 1. If not home, ignore
      if (location.pathname !== "/") return;
      
      // 2. If we are auto-scrolling to contact, ignore updates
      if (isManualScroll.current) return;

      const scrollPosition = window.scrollY + 300;
      
      NAV_ITEMS.forEach((item) => {
        if (item.isRoute) return;
        const section = document.getElementById(item.id);
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveTab(item.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  /* NAVIGATION HANDLER */
  const handleNavigation = (item: NavItemType) => {
    setIsMobileOpen(false);
    isManualScroll.current = false; // Re-enable scroll spy for normal nav

    if (item.isRoute) {
      navigate(`/${item.id}`);
      setActiveTab(item.id);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(item.id);
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
    setActiveTab(item.id);
  };

  /* CONTACT CLICK HANDLER */
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileOpen(false);
    
    // 1. Lock the scroll spy so it doesn't light up "Editorial" while scrolling past it
    isManualScroll.current = true;

    // 2. Clear the active tab (The Highlight Goes Away)
    setActiveTab("");

    // 3. Scroll to contact
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });

    // 4. Unlock the scroll spy after animation (approx 1s)
    // This allows the highlight to reappear when the user manually scrolls back up
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div className="pointer-events-auto relative group w-full lg:w-auto flex justify-center">
          
          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#F3EFE6]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* HUD Container */}
          <div className="relative flex items-center justify-between lg:justify-center bg-[#0B0B0C]/80 backdrop-blur-xl border border-[#F3EFE6]/10 rounded-full p-1.5 shadow-2xl shadow-black/80 w-full lg:w-auto">
            
            {/* LEFT: Telemetry */}
            <div className="hidden lg:flex items-center gap-3 px-4 border-r border-[#F3EFE6]/10 mr-1 h-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-mono text-[#F3EFE6]/60 tracking-widest">
                  SYS.ONLINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F3EFE6] tabular-nums tracking-widest opacity-50">
                {time} UTC
              </span>
            </div>

            {/* CENTER: Nav Items */}
            <ul
              className="hidden lg:flex items-center relative z-10"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeTab === item.id}
                  isHovered={hoveredTab === item.id}
                  isAnyHovered={!!hoveredTab}
                  onHover={() => setHoveredTab(item.id)}
                  onClick={() => handleNavigation(item)}
                />
              ))}
            </ul>

            {/* MOBILE HEADER */}
            <div className="lg:hidden pl-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[#F3EFE6] tracking-widest uppercase">
                    Aadi.SYS
                </span>
            </div>

            {/* RIGHT: Connect */}
            <div className="hidden lg:flex items-center pl-1 ml-1 border-l border-[#F3EFE6]/10 h-8">
              <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="group/btn relative flex items-center gap-2 px-5 py-2 rounded-full hover:bg-white/5 transition-colors"
                >
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F3EFE6]">
                  Connect
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#F3EFE6] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="lg:hidden pr-1">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-[#F3EFE6] bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5"
              >
                <Menu size={18} />
              </button>
            </div>

            {/* SCROLL PROGRESS */}
            <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-[#F3EFE6]/5 overflow-hidden rounded-full">
              <motion.div
                style={{ width }}
                className="h-full bg-[#F3EFE6]/50 shadow-[0_0_10px_#F3EFE6]"
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* -------------------- MOBILE OVERLAY -------------------- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
            
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-8 right-6 p-4 text-[#F3EFE6] bg-white/5 rounded-full hover:rotate-90 transition-transform border border-white/10 z-50"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-6 text-center relative z-10 w-full px-8">
                <div className="text-[#D6B97A]/50 font-mono text-xs uppercase tracking-[0.3em] mb-4">
                    // Navigation_Sequence
                </div>
                
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between w-full border-b border-white/10 pb-4"
                >
                    <span className="text-3xl md:text-5xl font-bold text-[#F3EFE6] uppercase tracking-tighter group-hover:text-[#D6B97A] transition-colors">
                        {item.name}
                    </span>
                    <ArrowUpRight className="text-[#333] group-hover:text-[#D6B97A] transition-colors" />
                </motion.button>
              ))}

               {/* Mobile Connect Button */}
               <motion.button
                  onClick={handleContactClick}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between w-full border-b border-[#D6B97A]/50 pb-4 mt-4"
                >
                    <span className="text-3xl md:text-5xl font-bold text-[#D6B97A] uppercase tracking-tighter">
                        Connect
                    </span>
                    <ArrowUpRight className="text-[#D6B97A]" />
                </motion.button>
            </div>
            
            <div className="absolute bottom-12 w-full px-8 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <span className="text-[#F3EFE6]/30 font-mono text-[10px] uppercase tracking-widest">System Status</span>
                    <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-widest">Nominal</span>
                </div>
                <div className="flex items-center gap-2 text-[#F3EFE6]/30 font-mono text-[10px]">
                    <Terminal size={12} /> v2.4.0
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------- NAV ITEM (With Glitch) -------------------- */

function NavItem({ item, isActive, isHovered, isAnyHovered, onHover, onClick }: any) {
  const showPill = isHovered || (isActive && !isAnyHovered);

  return (
    <li className="relative list-none">
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        className="relative block px-5 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors duration-200 z-20"
      >
        {showPill && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 bg-[#F3EFE6] rounded-full shadow-[0_0_15px_rgba(243,239,230,0.2)] mix-blend-exclusion z-0"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span
          className={`relative z-10 transition-colors duration-200 ${
            showPill ? "text-[#0B0B0C]" : "text-[#F3EFE6]"
          }`}
        >
          {/* THE GLITCH IS HERE */}
          <ScrambleText text={item.name} trigger={showPill} />
        </span>
      </button>
    </li>
  );
}

/* -------------------- SCRAMBLE COMPONENT -------------------- */
const CHARS = "ABCDEFGH!@#$%^&*()";

function ScrambleText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (trigger) {
      let iteration = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((_, index) =>
              index < iteration
                ? text[index]
                : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join("")
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text);
        }
        iteration += 0.5;
      }, 30);
    } else {
      setDisplayText(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, text]);

  return <>{displayText}</>;
}