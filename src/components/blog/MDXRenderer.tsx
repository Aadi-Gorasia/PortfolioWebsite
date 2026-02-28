import { lazy, Suspense } from 'react';

export default function MDXRenderer({ slug }: { slug: string }) {
  // Vite dynamically loads the specific MDX file as a React component
  const Post = lazy(() => import(`../../../content/blog/${slug}.mdx`));

  return (
    <Suspense fallback={<div className="h-screen animate-pulse bg-zinc-100" />}>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <Post />
      </div>
    </Suspense>
  );
}