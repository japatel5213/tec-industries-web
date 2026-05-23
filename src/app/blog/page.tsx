import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog & Industry Insights',
  description: 'Technical articles, guides, and industry insights on industrial piping, HDPE, PPR, and cooling towers from the experts at TEC INDUSTRIES.',
};

export default function BlogIndexPage() {
  return (
    <main className="bg-[#F5F5F0] min-h-screen pt-32 pb-24">
      {/* Header Banner */}
      <div className="container-xl mb-16">
        <div className="bg-gradient-to-r from-[#141C28] to-[#2B3E50] rounded-3xl p-10 md:p-16 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#3DAA7A] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <span className="section-eyebrow text-[#3DAA7A] mb-4 block">Knowledge Hub</span>
          <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold mb-4 relative z-10">
            Industry Insights & Technical Guides
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/80 max-w-2xl mx-auto relative z-10">
            Expert advice, best practices, and technical knowledge on industrial piping systems, cooling, and manufacturing.
          </p>
        </div>
      </div>

      <div className="container-xl max-w-5xl">
        <div className="grid gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden hover:shadow-md transition-shadow group flex flex-col md:flex-row">
              <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                <div className="absolute top-4 left-4 bg-[#3DAA7A] text-white text-xs font-bold px-3 py-1.5 rounded-full font-[family-name:var(--font-head)] tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-[#6B7B8D] font-[family-name:var(--font-body)] mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                </div>
                <h2 className="font-[family-name:var(--font-head)] text-2xl font-bold text-[#2B3E50] mb-3 group-hover:text-[#3DAA7A] transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[#3DAA7A] font-semibold font-[family-name:var(--font-body)] hover:text-[#2D8B6E] transition-colors group/link mt-auto">
                  Read Full Article <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
