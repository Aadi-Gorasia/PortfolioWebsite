import matter from 'gray-matter';

// Vite-specific: Import all mdx files as strings to parse frontmatter
const rawContent = import.meta.glob('/content/blog/*.mdx', { as: 'raw', eager: true });

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  coverImage: string;
  readingTime: string;
  slug: string;
}

export const getAllPosts = (): PostMeta[] => {
  return Object.entries(rawContent).map(([filepath, content]) => {
    const { data } = matter(content);
    const slug = filepath.split('/').pop()?.replace('.mdx', '') || '';
    
    return {
      ...(data as PostMeta),
      slug,
      
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};