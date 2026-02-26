import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

/* -------------------- TYPES -------------------- */

interface NavItemType {
  name: string;
  id: string;
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onClick: () => void;
}

interface ScrambleTextProps {
  text: string;
  trigger: boolean;
}

/* -------------------- DATA -------------------- */

const NAV_ITEMS: NavItemType[] = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Expertise", id: "work" },
  { name: "Projects", id: "projects" },
  { name: "Editorial", id: "editorial" },
  { name: "Identity", id: "contact" },
];

/* -------------------- MAIN COMPONENT -------------------- */

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");

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

  /* SCROLL SPY */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      NAV_ITEMS.forEach((item) => {
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
  }, []);

  const handleScrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#F3EFE6]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center bg-[#0B0B0C]/80 backdrop-blur-xl border border-[#F3EFE6]/10 rounded-full p-1.5 shadow-2xl shadow-black/80">
            {/* LEFT */}
            <div className="hidden md:flex items-center gap-3 px-4 border-r border-[#F3EFE6]/10 mr-1 h-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-mono text-[#F3EFE6]/60 tracking-widest">
                  SYS.ONLINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F3EFE6] tabular-nums tracking-widest opacity-50">
                {time || "00:00"} UTC
              </span>
            </div>

            {/* CENTER */}
            <ul
              className="flex items-center relative z-10"
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
                  onClick={() => handleScrollTo(item.id)}
                />
              ))}
            </ul>

            {/* RIGHT */}
            <div className="hidden md:flex items-center pl-1 ml-1 border-l border-[#F3EFE6]/10 h-8">
              <a
                href="#contact"
                className="group/btn relative flex items-center gap-2 px-5 py-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F3EFE6]">
                  Connect
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#F3EFE6] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* MOBILE */}
            <div className="md:hidden px-2">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-[#F3EFE6] hover:bg-white/10 rounded-full transition-colors"
              >
                <Menu size={20} />
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-[#0B0B0C]/95 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-8 right-8 p-4 text-[#F3EFE6] bg-white/5 rounded-full hover:rotate-90 transition-transform"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-6 text-center relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl md:text-7xl font-bold text-[#F3EFE6] uppercase tracking-tighter hover:text-[#D6B97A] transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------- NAV ITEM -------------------- */

function NavItem({
  item,
  isActive,
  isHovered,
  isAnyHovered,
  onHover,
  onClick,
}: NavItemProps) {
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
          <ScrambleText text={item.name} trigger={showPill} />
        </span>
      </button>
    </li>
  );
}

/* -------------------- SCRAMBLE -------------------- */

const CHARS = "ABCDEFGH!@#$%^&*()";

function ScrambleText({ text, trigger }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (trigger) {
      let iteration = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((_, index) => {
              if (index < iteration) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
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