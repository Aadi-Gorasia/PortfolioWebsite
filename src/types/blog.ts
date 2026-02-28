export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  coverImage: string;
  readingTime: string;
  featured: boolean;
  slug: string;
}

export interface BlogFilters {
  query: string;
  category: string;
  sortBy: 'newest' | 'oldest';
}