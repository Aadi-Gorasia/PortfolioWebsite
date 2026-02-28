// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      // This allows you to use frontmatter in MDX
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter], 
      rehypePlugins: [],
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})