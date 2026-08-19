import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // Simple Markdown to HTML parser for basic formatting (h3, p, strong)
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-2xl font-bold text-[#2B3E50] mt-8 mb-4 font-[family-name:var(--font-head)]">${paragraph.replace('### ', '')}</h3>`;
        }
        // Bold text
        let formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<p class="mb-5 text-[#4A5568] leading-relaxed font-[family-name:var(--font-body)] text-[17px]">${formatted}</p>`;
      })
      .join('');
  };

  return (
    <main className="bg-[#F5F5F0] min-h-screen pt-32 pb-24">
      <div className="container-xl max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#6B7B8D] hover:text-[#3DAA7A] transition-colors font-medium mb-8 font-[family-name:var(--font-body)]">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        <article className="bg-white rounded-3xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          {/* Header Image */}
          <div className="relative w-full h-[400px]">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141C28]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex items-center gap-1.5 bg-[#3DAA7A] text-white text-xs font-bold px-3 py-1.5 rounded-full font-[family-name:var(--font-head)] tracking-wider mb-4">
                <Tag size={12} /> {post.category}
              </div>
              <h1 className="font-[family-name:var(--font-head)] text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-[family-name:var(--font-body)]">
                <span className="flex items-center gap-2"><Calendar size={16} className="text-[#3DAA7A]" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><User size={16} className="text-[#3DAA7A]" /> {post.author}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 lg:px-16">
            <div 
              className="prose prose-lg max-w-none prose-p:text-[#4A5568] prose-headings:text-[#2B3E50]"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
            
            <hr className="my-10 border-[#e2e8f0]" />
            
            <div className="bg-[#F8F9FA] rounded-xl p-8 border border-[#e2e8f0]">
              <h4 className="font-[family-name:var(--font-head)] text-xl font-bold text-[#2B3E50] mb-3">
                Need more technical advice?
              </h4>
              <p className="font-[family-name:var(--font-body)] text-[#6B7B8D] mb-6">
                Our engineering team is ready to help you specify the right products for your industrial project.
              </p>
              <Link href="/contact" className="btn-primary inline-block">
                Contact Our Engineers
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
