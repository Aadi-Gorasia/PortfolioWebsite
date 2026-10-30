import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  { name: "Writing", id: "blog", isRoute: true },
  { name: "Now", id: "now", isRoute: true }
];

/* -------------------- MAIN COMPONENT -------------------- */
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>("home");
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileOpen]);

  // Ref to prevent Scroll Spy from reactivating tabs while we auto-scroll to contact
  const isManualScroll = useRef(false);

  /* SCROLL SPY (Desktop Only) */
  useEffect(() => {
    let scheduledFrame = 0;
    const handleScroll = () => {
      if (scheduledFrame) return;
      scheduledFrame = requestAnimationFrame(() => {
        scheduledFrame = 0;
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
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(scheduledFrame);
    };
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
  const handleContactClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsMobileOpen(false);
    
    // 1. Lock the scroll spy so it doesn't light up "Editorial" while scrolling past it
    isManualScroll.current = true;

    // 2. Clear the active tab (The Highlight Goes Away)
    setActiveTab("");

    // 3. Scroll to contact
    const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scrollToContact, 120);
    } else {
      scrollToContact();
    }

    // 4. Unlock the scroll spy after animation (approx 1s)
    // This allows the highlight to reappear when the user manually scrolls back up
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#F3EFE6]/10 bg-[#0B0B0C] pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 md:px-12">
          <button onClick={() => handleNavigation(NAV_ITEMS[0])} className="font-display text-base font-semibold text-[#F3EFE6]" aria-label="Go to home">
            Aadi Gorasia
          </button>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => handleNavigation(item)}
              />
            ))}
            <li className="ml-3 border-l border-[#F3EFE6]/15 pl-4">
              <button onClick={() => handleContactClick()} className="min-h-11 px-2 font-mono text-[10px] uppercase tracking-widest text-[#F3EFE6] transition-colors hover:text-[#D6B97A]">
                Contact
              </button>
            </li>
          </ul>
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={isMobileOpen}
            className="min-h-11 px-2 font-mono text-[10px] uppercase tracking-widest text-[#F3EFE6] lg:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      <nav aria-label="Quick navigation" className="fixed bottom-0 inset-x-0 z-40 border-t border-white/15 bg-[#0B0B0C] pb-[env(safe-area-inset-bottom)] md:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-4">
          <button
            onClick={() => handleNavigation(NAV_ITEMS[0])}
            aria-current={location.pathname === "/" && activeTab === "home" ? "page" : undefined}
            className={`min-h-14 border-r border-white/10 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors ${location.pathname === "/" && activeTab === "home" ? "text-[#D6B97A]" : "text-[#F3EFE6]/55 active:text-[#F3EFE6]"}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation(NAV_ITEMS[3])}
            aria-current={activeTab === "projects" || location.pathname.startsWith("/projects") ? "page" : undefined}
            className={`min-h-14 border-r border-white/10 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors ${activeTab === "projects" || location.pathname.startsWith("/projects") ? "text-[#D6B97A]" : "text-[#F3EFE6]/55 active:text-[#F3EFE6]"}`}
          >
            Work
          </button>
          <button
            onClick={() => navigate("/blog")}
            aria-current={location.pathname.startsWith("/blog") ? "page" : undefined}
            className={`min-h-14 border-r border-white/10 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors ${location.pathname.startsWith("/blog") ? "text-[#D6B97A]" : "text-[#F3EFE6]/55 active:text-[#F3EFE6]"}`}
          >
            Journal
          </button>
          <button
            onClick={() => handleContactClick()}
            aria-current={activeTab === "" ? "page" : undefined}
            className={`min-h-14 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors ${activeTab === "" ? "text-[#D6B97A]" : "text-[#F3EFE6]/55 active:text-[#F3EFE6]"}`}
          >
            Contact
          </button>
        </div>
      </nav>

      {isMobileOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] bg-[#050505] md:bg-[#050505]/95 flex flex-col items-center justify-start overflow-y-auto overscroll-contain px-6 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] pb-[max(5rem,calc(env(safe-area-inset-bottom)+4rem))] md:justify-center md:px-0 md:py-0"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation"
              className="absolute top-[max(1.25rem,env(safe-area-inset-top))] right-5 md:top-8 md:right-6 min-h-11 px-2 md:px-4 font-mono text-[10px] uppercase tracking-widest text-[#F3EFE6] z-50"
            >
              Close
            </button>

            <div className="mobile-menu-items flex flex-col gap-2 md:gap-6 text-center relative z-10 w-full max-w-xl md:px-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className="group flex items-center justify-between w-full min-h-12 border-b border-white/10 py-1 md:min-h-14 md:py-3 md:pb-4"
                >
                    <span className="font-display text-2xl font-medium tracking-tight text-[#F3EFE6] group-hover:text-[#D6B97A] transition-colors sm:text-3xl md:text-5xl">
                        {item.name}
                    </span>
                </button>
              ))}

               <button
                  onClick={handleContactClick}
                  className="group flex items-center justify-between w-full min-h-12 border-b border-[#D6B97A]/50 py-1 mt-1 md:min-h-14 md:py-3 md:mt-4"
                >
                    <span className="font-display text-2xl font-medium tracking-tight text-[#D6B97A] sm:text-3xl md:text-5xl">
                        Contact
                    </span>
                </button>
            </div>
            
          </div>
      )}
    </>
  );
}

/* -------------------- NAV ITEM -------------------- */

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ item, isActive, onClick }: NavItemProps) {
  return (
    <li className="relative list-none">
      <button
        onClick={onClick}
        className={`group relative block px-3 py-5 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors duration-200 ${isActive ? "text-[#D6B97A]" : "text-[#F3EFE6] hover:text-[#D6B97A]"}`}
      >
        {item.name}
        {isActive && (
          <motion.span
            layoutId="desktop-nav-underline"
            className="absolute inset-x-3 bottom-0 h-px bg-[#D6B97A]"
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
          />
        )}
        {!isActive && (
          <span className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-[#D6B97A] transition-transform duration-300 group-hover:scale-x-100" />
        )}
      </button>
    </li>
  );
}
