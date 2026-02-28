import { lazy, Suspense, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Hash } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-utils";

// Keep your existing glob import logic
const mdxModules = import.meta.glob("../content/blog/*.mdx");

export default function BlogPost() {
  const { slug } = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fetch post data
  const posts = useMemo(() => getBlogPosts(), []);
  const post = posts.find((p) => p.slug === slug);

  // Lazy load MDX
  const Content = useMemo(() => {
    if (!slug) return null;
    const path = `../content/blog/${slug}.mdx`;
    const importer = mdxModules[path];
    return importer ? lazy(importer as any) : null;
  }, [slug]);

  if (!post) {
    return (
        <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center text-[#F3EFE6] font-mono">
            ERR::404_DATA_NOT_FOUND
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#0B0B0C]">
      
      {/* 1. Global Noise Overlay (Cinematic Grain) */}
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      {/* 2. Reading Progress Bar (The Fuel Line) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#F3EFE6]/10 z-50">
        <motion.div
            className="h-full bg-[#D6B97A] origin-left"
            style={{ scaleX }}
        />
      </div>

      <article className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-32 pb-24 px-6 md:px-12">
        
        {/* --- LEFT COLUMN: METADATA HUD --- */}
        <aside className="lg:col-span-3 lg:h-[calc(100vh-8rem)] lg:sticky lg:top-32 flex flex-col justify-between">
            <div className="space-y-8">
                {/* Back Link */}
                <Link
                    to="/blog"
                    className="group inline-flex items-center gap-3 text-[#F3EFE6]/50 hover:text-[#D6B97A] transition-colors"
                >
                    <div className="p-2 border border-[#F3EFE6]/20 rounded-full group-hover:border-[#D6B97A] transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest">Index</span>
                </Link>

                {/* Meta Grid */}
                <div className="space-y-6 pt-8 border-t border-[#F3EFE6]/10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest">
                            <Calendar size={12} />
                            <span>Date Logged</span>
                        </div>
                        <p className="font-mono text-sm text-[#F3EFE6]">{post.date}</p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest">
                            <Clock size={12} />
                            <span>Est. Duration</span>
                        </div>
                        <p className="font-mono text-sm text-[#F3EFE6]">{post.readingTime}</p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest">
                            <Hash size={12} />
                            <span>Category</span>
                        </div>
                        <p className="font-mono text-sm text-[#D6B97A]">{post.category}</p>
                    </div>
                </div>
            </div>

            {/* Share / Status (Bottom of Sidebar) */}
            <div className="hidden lg:block space-y-4">
                 <div className="h-[1px] w-full bg-[#F3EFE6]/10" />
                 <div className="flex items-center justify-between text-[#F3EFE6]/30 text-[10px] uppercase font-mono tracking-widest">
                    <span>Doc_ID: {slug?.substring(0,100).toUpperCase()}</span>
                    <Share2 size={14} className="hover:text-[#F3EFE6] cursor-pointer transition-colors" />
                 </div>
            </div>
        </aside>


        {/* --- CENTER COLUMN: THE NARRATIVE --- */}
        <div className="lg:col-span-8 lg:col-start-4">
            
            {/* Header */}
            <header className="mb-16 space-y-8">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F3EFE6] leading-[1.05]"
                >
                    {post.title}
                </motion.h1>

                {/* Featured Image with "Scan" Overlay */}
                {post.coverImage && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative aspect-video w-full overflow-hidden rounded-sm border border-[#F3EFE6]/10 group"
                    >
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#F3EFE6] px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 uppercase tracking-widest">
                            Fig. 1.0 — Visual Data
                        </div>
                    </motion.div>
                )}
            </header>

            {/* The Content */}
            <div className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-medium prose-headings:text-[#F3EFE6] prose-headings:tracking-tight
                prose-p:text-[#BEB6A8] prose-p:font-light prose-p:leading-relaxed
                prose-strong:text-[#F3EFE6] prose-strong:font-semibold
                prose-a:text-[#D6B97A] prose-a:no-underline prose-a:border-b prose-a:border-[#D6B97A]/30 hover:prose-a:border-[#D6B97A] hover:prose-a:text-[#D6B97A] 
                prose-blockquote:border-l-[#D6B97A] prose-blockquote:text-[#F3EFE6] prose-blockquote:italic
                prose-code:text-[#D6B97A] prose-code:bg-[#1A1A1A] prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10
                prose-img:rounded-lg prose-img:grayscale prose-img:border prose-img:border-white/10
                mb-24
            ">
                {Content && (
                    <Suspense fallback={<LoadingState />}>
                        <Content />
                    </Suspense>
                )}
            </div>

            {/* Footer Tags */}
            <footer className="border-t border-[#F3EFE6]/10 pt-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <span className="font-mono text-xs text-[#F3EFE6]/40 uppercase tracking-widest">
                        // Keywords
                    </span>
                    <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-[#F3EFE6]/5 border border-[#F3EFE6]/10 text-[#BEB6A8] text-xs font-mono rounded-full hover:bg-[#F3EFE6] hover:text-[#0B0B0C] transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
      </article>
    </div>
  );
}

// Skeleton Loader with "Scanning" animation
function LoadingState() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-4 bg-[#F3EFE6]/10 rounded w-3/4"></div>
            <div className="h-4 bg-[#F3EFE6]/10 rounded w-full"></div>
            <div className="h-4 bg-[#F3EFE6]/10 rounded w-5/6"></div>
            <div className="h-32 bg-[#F3EFE6]/5 rounded w-full border border-white/5 my-8"></div>
            <div className="h-4 bg-[#F3EFE6]/10 rounded w-full"></div>
        </div>
    )
}