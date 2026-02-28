import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { PostMeta } from '@/types/blog';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
      <div className="aspect-video overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 rounded">
            {post.category}
          </span>
          <span className="text-zinc-400 text-xs flex items-center gap-1">
            <Clock size={12} /> {post.readingTime}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors flex items-start justify-between">
          {post.title} <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[11px] text-zinc-400">#{tag}</span>
            ))}
          </div>
          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
            <Calendar size={12} /> {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}