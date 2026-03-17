import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Homepage Components
import IntroHero from "./components/IntroHero";
import MainHero from "./components/MainHero";
import StripReveal from "./components/StripReveal";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ExpertiseSection from "./components/ExpertiseSection";
import EditorialSection from "./components/EditorialSection";
import Footer from "./components/Footer";
import SelectedWorks from "./components/SelectedWorks";
import TheArsenal from "./components/TheArsenal";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

// Pages
import BlogListing from "./pages/BlogListing";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import Now from "./pages/Now";

/* ===============================
   SYSTEM UTILITY: SCROLL RESET
================================ */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant hard reset to top coordinates on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // 'instant' prevents smooth scrolling weirdness on mount
    });
  },[pathname]);

  return null;
}

/* ===============================
   HOME PAGE (LOGIC)
================================ */
function HomePage() {
  // 1. Check Session Storage immediately
  const[phase, setPhase] = useState<"intro" | "reveal" | "main">(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    return hasVisited ? "main" : "intro";
  });

  // 2. Lock scroll ONLY if we are actually in intro
  useEffect(() => {
    if (phase === "intro") {
      document.body.style.overflow = "hidden";
      
      // Auto-advance intro after 4.5s
      const timer = setTimeout(() => {
        setPhase("reveal");
      }, 4500);
      return () => clearTimeout(timer);
    } else {
      // If skipping intro, ensure scroll is unlocked
      document.body.style.overflow = "unset";
      document.body.style.cursor = "none"; // Keep 'none' if using CustomCursor
    }
  }, [phase]);

  // 3. Mark as visited when revealing is done
  const handleRevealComplete = () => {
    setPhase("main");
    sessionStorage.setItem("hasVisited", "true");
    document.body.style.overflow = "unset";
    document.body.style.cursor = "none"; 
  };

  return (
    <main className="relative w-full min-h-screen bg-[#0B0B0C] text-[#F3EFE6] selection:bg-[#F3EFE6] selection:text-[#0B0B0C]">
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="fixed inset-0 z-[100] opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="globalNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoise)" />
        </svg>
      </div>

      {/* PHASE 1: INTRO */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0B0C]"
          >
            <IntroHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: REVEAL */}
      <AnimatePresence>
        {phase === "reveal" && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <StripReveal onComplete={handleRevealComplete} />
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="relative z-0 flex flex-col">
        
        {/* Navbar: Fade in logic */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={phase === "main" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          <Navbar />
        </motion.div>

        <div className="relative z-10 bg-[#0B0B0C]">
          <MainHero />
          <AboutSection />
          <ExpertiseSection />
          <SelectedWorks />
          <TheArsenal />
          <EditorialSection />
          <Contact />
          <Footer />
        </div>

      </div>
    </main>
  );
}

/* ===============================
   ROOT APP WRAPPER
================================ */
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/blog", "/projects"];
const shouldHideNavbar = hideNavbarRoutes.some(route =>
  location.pathname.startsWith(route)
);

  return (
    <>
    <ScrollToTop />
      {/* If NOT home, show Navbar immediately */}
      {!shouldHideNavbar && location.pathname !== "/" && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
           <Navbar />
        </div>
      )}
      {children}
      <CustomCursor />
    </>
  );
}

export default function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/now" element={<Now />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
  );
}