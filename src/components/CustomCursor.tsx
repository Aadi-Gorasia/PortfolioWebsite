import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // 1. Mouse Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Physics Configuration
  // "Stiff" enough to feel responsive, "Damped" enough to feel heavy/expensive.
  const springConfig = { stiffness: 1500, damping: 100, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // A. GLOBAL CSS: Kill the default cursor universally
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      body, html { cursor: none !important; }
    `;
    document.head.appendChild(style);

    // B. MOUSE LISTENERS
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    // C. HOVER DETECTION (The "Magnet")
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect anything clickable
      const isInteractive =
        target.closest("a, button, input, textarea, [role='button'], .cursor-hover") !== null;
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", checkHover);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mouseX, mouseY]);

  // D. MOBILE CHECK (Disable on touch devices)
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
     return null;
  }

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        // 3. THE MAGIC: INVERSE COLOR MODE
        mixBlendMode: "difference",
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
    >
      {/* 
         THE ENTITY 
         - Default: Small, solid white dot (12px)
         - Hover: Large, solid white circle (80px)
         - Click: Shrinks slightly (Recoil)
         
         Since mix-blend-mode is 'difference':
         - White Entity on Black BG = White Cursor
         - White Entity on White BG = Black Cursor
      */}
      <motion.div
        animate={{
          width: isHovered ? 30 : 20,
          height: isHovered ? 30 : 20,
          scale: isClicking ? 0.8 : 1,
          // Optional: Add a subtle blur on hover to make it feel like light
          // filter: isHovered ? "blur(1px)" : "blur(1px)", 
          border: "2px solid black", // Add a border for better visibility on light backgrounds
        }}
        transition={{
          type: "spring",
          stiffness: 350, // Snappy transformation
          damping: 25,
        }}
        className="bg-white rounded-full"
      />
      
      {/* OPTIONAL: Text Reveal inside the bubble when hovering
          Because of 'difference' mode, this text will invert AGAIN.
          Black Text on White Cursor on Black BG = Black Text.
      */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* We keep this empty for pure minimalism, or add an icon if you want */}
        </motion.div>
      )}

    </motion.div>
  );
}