import { useState } from "react";

const EXPERTISE = [
  {
    id: 0,
    title: "Catabolic Process",
    category: "Dynamic Control",
    mobileSrc: "/teslaturbine.png",
  },
  {
    id: 1,
    title: "Aerospace Systems",
    category: "Hardware Integration",
    mobileSrc: "/plen.png",
  },
  {
    id: 2,
    title: "Machine Learning",
    category: "Neural Architectures",
    mobileSrc: "/gesturecontrolcar.png",
  },
  {
    id: 3,
    title: "Navigational Algorithms",
    category: "Path Planning",
    mobileSrc: "/a*pathfindingalgorithm.png",
  },
  {
    id: 4,
    title: "Systems Knowledge",
    category: "Full Stack Development",
    mobileSrc: "/ProjectsSection.png",
  },
];

export default function ExpertiseSection() {
  const [selectedMobileIndex, setSelectedMobileIndex] = useState(0);

  return (
    <section id="work" className="portfolio-section bg-[#0B0B0C] py-14 md:py-32 px-5 sm:px-8 md:px-16">
      <div className="relative z-10 mx-auto w-full max-w-xl md:hidden">
        <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D6B97A]">What I work on</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em] text-[#F3EFE6]">Areas of work</h2>
          </div>
        </div>

        {(() => {
          const selected = selectedMobileIndex;
          const item = EXPERTISE[selected];
          return (
            <div className="relative aspect-[0.92] overflow-hidden border-y border-white/10 bg-[#181817]">
              <img src={item.mobileSrc} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover grayscale opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/10 to-black/10" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#D6B97A]">{item.category}</p>
                <h3 className="mt-2 max-w-[16ch] font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-white">{item.title}</h3>
              </div>
            </div>
          );
        })()}

        <div className="mt-5 grid grid-cols-1">
          {EXPERTISE.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedMobileIndex(index)}
              aria-pressed={selectedMobileIndex === index}
              className={`min-h-11 border-b text-left font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${selectedMobileIndex === index ? "border-[#D6B97A] text-[#D6B97A]" : "border-white/10 text-white/55"}`}
            >
              <span className="flex items-center justify-between gap-4 py-3">
                <span>{item.title}</span>
                <span>{item.category}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 hidden max-w-7xl mx-auto w-full md:block">
        <div className="mb-10 md:mb-16 flex items-end justify-between border-b border-[#F3EFE6]/10 pb-4">
          <h2 className="text-[#F3EFE6]/60 text-sm font-mono tracking-widest uppercase">Areas of work</h2>
        </div>
        <div className="grid grid-cols-1">
          {EXPERTISE.map((item, index) => (
            <div key={item.id} className="grid grid-cols-[4rem_1fr_18rem] items-baseline gap-6 border-b border-[#F3EFE6]/10 py-6 lg:py-8">
              <span className="font-mono text-sm text-[#F3EFE6]/40">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-none tracking-tighter text-[#F3EFE6]">{item.title}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#F3EFE6]/55">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}