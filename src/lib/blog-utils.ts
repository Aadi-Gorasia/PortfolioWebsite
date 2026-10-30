export interface BlogPostMeta {
  title: string;
  description: string;
  tags: string[];
  category: string;
  coverImage: string;
  featured: boolean;
  slug: string;
}

const modules = import.meta.glob<{ meta?: Partial<BlogPostMeta> }>("../content/blog/*.mdx", {
  eager: true
});

export function getBlogPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const path in modules) {
    const mod = modules[path];

    const slug =
      path.split("/").pop()?.replace(".mdx", "") || "";

    const meta = mod.meta || {};

    posts.push({
      title: meta.title ?? "Untitled",
      description: meta.description ?? "",
      tags: meta.tags ?? [],
      category: meta.category ?? "General",
      coverImage: meta.coverImage ?? "",
      featured: Boolean(meta.featured),
      slug,
    });
  }

  return posts;
}