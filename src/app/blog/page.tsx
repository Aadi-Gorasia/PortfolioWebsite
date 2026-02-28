import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const posts = await getAllPosts();
  const { q } = await searchParams;

  const filteredPosts = posts.filter(post => 
    !q || post.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Blog</h1>
        <p className="text-zinc-500 text-lg">Thoughts on engineering and design.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}