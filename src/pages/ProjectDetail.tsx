import { lazy, Suspense, useMemo, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ShieldAlert, Hash } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-utils";

// MDX modules
const mdxModules = import.meta.glob("../content/blog/*.mdx");

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });


  // Get posts safely
  const posts = useMemo(() => getBlogPosts(), []);
  const post = useMemo(
    () => posts.find((p) => p.slug === slug),
    [posts, slug]
  );

  // Lazy load MDX safely
  const Content = useMemo(() => {
    if (!slug) return null;

    const path = `../content/blog/${slug}.mdx`;
    const importer = mdxModules[path];

    if (!importer) return null;

    return lazy(importer as () => Promise<{ default: React.ComponentType }>);
  }, [slug]);

  // Simulated boot
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 🚨 HARD GUARDS — NO CRASHES EVER
  if (!slug) return <Navigate to="/blog" replace />;

  if (!post) return <Navigate to="*" replace />;

  if (!Content) return <Navigate to="*" replace />;

  if (!isLoaded) return <BiosLoader />;

  return (
    <div className="min-h-screen bg-[#030303] text-[#EAEAEA] overflow-x-hidden">

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#222] z-50">
        <motion.div
          className="h-full bg-[#D6B97A] origin-left"
          style={{ scaleX }}
        />
      </div>

      <Link to="/blog" className="fixed top-8 left-6 z-40 group">
        <div className="flex items-center gap-2 text-[#D6B97A]">
          <ArrowLeft size={14} />
          <span className="font-mono text-xs uppercase">Back</span>
        </div>
      </Link>

      <article className="relative z-10">

        {/* HERO */}
        <header className="min-h-[60vh] flex flex-col justify-end pb-24 px-6 border-b border-[#333]">
          <div className="max-w-6xl mx-auto w-full">

            <div className="flex items-center gap-4 mb-6 border-l-2 border-[#D6B97A] pl-4">
              <ShieldAlert className="text-[#D6B97A]" size={18} />
              <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-widest">
                Restricted Access
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight">
              {post.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-6 border-t border-[#333]">
              <MetaBlock label="Date" value={post.date} />
              <MetaBlock label="Category" value={post.category} />
              <MetaBlock label="Read Time" value={post.readingTime} />
              <MetaBlock label="Encryption" value="AES-256" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto py-24 px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <Suspense fallback={<div className="h-40 animate-pulse bg-[#111]" />}>
              <Content />
            </Suspense>
          </div>

          <div className="mt-24 pt-12 border-t border-[#333] flex justify-between items-end">
            <Hash className="text-[#D6B97A]" size={20} />
            <span className="font-mono text-xs text-[#555] uppercase">
              End of Record
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ================= SUBCOMPONENTS ================= */

function BiosLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center font-mono text-sm text-[#D6B97A]">
      INITIALIZING SECURE ARCHIVE...
    </div>
  );
}

function MetaBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[#555] font-mono text-[10px] uppercase tracking-widest">
        {label}
      </span>
      <span className="text-[#EAEAEA] font-mono text-sm uppercase">
        {value}
      </span>
    </div>
  );
}