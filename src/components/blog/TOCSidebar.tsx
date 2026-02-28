"use client";
import { useEffect, useState } from 'react';

export default function TOCSidebar({ content }: { content: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings = lines
      .filter((line) => line.startsWith('## '))
      .map((line) => {
        const text = line.replace('## ', '').trim();
        return { id: text.toLowerCase().replace(/\s+/g, '-'), text, level: 2 };
      });
    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">On this page</h4>
      <nav className="space-y-3">
        {headings.map((h) => (
          <a key={h.id} href={`#${h.id}`} className="block text-sm text-zinc-400 hover:text-blue-500 transition-colors">
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}