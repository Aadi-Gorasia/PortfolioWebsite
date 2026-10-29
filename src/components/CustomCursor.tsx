import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 1500, damping: 100, mass: 0.5 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pointer.matches || reducedMotion.matches) return;

    const style = document.createElement("style");
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      const target = event.target;
      setIsHovered(
        target instanceof Element &&
          target.closest("a, button, input, textarea, [role='button'], .cursor-hover") !== null
      );
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mouseX, mouseY]);

  if (
    typeof window === "undefined" ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
    >
      <motion.div
        animate={{
          width: isHovered ? 30 : 20,
          height: isHovered ? 30 : 20,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="rounded-full border-2 border-black bg-white"
      />
    </motion.div>
  );
}
