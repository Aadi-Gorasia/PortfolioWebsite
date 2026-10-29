import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
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
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Now = lazy(() => import("./pages/Now"));

/* ===============================
   SYSTEM UTILITY: SCROLL RESET
================================ */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

/* ===============================
   HOME PAGE (LOGIC)
================================ */
function HomePage() {
  const [phase, setPhase] = useState<"intro" | "reveal" | "main">(() => {
    return sessionStorage.getItem("hasVisited") ? "main" : "intro";
  });

  useEffect(() => {
    if (phase === "intro") {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setPhase("reveal"), 4500);
      return () => clearTimeout(timer);
    }

    document.body.style.overflow = "unset";
    document.body.style.cursor = "auto";
  }, [phase]);

  const handleRevealComplete = () => {
    sessionStorage.setItem("hasVisited", "true");
    setPhase("main");
    document.body.style.overflow = "unset";
    document.body.style.cursor = "auto";
  };

  return (
    <main className="relative w-full min-h-screen bg-[#0B0B0C] text-[#F3EFE6] selection:bg-[#F3EFE6] selection:text-[#0B0B0C]">
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

      <AnimatePresence>
        {phase === "reveal" && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <StripReveal onComplete={handleRevealComplete} />
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-0 flex flex-col">
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
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ScrollToTop />
      {!shouldHideNavbar && location.pathname !== "/" && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <Navbar />
        </div>
      )}
      <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
        {children}
      </Suspense>
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