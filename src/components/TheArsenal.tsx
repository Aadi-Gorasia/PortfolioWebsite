import { motion } from "framer-motion";

const STACK = [
  { category: "Core", items: ["TypeScript", "Rust", "Python", "C++"] },
  { category: "Frameworks", items: ["Next.js", "React Native", "PyTorch", "TensorFlow"] },
  { category: "Infrastructure", items: ["Docker", "Kubernetes", "AWS Lambda", "Terraform"] },
  { category: "Design", items: ["Figma", "Blender", "WebGL", "GLSL"] },
];

export default function TheArsenal() {
  return (
    <section className="bg-[#0E0E0E] py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 md:gap-0">
        
        {/* Title */}
        <div className="col-span-1">
            <h3 className="text-[#F3EFE6]/40 font-mono text-xs uppercase tracking-[0.2em] mb-4">
                // System Inventory
            </h3>
            <div className="w-8 h-[1px] bg-[#D6B97A]" />
        </div>

        {/* The Grid */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STACK.map((group, i) => (
                <div key={i} className="space-y-6">
                    <h4 className="text-[#F3EFE6] font-medium text-lg border-b border-white/10 pb-2 inline-block pr-8">
                        {group.category}
                    </h4>
                    <ul className="space-y-3">
                        {group.items.map((tech, j) => (
                            <motion.li 
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: (i * 0.1) + (j * 0.05) }}
                                viewport={{ once: true }}
                                className="text-[#BEB6A8] font-mono text-sm hover:text-[#D6B97A] cursor-crosshair transition-colors"
                            >
                                {tech}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}