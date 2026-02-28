// src/lib/blog.ts (Vite Version)
export async function getAllPosts() {
  // Vite-specific way to grab all MDX files in a folder
  const modules = import.meta.glob('/content/blog/*.mdx', { eager: true });
  
  const posts = Object.entries(modules).map(([path, module]: any) => {
    return {
      slug: path.split('/').pop().replace('.mdx', ''),
      ...module.frontmatter, // Requires a vite-mdx plugin
    };
  });
  
  return posts;
}