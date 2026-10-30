import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-7 top-1/2 z-40 hidden h-28 w-px -translate-y-1/2 bg-[#F3EFE6]/15 lg:block"
    >
      <motion.div
        className="h-full w-full origin-top bg-[#D6B97A]"
        style={{ scaleY }}
      />
    </div>
  );
}
