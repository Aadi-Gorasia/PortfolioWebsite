import { lazy, Suspense, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Command } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-utils";

// --- CUSTOM INTERACTIVE MDX COMPONENTS ---
// These make the content feel "alive"
const MDXComponents = {
  h2: (props: any) => (
    <motion.h2 
      initial={{ opacity: 0, x: -20 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }}
      className="text-4xl font-bold mt-16 mb-8 text-[#F3EFE6] border-l-4 border-[#D6B97A] pl-6 uppercase tracking-tighter" 
      {...props} 
    />
  ),
  p: (props: any) => <p className="text-xl leading-relaxed mb-8 text-[#A1A1AA] font-light" {...props} />,
  code: (props: any) => (
    <code className="bg-[#D6B97A]/10 text-[#D6B97A] px-2 py-1 rounded font-mono text-sm border border-[#D6B97A]/20" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="relative my-12 p-8 bg-[#111] border border-[#F3EFE6]/10 italic text-2xl text-[#F3EFE6] group">
      <div className="absolute top-0 left-0 w-2 h-full bg-[#D6B97A] group-hover:h-0 transition-all duration-500" />
      <span className="text-6xl absolute -top-4 -left-2 opacity-10 font-serif">"</span>
      {props.children}
    </blockquote>
  ),
  img: (props: any) => (
    <div className="my-12 overflow-hidden rounded-sm border border-[#F3EFE6]/10 group">
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full grayscale hover:grayscale-0 transition-all duration-700" 
        {...props} 
      />
    </div>
  ),
};

const mdxModules = import.meta.glob("../content/blog/*.mdx");

export default function BlogPost() {
  const { slug } = useParams();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);


  const posts = useMemo(() => getBlogPosts(), []);
  const post = posts.find((p) => p.slug === slug);

  const Content = useMemo(() => {
    if (!slug) return null;
    const path = `../content/blog/${slug}.mdx`;
    const importer = mdxModules[path];
    return importer ? lazy(importer as any) : null;
  }, [slug]);

  if (!post) return <div className="h-screen flex items-center justify-center text-[#D6B97A] font-mono text-xl animate-pulse">404 :: DATA_CORRUPTED</div>;

  return (

    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#000] overflow-x-hidden">
      <br />
      <br />
      <br />
      <br />
      {/* --- VISCERAL OVERLAYS --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      <div className="fixed inset-0 pointer-events-none z-[99] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />

      {/* --- HUD / NAVIGATION --- */}
      
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#D6B97A] origin-left z-[110]" style={{ scaleX }} />

      <nav className="fixed top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-12 z-[105] mix-blend-difference">
        <Link to="/blog" className="group flex items-center gap-4">
            <div className="p-2 border border-[#F3EFE6] rounded-full group-hover:bg-[#F3EFE6] group-hover:text-black transition-all">
                <ArrowLeft size={20} />
            </div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase hidden md:block">Exit_Protocol</span>
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex flex-col justify-center px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden">
        <motion.div style={{ y: titleY, opacity, filter: `blur(${blur}px)` }} className="z-10">
            <div className="flex items-center gap-4 mb-8 text-[#D6B97A]">
                <Command size={20} className="animate-spin-slow" />
                <span className="font-mono tracking-[0.5em] text-sm uppercase">{post.category} // {post.date}</span>
            </div>
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase break-words">
                {post.title.split(' ').map((word, i) => (
                    <motion.span 
                        key={i} 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="inline-block mr-[0.2em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </h1>
        </motion.div>

        {/* Dynamic Background Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none">
            <span className="text-[40vw] font-black leading-none select-none">
                0{posts.indexOf(post) + 1}
            </span>
        </div>

        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">Scroll to Decrypt</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#D6B97A] to-transparent" />
        </motion.div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1800px] mx-auto px-6 md:px-12 pb-48">
        
        {/* Left Sidebar: Technical Meta */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
            <div className="space-y-12 border-l border-[#F3EFE6]/10 pl-8">
                <div>
                    <h4 className="font-mono text-[10px] text-[#D6B97A] uppercase tracking-[0.2em] mb-4">Metadata</h4>
                    <ul className="space-y-4 font-mono text-xs opacity-60">
                        <li>READ_TIME: {post.readingTime}</li>
                {/* Fixed line below using the hexId we generated */}{/* Replace the line with post.id with this: */}
            <li>INDEX: 0x{post.slug.substring(0, 2).toUpperCase()}</li>
                        <li>AUTH: EXTERNAL_MIND</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-mono text-[10px] text-[#D6B97A] uppercase tracking-[0.2em] mb-4">Neural_Load</h4>
                    <div className="w-full h-1 bg-white/5 overflow-hidden">
                        <motion.div className="h-full bg-[#D6B97A]" style={{ width: "65%" }} />
                    </div>
                </div>
            </div>
        </aside>

        {/* Central Content */}
        <div className="lg:col-span-7 lg:col-start-4">
            {Content && (
                <Suspense fallback={<GlitchLoader />}>
                    <article className="prose prose-invert prose-2xl max-w-none">
                        <Content components={MDXComponents} />
                    </article>
                </Suspense>
            )}
        </div>
      </main>

      {/* --- FOOTER: TERMINATION --- */}
      <footer className="relative py-48 border-t border-[#F3EFE6]/10 overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-[1800px] mx-auto px-6 text-center relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block cursor-pointer">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8">End of Transmission</h2>
            </motion.div>
            <div className="flex justify-center gap-12 font-mono text-sm opacity-40">
                <Link to="/blog" className="hover:text-[#D6B97A] transition-colors underline decoration-1 underline-offset-4">REBOOT_INDEX</Link>
                <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-[#D6B97A] transition-colors underline decoration-1 underline-offset-4">RETURN_TO_TOP</button>
            </div>
        </div>
      </footer>
    </div>
  );
}

function GlitchLoader() {
    return (
        <div className="h-[60vh] flex flex-col justify-center font-mono text-[#D6B97A]">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-4 bg-[#D6B97A] animate-ping" />
                <span className="text-xl tracking-tighter">ESTABLISHING_ENCRYPTED_TUNNEL...</span>
            </div>
            <div className="grid grid-cols-4 gap-2 opacity-30">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-1 bg-[#F3EFE6] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
            </div>
        </div>
    )
}