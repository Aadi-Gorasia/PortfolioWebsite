import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DeadpanAgent() {
  const [isLocked, setIsLocked] = useState(false); // Suspicious/Hovering
  const [isFiring, setIsFiring] = useState(false); // Clicking
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Professional-grade tracking: ultra-fast, zero lag, heavy feel.
  const springConfig = { stiffness: 1200, damping: 50, mass: 0.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    // KILL the default cursor everywhere (navbars, buttons, etc.)
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      nav, button, a, [role="button"] { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleDown = () => setIsFiring(true);
    const handleUp = () => setIsFiring(false);

    const handleHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      // The Agent "Locks On" to interactive elements
      const isTarget = el.closest("button, a, input, [role='button'], nav");
      setIsLocked(!!isTarget);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseover", handleHover);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [isVisible]);

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        // INVERSE COLOR: This makes it visible on white, black, or any color.
        mixBlendMode: "difference", 
      }}
      // Z-INDEX set to maximum to clear Navbars and Modals
      className="fixed top-0 left-0 z-100 pointer-events-none flex items-center justify-center"
    >
      {/* The Agent Reticle (Outer Square) */}
      <motion.div
        animate={{
          // Snaps shut when it detects a target
          width: isLocked ? 16 : 24,
          height: isLocked ? 16 : 24,
          borderWidth: isLocked ? 2 : 1,
          scale: isFiring ? 0.7 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35 
        }}
        className="border-white relative flex items-center justify-center"
      >
        {/* The '+' Centerpiece */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Vertical line */}
          <motion.div 
            animate={{ height: isLocked ? "120%" : "30%" }}
            className="absolute w-[1px] bg-white transition-all duration-200" 
          />
          {/* Horizontal line */}
          <motion.div 
            animate={{ width: isLocked ? "120%" : "30%" }}
            className="absolute h-[1px] bg-white transition-all duration-200" 
          />
        </div>

        {/* Tactical "Scanning" Corner accents - only visible when shadowing */}
        {!isLocked && (
            <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-[-4px] border border-white/20"
            />
        )}
      </motion.div>

      {/* Subtle Locked text for flavor (very small, very deadpan) */}
      <motion.span
        animate={{ opacity: isLocked ? 1 : 0, y: isLocked ? 15 : 10 }}
        className="absolute text-[8px] font-mono text-white uppercase tracking-widest"
      >
        LOCKED
      </motion.span>
    </motion.div>
  );
}