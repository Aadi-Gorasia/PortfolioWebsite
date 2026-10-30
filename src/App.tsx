import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";

// Homepage Components
import MainHero from "./components/MainHero";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ExpertiseSection from "./components/ExpertiseSection";
import EditorialSection from "./components/EditorialSection";
import Footer from "./components/Footer";
import SelectedWorks from "./components/SelectedWorks";
import TheArsenal from "./components/TheArsenal";
import Contact from "./components/Contact";
import DesktopCursor from "./components/DesktopCursor";
import DesktopIntro from "./components/DesktopIntro";
import ScrollProgress from "./components/ScrollProgress";

// Pages
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Now = lazy(() => import("./pages/Now"));
const LegalPage = lazy(() => import("./pages/LegalPage"));

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
let didShowDesktopIntro = false;

function HomePage() {
  const [showIntro, setShowIntro] = useState(() => {
    const isDesktop = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    ).matches;
    return isDesktop && !didShowDesktopIntro;
  });
  const finishIntro = useCallback(() => setShowIntro(false), []);

  useEffect(() => {
    if (!showIntro) return;

    didShowDesktopIntro = true;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [showIntro]);

  return (
    <main className="relative w-full min-h-screen bg-[#0B0B0C] pb-24 md:pb-0 text-[#F3EFE6] selection:bg-[#F3EFE6] selection:text-[#0B0B0C]">
      <AnimatePresence>
        {showIntro && <DesktopIntro onFinish={finishIntro} />}
      </AnimatePresence>

      <div className="relative z-0 flex flex-col">
        <Navbar />
        <ScrollProgress />
        <div className="relative z-10 bg-[#0B0B0C]">
          <MainHero startAnimations={!showIntro} />
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
      <DesktopCursor />
      {!shouldHideNavbar && location.pathname !== "/" && (
        <Navbar />
      )}
      <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
        {children}
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/now" element={<Now />} />
          <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
          <Route path="/terms-and-conditions" element={<LegalPage page="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </MotionConfig>
  );
}