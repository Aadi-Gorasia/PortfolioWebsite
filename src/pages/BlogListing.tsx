import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getBlogPosts, type BlogPostMeta } from "@/lib/blog-utils";

export default function BlogListing() {
  const allPosts = useMemo(() => getBlogPosts(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    <div className="min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#050505] relative overflow-x-clip">
      <Link to="/" className="fixed left-5 top-[max(1rem,env(safe-area-inset-top))] z-40 flex min-h-12 items-center border-b border-white/20 bg-[#050505] font-mono text-[10px] uppercase tracking-widest text-white md:left-8">
        ← Home
      </Link>

      <div className="max-w-[1800px] mx-auto px-5 sm:px-6 md:px-12 relative z-10 pt-32 md:pt-48 pb-16 md:pb-24">
        
        <div className="mb-16 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end border-b border-[#F3EFE6]/10 pb-8 md:pb-12">
            <div className="lg:col-span-9">
                <p className="mb-6 text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em]">Writing</p>
                
                <h1 className="text-[clamp(3rem,13vw,6rem)] md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-[#F3EFE6]">Writing</h1>
            </div>
            
        </div>

        <div className="border-b border-[#F3EFE6]/10 mb-14 md:mb-24 py-4 md:py-6">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:items-center justify-between">
                <div className="w-full lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Search writing..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search writing"
                        className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-3 text-[#F3EFE6] text-base md:text-sm placeholder:text-[#F3EFE6]/40 focus:outline-none focus:border-[#D6B97A] transition-colors"
                    />
                </div>

                <div className="flex max-w-full overflow-x-auto lg:overflow-visible lg:flex-wrap gap-x-6 md:gap-x-8 gap-y-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="relative min-h-11 shrink-0 pb-1 text-xs sm:text-sm font-mono uppercase tracking-widest transition-colors"
                        >
                            <span className={`${selectedCategory === cat ? "text-[#F3EFE6]" : "text-[#F3EFE6]/40 hover:text-[#F3EFE6]/70"}`}>
                                {cat}
                            </span>
                            
                            {selectedCategory === cat && (
                                <motion.span
                                  layoutId="writing-category-underline"
                                  aria-hidden="true"
                                  className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D6B97A]"
                                  transition={{ type: "spring", stiffness: 340, damping: 32 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="hidden grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-24">
            {filteredPosts.map((post) => <DossierCard key={post.slug} post={post} />)}
        </div>

        <div className="space-y-4 md:hidden">
          {filteredPosts.map((post) => <MobileDossierCard key={post.slug} post={post} />)}
        </div>

        {filteredPosts.length === 0 && (
          <div className="border-t border-[#F3EFE6]/10 py-12">
            <p className="text-[#F3EFE6]/70">No posts match this search.</p>
          </div>
        )}

      </div>
    </div>
  );
}

function MobileDossierCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="border-t border-white/15 py-4">
      <Link to={`/blog/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="mb-4 aspect-[1.45] overflow-hidden">
            <img src={post.coverImage} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        )}
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-[#D6B97A]">{post.category}</p>
          <h2 className="mt-2 font-display text-[1.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white">{post.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/60">{post.description}</p>
          <span className="mt-4 block font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
            Read post <span aria-hidden="true" className="text-[#D6B97A]">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function DossierCard({ post }: { post: BlogPostMeta }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group flex h-full flex-col"
        >
            <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden border-y border-[#F3EFE6]/10">
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.035]"
                        />
                    )}
                </div>
                <div className="flex flex-grow flex-col border-t border-[#F3EFE6]/10 pt-4">
                    <p className="mb-3 text-[#D6B97A] text-xs font-mono uppercase tracking-widest">{post.category}</p>
                    <h3 className="mb-4 text-3xl font-bold leading-[1] text-[#F3EFE6] transition-colors group-hover:text-[#D6B97A] lg:text-4xl">
                        {post.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#A1A1AA]">
                        {post.description}
                    </p>
                    
                    <div className="mt-auto text-xs font-mono uppercase tracking-widest text-[#F3EFE6]/55">
                        Read post <span aria-hidden="true" className="text-[#D6B97A]">↗</span>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}