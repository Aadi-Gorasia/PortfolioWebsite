const STACK = [
  { category: "Core", items: ["Python", "Rust", "JavaScript", "HTML"] },
  { category: "Frameworks", items: ["Next.js", "React Native", "Django", "Vite"] },
  { category: "Infrastructure", items: ["Vercel", "GitHub", "Gemini Code CLI", "MongoDB Atlas"] },
  { category: "Design", items: ["Figma", "Blender", "DaVinci Resolve", "SolidWorks"] },
];

export default function TheArsenal() {
  return (
    <section className="portfolio-section border-t border-white/10 bg-[#0E0E0E] px-5 py-14 sm:px-8 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 border-b border-white/10 pb-4 md:mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#D6B97A]">Tools I use</p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-[#F3EFE6]">The toolkit</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
          {STACK.map((group) => (
            <section key={group.category} className="border-t border-white/15 pt-4">
              <h4 className="font-display text-xl font-medium text-white">{group.category}</h4>
              <ul className="mt-4 space-y-3">
                {group.items.map((tech) => (
                  <li key={tech} className="font-mono text-xs leading-5 text-[#BEB6A8] md:text-sm">{tech}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}