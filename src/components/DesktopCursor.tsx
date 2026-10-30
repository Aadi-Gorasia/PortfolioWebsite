import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DesktopCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 500, damping: 38, mass: 0.35 });
  const ringY = useSpring(pointerY, { stiffness: 500, damping: 38, mass: 0.35 });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!mediaQuery.matches) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-active");

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setIsVisible(true);
      const target = event.target;
      setIsInteractive(
        target instanceof Element &&
          target.closest("a, button, [role='button'], input, textarea, select") !== null
      );
    };
    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[120] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      style={{ left: ringX, top: ringY }}
      animate={{
        width: isInteractive ? 54 : 32,
        height: isInteractive ? 54 : 32,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="absolute inset-0 block border border-[#D6B97A] mix-blend-difference" />
      <motion.span
        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#D6B97A] mix-blend-difference"
        animate={{ scale: isInteractive ? 0.65 : 1 }}
      />
    </motion.div>
  );
}
