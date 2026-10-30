import { lazy, Suspense, useMemo, type ComponentPropsWithoutRef, type ComponentType, type LazyExoticComponent } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPosts } from "@/lib/blog-utils";

const MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-2xl md:text-4xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 text-[#F3EFE6] border-l-4 border-[#D6B97A] pl-4 md:pl-6 uppercase tracking-tighter"
      {...props} 
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="text-base md:text-xl leading-7 md:leading-relaxed mb-6 md:mb-8 text-[#A1A1AA] font-light" {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-white/5 px-1 text-[#D6B97A] font-mono text-sm" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-8 border-l-2 border-[#D6B97A] py-2 pl-5 text-xl italic text-[#F3EFE6] md:my-12 md:pl-8 md:text-2xl">
      {props.children}
    </blockquote>
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <div className="my-12 overflow-hidden border-y border-[#F3EFE6]/10">
      <img
        loading="lazy"
        decoding="async"
        className="w-full"
        {...props} 
      />
    </div>
  ),
};

type MdxContentProps = { components?: typeof MDXComponents };
const mdxModules = import.meta.glob<{ default: ComponentType<MdxContentProps> }>("../content/blog/*.mdx");
const mdxPages: Record<string, LazyExoticComponent<ComponentType<MdxContentProps>>> = Object.fromEntries(
  Object.entries(mdxModules).map(([path, importer]) => [path, lazy(importer)])
);

export default function BlogPost() {
  const { slug } = useParams();
  const posts = useMemo(() => getBlogPosts(), []);
  const post = posts.find((p) => p.slug === slug);

  const Content = slug ? mdxPages[`../content/blog/${slug}.mdx`] : undefined;

  if (!post) return <div className="flex min-h-screen items-center justify-center text-[#D6B97A] font-mono text-xl">Post not found</div>;

  return (

    <div className="relative min-h-screen bg-[#050505] text-[#F3EFE6] selection:bg-[#D6B97A] selection:text-[#000] overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 h-[max(4rem,calc(env(safe-area-inset-top)+3.5rem))] flex items-center justify-between px-5 md:h-20 md:px-12 z-[105] mix-blend-difference">
        <Link to="/blog" className="border-b border-[#F3EFE6]/60 pb-1 font-mono text-[10px] uppercase tracking-widest">
            ← Back to writing
        </Link>
      </nav>

      <header className="relative min-h-[55svh] flex flex-col justify-center py-28 md:py-32 px-5 sm:px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="z-10">
            <p className="mb-6 font-mono tracking-[0.2em] text-[10px] uppercase text-[#D6B97A]">{post.category}</p>
            <h1 className="max-w-5xl text-[clamp(3rem,12vw,8rem)] font-bold leading-[0.9] tracking-tighter break-words">
                {post.title.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-[0.2em]">
                        {word}
                    </span>
                ))}
            </h1>
        </div>

      </header>

      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-[1800px] mx-auto px-5 sm:px-6 md:px-12 pb-32 md:pb-48">
        
        <div className="mx-auto w-full max-w-3xl">
            {Content && (
                <Suspense fallback={<ArticleLoader />}>
                    <article className="prose prose-invert prose-base md:prose-2xl max-w-none">
                        <Content components={MDXComponents} />
                    </article>
                </Suspense>
            )}
        </div>
      </main>

      <footer className="relative py-24 md:py-48 border-t border-[#F3EFE6]/10 overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-[1800px] mx-auto px-6 text-center relative z-10">
            <div className="inline-block">
                <h2 className="px-5 text-4xl md:text-8xl font-semibold tracking-tighter mb-8">End of post</h2>
            </div>
            <div className="flex justify-center gap-8 font-mono text-xs uppercase tracking-widest text-white/55">
                <Link to="/blog" className="hover:text-[#D6B97A] transition-colors underline underline-offset-4">All writing</Link>
                <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-[#D6B97A] transition-colors underline underline-offset-4">Back to top</button>
            </div>
        </div>
      </footer>
    </div>
  );
}

function ArticleLoader() {
    return (
        <p className="py-16 text-center font-mono text-sm text-[#D6B97A]">Loading article...</p>
    )
}