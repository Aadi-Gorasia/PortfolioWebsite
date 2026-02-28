export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  coverImage: string;
  featured: boolean;
  slug: string;
  readingTime: string;
}

const modules = import.meta.glob("../content/blog/*.mdx", {
  eager: true
});

function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function getBlogPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const path in modules) {
    const mod: any = modules[path];

    const slug =
      path.split("/").pop()?.replace(".mdx", "") || "";

    const meta = mod.meta || {};

    const contentString =
      typeof mod.default === "string"
        ? mod.default
        : "";

    posts.push({
      title: meta.title ?? "Untitled",
      description: meta.description ?? "",
      date: meta.date ?? new Date().toISOString(),
      tags: meta.tags ?? [],
      category: meta.category ?? "General",
      coverImage: meta.coverImage ?? "",
      featured: Boolean(meta.featured),
      slug,
      readingTime: calculateReadingTime(contentString),
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}