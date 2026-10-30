import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";

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
function HomePage() {
  return (
    <main className="relative w-full min-h-screen bg-[#0B0B0C] pb-24 md:pb-0 text-[#F3EFE6] selection:bg-[#F3EFE6] selection:text-[#0B0B0C]">
      <div className="relative z-0 flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <Navbar />
        </div>

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