import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Command } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-utils";

export default function BlogListing() {
  const allPosts = useMemo(() => getBlogPosts(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="min-h-screen bg-[#0B0B0C] pt-32 pb-24 px-6 md:px-12 selection:bg-[#D6B97A] selection:text-[#0B0B0C] relative overflow-hidden">
      
      {/* 1. Global Noise (Atmosphere) */}
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-20 space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse" />
                <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em]">
                    System Archive
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-semibold text-[#F3EFE6] tracking-tight leading-[0.95]">
                Engineering <br />
                <span className="text-[#F3EFE6]/20">Logs & Transmissions</span>
            </h1>
        </div>

        {/* --- CONTROL PANEL (Search & Filter) --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-24 border-b border-[#F3EFE6]/10 pb-8">
            
            {/* Search Input (The Terminal) */}
            <div className={`relative group transition-all duration-300 w-full lg:w-1/3 ${isFocused ? "opacity-100" : "opacity-60"}`}>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#D6B97A]">
                    <Command size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search database..."
                    value={searchQuery}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-4 pl-10 pr-4 text-[#F3EFE6] font-mono text-sm placeholder:text-[#F3EFE6]/20 focus:outline-none focus:border-[#D6B97A] transition-colors"
                />
                {/* Blinking Cursor Decoration */}
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
                        className="relative pb-2 text-sm uppercase tracking-widest transition-colors"
                    >
                        <span className={`${selectedCategory === cat ? "text-[#F3EFE6]" : "text-[#F3EFE6]/40 hover:text-[#F3EFE6]/70"}`}>
                            {cat}
                        </span>
                        
                        {/* The Active Line (Liquid Motion) */}
                        {selectedCategory === cat && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D6B97A]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* --- THE GRID (Dossier Files) --- */}
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <DossierCard key={post.slug} post={post} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE (System Void) --- */}
        {filteredPosts.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center border border-dashed border-[#F3EFE6]/10 rounded-lg">
            <span className="text-[#D6B97A] font-mono text-4xl mb-4">404</span>
            <p className="text-[#F3EFE6]/40 font-mono uppercase tracking-widest text-sm">
                Query returned no results.
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative flex flex-col h-full"
        >
            <Link to={`/blog/${post.slug}`} className="block h-full">
                {/* 1. Image Window */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#F3EFE6]/10 mb-8 bg-[#111]">
                    {/* The Scanline Overlay */}
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />
                    
                    {/* The Image */}
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                    )}

                    {/* Corner Markers */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-[#F3EFE6]/50" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-[#F3EFE6]/50" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-[#F3EFE6]/50" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-[#F3EFE6]/50" />
                    
                    {/* Hover Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#D6B97A] text-[#0B0B0C] px-4 py-2 text-xs font-mono uppercase tracking-widest font-bold">
                            Access File
                        </div>
                    </div>
                </div>

                {/* 2. Data Block */}
                <div className="flex flex-col flex-grow border-l border-[#F3EFE6]/10 pl-6 transition-all duration-300 group-hover:border-[#D6B97A]">
                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-[#F3EFE6]/40 text-[10px] font-mono uppercase tracking-widest mb-4">
                        <span className="text-[#D6B97A]">{post.category}</span>
                        <span>//</span>
                        <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl text-[#F3EFE6] font-medium leading-tight mb-4 group-hover:text-[#D6B97A] transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#BEB6A8]/70 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.description}
                    </p>
                    
                    {/* Read Tech */}
                    <div className="mt-auto flex items-center gap-2 text-[#F3EFE6]/30 group-hover:text-[#F3EFE6] transition-colors text-xs font-mono uppercase tracking-widest">
                        <span>Read_Time: {post.readingTime}</span>
                        <ArrowUpRight size={12} />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}