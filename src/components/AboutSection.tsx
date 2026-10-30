import { useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHILOSOPHY = [
  {
    title: "Design",
    desc: "I map the logic in Figma to enforce structural integrity. I define the pixels early so the hardware doesn't have to guess during implementation.",
    tag: "01"
  },
  {
    title: "Build",
    desc: "The transition from abstract logic to a lit screen. This is where the system either functions as intended or the battery smokes.",
    tag: "02"
  },
  {
    title: "Research",
    desc: "Identifying the 'scut work' early. Sifting through documentation to find the one character or the one frayed wire that threatens the build.",
    tag: "03"
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="portfolio-section relative bg-[#F1ECE2] min-h-screen flex items-center py-20 md:py-32 px-5 sm:px-6 md:px-16 overflow-hidden"
    >
      <div className="hidden md:grid max-w-7xl mx-auto w-full md:grid-cols-12 gap-16 items-start z-10">
        
        {/* Left Column: Narrative */}
        <div className="md:col-span-7 space-y-8 md:space-y-12">
            <RevealTitle />
            
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            >
                <p className="text-lg sm:text-xl md:text-2xl font-light text-[#1A1A1A] leading-relaxed max-w-2xl">
                    Building systems is a habit born from an inability to accept 
<span className="font-medium italic"> surface-level answers</span>.
                     My process started with the scent of burnt rosin in a cramped living room, and a refusal to let a circuit board stay dead.
                    <br /><br />
                    I use mathematics as the blueprint and duct tape as the reality. I’m not looking for perfection; I’m looking for the moment the system actually pulses.
                </p>
            </motion.div>

            <div className="md:hidden w-full aspect-[4/3] overflow-hidden border border-[#1A1A1A]/15">
              <img
                src="/aboutPhoto.jpeg"
                alt="Aadi working on engineering projects"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[75%_center]"
              />
            </div>

            {/* Interactive List */}
            <div className="pt-10 border-t border-[#1A1A1A]/10">
                {PHILOSOPHY.map((item, i) => (
                    <ListItem key={i} item={item} desktop />
                ))}
            </div>
        </div>

        {/* Right Column: Visual Insight */}
        <div className="md:col-span-5 relative h-[600px] w-full hidden md:block">
            {/* The Image Container with Masking */}
            <div className="overflow-hidden h-full w-full relative">
                <motion.div style={{ y: portraitY }} className="absolute left-1/2 -translate-x-1/2 h-[120%] w-[70%] -top-[10%]">
                   <img 
  src="/aboutPhoto.jpeg" 
  alt="Portrait of Aadi Gorasia"
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover object-[75%_center] contrast-[1] brightness-[1.1]"
/>
                </motion.div>
                
                {/* Technical Overlay */}
                <div className="absolute inset-0 border-[1px] border-[#1A1A1A]/10 m-4 pointer-events-none">
                    <div className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase font-mono text-[#1A1A1A]">
                        Portrait of Aadi Gorasia
                    </div>

                </div>
            </div>
        </div>

      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl space-y-7 md:hidden">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#1A1A1A]/50">
          <span>About</span>
          <span>Pune, India</span>
        </div>

        <h2 className="font-display text-[clamp(2.6rem,12vw,4rem)] font-semibold leading-[0.93] tracking-[-0.07em] text-[#1A1A1A]">
          Working toward
          <span className="mt-1 block font-serif text-[1.12em] font-medium italic tracking-[-0.04em] text-[#A7823D]">the blue LED.</span>
        </h2>

        <div className="relative aspect-[1.15] overflow-hidden bg-[#D8D0C2]">
          <img
            src="/aboutPhoto.jpeg"
            alt="Aadi working on engineering projects"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[72%_center]"
          />
        </div>

        <p className="text-[15px] leading-7 text-[#1A1A1A]/75">
          I build from first principles: mathematics as the blueprint, real hardware as the test. I’m drawn to the moment an idea starts working in the physical world.
        </p>

        <div className="border-t border-[#1A1A1A]/15">
          {PHILOSOPHY.map((item) => (
            <ListItem key={item.tag} item={item} />
          ))}
        </div>
      </div>

    </section>
  );
}

function RevealTitle() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.h2
                initial={{ y: "105%" }}
                animate={isInView ? { y: 0 } : { y: "105%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-semibold text-[#1A1A1A] tracking-tight leading-[1.1]"
            >
                Working towards <br />
                the <span className="text-[#888] italic serif">blue LED.</span>
            </motion.h2>
        </div>
    )
}

function ListItem({ item, desktop = false }: { item: { title: string, desc: string, tag: string }, desktop?: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial="rest"
            whileHover={desktop ? "hover" : undefined}
            className="group border-b border-[#1A1A1A]/10 py-4 md:py-8"
        >
            <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((expanded) => !expanded)}
                className="flex min-h-12 w-full items-center justify-between text-left"
            >
                <div className="flex items-baseline gap-6">
                    <span className="text-[10px] font-mono text-[#1A1A1A]/40">{item.tag}</span>
                    <motion.span
                        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                        transition={{ duration: 0.25 }}
                        className="text-xl md:text-3xl font-medium text-[#1A1A1A]"
                    >
                        {item.title}
                    </motion.span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">
                  {isExpanded ? "−" : "+"}
                </span>
            </button>
            <motion.div
                initial={false}
                animate={isExpanded ? "open" : "closed"}
                variants={{ closed: { height: 0, opacity: 0 }, open: { height: "auto", opacity: 1 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
            >
                <p className="pt-4 text-[#1A1A1A]/70 text-base sm:text-lg max-w-md ml-10">
                    {item.desc}
                </p>
            </motion.div>
        </motion.div>
    );
}