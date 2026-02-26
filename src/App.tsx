"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import IntroHero from "./components/IntroHero";
import MainHero from "./components/MainHero"; // "Engineering Adaptive Systems"
import StripReveal from "./components/StripReveal";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection"; // "Blueprint to Full Bloom"
import ExpertiseSection from "./components/ExpertiseSection"; // "Predatory Focus"
import EditorialSection from "./components/EditorialSection"; // (Placeholder/Existing)
import Footer from "./components/Footer";
import SelectedWorks from "./components/SelectedWorks"; // "Case Files 2022—2024"
import TheArsenal from "./components/TheArsenal"; // "The Arsenal"
import Contact from "./components/Contact"; // "Let's Connect"

export default function App() {
  const [phase, setPhase] = useState<"intro" | "reveal" | "main">("intro");

  // 1. Logic: Handle the timing of the Intro -> Reveal
  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setPhase("reveal");
    }, 4500); // Adjust based on IntroHero length

    return () => clearTimeout(timer);
  }, []);

  // 2. Logic: Unlock scroll when we hit the "main" phase
  useEffect(() => {
    if (phase === "main") {
      document.body.style.overflow = "unset";
      document.body.style.cursor = "default";
    }
  }, [phase]);

  return (
    <main className="relative w-full min-h-screen bg-[#0B0B0C] text-[#F3EFE6] selection:bg-[#F3EFE6] selection:text-[#0B0B0C]">
      
      {/* GLOBAL NOISE OVERLAY: Persists across all sections for cinematic continuity */}
      <div className="fixed inset-0 z-[100] opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='globalNoise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#globalNoise)' />
        </svg>
      </div>

      {/* --- PHASE 1: THE PRELOADER (High Z-Index) --- */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0 }} // Smooth fade out as strips take over
            className="fixed inset-0 z-50 bg-[#0B0B0C]"
          >
            <IntroHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PHASE 2: THE REVEAL (Transition Layer) --- */}
      {/* This sits on top of MainHero but below the Intro until Intro fades */}
      <AnimatePresence>
        {phase === "reveal" && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <StripReveal
              onComplete={() => {
                setPhase("main");
              }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* --- PHASE 3: THE MAIN CONTENT --- */}
      {/* MainHero is always rendered so it's ready to be revealed */}
      <div className="relative z-0 flex flex-col">
        
        {/* Navigation - Fades in only after reveal */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={phase === "main" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          <Navbar />
        </motion.div>

        {/* The Landing */}
        <div className="relative z-10 bg-[#0B0B0C]">
        <MainHero />

        {/* The Scrollable Narrative */}
        {/* We wrap this in a motion div to subtly slide it up or fade it in if desired, 
            or just keep it static for performance. */}
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