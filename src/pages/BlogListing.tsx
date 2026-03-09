import { useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Command, ArrowLeft, Terminal } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-utils";

export default function BlogListing() {
  const allPosts = useMemo(() => getBlogPosts(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFocused, setIsFocused] = useState(false);

  // Scroll Progress (The Fuel Line)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Extract Categories
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allPosts.map((p) => p.category)))],
    [allPosts]
  );

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#050505] relative overflow-hidden">
      
      {/* 1. PROGRESS LINE (The Fuel) */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#D6B97A] origin-left z-50 mix-blend-difference" style={{ scaleX }} />

      {/* 2. BACK TO HOME (The Magnetic Return) */}
      <Link to="/" className="fixed top-8 left-8 z-40 group mix-blend-difference">
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

      {/* 3. Global Noise (Atmosphere) */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 pt-48 pb-24">
        
        {/* --- HEADER (Loud & Bold) --- */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b border-[#F3EFE6]/10 pb-12">
            <div className="lg:col-span-9">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse" />
                    <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em]">
                        System Archive
                    </span>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-[#F3EFE6] uppercase">
                    Engineering <br />
                    <span className="text-[#F3EFE6]/20">Logs</span>
                </h1>
            </div>
            
            <div className="lg:col-span-3 text-right hidden lg:block">
                <p className="font-mono text-xs text-[#F3EFE6]/40 uppercase tracking-widest mb-2">Database Status</p>
                <p className="text-[#D6B97A] font-mono text-xl">ONLINE_READ_WRITE</p>
            </div>
        </div>

        {/* --- CONTROL PANEL (Search & Filter) --- */}
        <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-[#F3EFE6]/10 mb-24 py-6 -mx-6 px-6 md:-mx-12 md:px-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                
                {/* Search Input (The Terminal) */}
                <div className={`relative group transition-all duration-300 w-full lg:w-1/3`}>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#D6B97A]">
                        <Command size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="SEARCH_DATABASE..."
                        value={searchQuery}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-2 pl-10 pr-4 text-[#F3EFE6] font-mono text-sm placeholder:text-[#F3EFE6]/20 focus:outline-none focus:border-[#D6B97A] transition-colors uppercase"
                    />
                    {/* Blinking Cursor */}
                    {isFocused && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#D6B97A] animate-pulse" />
                    )}
                </div>

                {/* Category Tabs (The Frequency Bands) */}
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="relative pb-1 text-sm font-mono uppercase tracking-widest transition-colors"
                        >
                            <span className={`${selectedCategory === cat ? "text-[#F3EFE6]" : "text-[#F3EFE6]/40 hover:text-[#F3EFE6]/70"}`}>
                                {cat}
                            </span>
                            
                            {/* The Active Line (Liquid Motion) */}
                            {selectedCategory === cat && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D6B97A]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* --- THE GRID (Dossier Files) --- */}
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24"
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <DossierCard key={post.slug} post={post} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE (System Void) --- */}
        {filteredPosts.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center border border-dashed border-[#F3EFE6]/10 rounded-lg opacity-50">
            <Terminal size={48} className="text-[#D6B97A] mb-6" />
            <p className="text-[#F3EFE6] font-mono uppercase tracking-widest text-lg">
                NO_MATCHING_RECORDS
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: The "Dossier" Card ---
function DossierCard({ post, index }: { post: any, index: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col h-full"
        >
            <Link to={`/blog/${post.slug}`} className="block h-full">
                {/* 1. Image Window */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111] mb-8 border border-[#F3EFE6]/10 group-hover:border-[#D6B97A] transition-colors duration-500">
                    {/* The Scanline Overlay */}
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
                    
                    {/* The Image */}
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                    )}

                    {/* Corner Markers (Technical Viewport) */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#D6B97A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#D6B97A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#D6B97A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#D6B97A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                        <div className="bg-[#D6B97A] text-[#000] px-6 py-3 text-sm font-mono uppercase tracking-widest font-bold">
                            Access_File
                        </div>
                    </div>
                </div>

                {/* 2. Data Block */}
                <div className="flex flex-col flex-grow border-l border-[#F3EFE6]/10 pl-8 transition-all duration-300 group-hover:border-[#D6B97A]">
                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-[#F3EFE6]/40 text-xs font-mono uppercase tracking-widest mb-4">
                        <span className="text-[#D6B97A]">{post.category}</span>
                        <span>//</span>
                        <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl text-[#F3EFE6] font-bold leading-[1] mb-6 group-hover:text-[#D6B97A] transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                        {post.description}
                    </p>
                    
                    {/* Read Tech */}
                    <div className="mt-auto flex items-center gap-2 text-[#F3EFE6]/30 group-hover:text-[#F3EFE6] transition-colors text-xs font-mono uppercase tracking-widest">
                        <span>Read_Time: {post.readingTime}</span>
                        <ArrowUpRight size={14} />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}