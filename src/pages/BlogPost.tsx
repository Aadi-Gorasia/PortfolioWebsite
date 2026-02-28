import { lazy, Suspense, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Terminal } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-utils";

const mdxModules = import.meta.glob("../content/blog/*.mdx");

export default function BlogPost() {
  const { slug } = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const posts = useMemo(() => getBlogPosts(), []);
  const post = posts.find((p) => p.slug === slug);

  const Content = useMemo(() => {
    if (!slug) return null;
    const path = `../content/blog/${slug}.mdx`;
    const importer = mdxModules[path];
    return importer ? lazy(importer as any) : null;
  }, [slug]);

  if (!post) return <div className="h-screen flex items-center justify-center text-[#D6B97A] font-mono text-xl">404 :: DATA_CORRUPTED</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#000]">
      
      {/* 1. PROGRESS LINE (The Fuel) */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#D6B97A] origin-left z-50 mix-blend-difference" style={{ scaleX }} />

      {/* 2. BACK TO HOME (The Magnetic Return) */}
      <Link to="/blog" className="fixed top-8 left-8 z-40 group mix-blend-difference">
        <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-14 h-14 border border-[#F3EFE6] rounded-full overflow-hidden transition-all duration-500 group-hover:bg-[#F3EFE6]">
                <ArrowLeft className="w-6 h-6 text-[#F3EFE6] group-hover:text-[#000] transition-colors duration-300 relative z-10" />
            </div>
            <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F3EFE6]">Return</span>
                <span className="text-[10px] font-mono text-[#F3EFE6]/50">TO_BASE</span>
            </div>
        </div>
      </Link>

      {/* 3. HERO SECTION (Loud & Bold) */}
      <header className="relative pt-48 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-[#F3EFE6]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            {/* Title: Massive, Tight, Aggressive */}
            <div className="lg:col-span-9">
                <motion.h1 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-[#F3EFE6] uppercase"
                >
                    {post.title}
                </motion.h1>
            </div>

            {/* Meta Data: Technical & Monospace */}
            <div className="lg:col-span-3 flex flex-col gap-6 items-start lg:items-end text-right">
                <div className="flex items-center gap-3 text-[#D6B97A]">
                    <Terminal size={16} />
                    <span className="font-mono text-sm uppercase tracking-widest">Sys.Log_{post.date}</span>
                </div>
                <div className="h-[1px] w-full bg-[#F3EFE6]/20" />
                <div className="flex flex-col gap-1">
                    <span className="text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest">Reading Time</span>
                    <span className="text-xl font-medium">{post.readingTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                     <span className="text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest">Category</span>
                     <span className="text-xl font-medium">{post.category}</span>
                </div>
            </div>
        </div>
      </header>

      {/* 4. THE CONTENT (With Glitch Loader) */}
      <main className="relative max-w-[1000px] mx-auto px-6 md:px-12 py-24">
        {Content && (
            <Suspense fallback={<GlitchLoader />}>
                <div className="prose prose-invert prose-2xl max-w-none 
                    prose-p:text-[#A1A1AA] prose-p:font-light prose-p:leading-[1.8]
                    prose-headings:text-[#F3EFE6] prose-headings:font-bold prose-headings:tracking-tight
                    prose-a:text-[#D6B97A] prose-a:no-underline border-b border-[#D6B97A]/20 hover:border-[#D6B97A]
                    prose-img:grayscale prose-img:rounded-sm
                ">
                    <Content />
                </div>
            </Suspense>
        )}
      </main>

      {/* 5. FOOTER (Signature) */}
      <footer className="py-24 border-t border-[#F3EFE6]/10 text-center">
        <p className="text-[#F3EFE6]/20 font-mono text-sm uppercase tracking-[0.5em]">
            End of Transmission
        </p>
      </footer>
    </div>
  );
}

// --- THE "LOUD" GLITCH LOADER ---
// This mimics a terminal decrypting data line by line.
function GlitchLoader() {
    return (
        <div className="space-y-2 font-mono text-xs md:text-sm text-[#D6B97A] h-[60vh] flex flex-col justify-center opacity-70">
            <CodeLine delay={0} text="INITIALIZING_NEURAL_LINK..." />
            <CodeLine delay={0.2} text="> DECRYPTING_PACKETS [||||||||||] 100%" />
            <CodeLine delay={0.4} text="> ACCESSING_MEMORY_BLOCK_0X84..." />
            <CodeLine delay={0.6} text="> RENDERING_SEMANTIC_LAYER..." />
            <div className="mt-8 grid gap-4 opacity-50">
                <div className="h-4 bg-[#F3EFE6]/10 w-full animate-pulse" />
                <div className="h-4 bg-[#F3EFE6]/10 w-5/6 animate-pulse" />
                <div className="h-4 bg-[#F3EFE6]/10 w-full animate-pulse" />
                <div className="h-4 bg-[#F3EFE6]/10 w-4/6 animate-pulse" />
            </div>
        </div>
    )
}

function CodeLine({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center gap-2"
        >
            <span className="w-2 h-2 bg-[#D6B97A]" />
            {text}
        </motion.div>
    )
}