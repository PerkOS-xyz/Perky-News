'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import { getArticles, getAllCategories, categoryLabels, type Category } from '@/lib/articles';

const categoryIcons: Record<Category, string> = {
  'x402': '💰',
  'erc-8004': '🔐',
  'ai-agents': '🤖',
  'openclaw': '🦊',
  'eliza': '💜',
  'defi': '📈',
  'general': '📰',
};

function ArticlesContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category') as Category | null;
  
  const categories = getAllCategories();
  const articles = getArticles(categoryFilter || undefined);

  return (
    <>
      {/* Category Filter */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3">
          <CategoryPill 
            href="/articles" 
            active={!categoryFilter}
            icon="✨"
          >
            All Articles
          </CategoryPill>
          {categories.map((cat) => (
            <CategoryPill
              key={cat}
              href={`/articles?category=${cat}`}
              active={categoryFilter === cat}
              icon={categoryIcons[cat]}
            >
              {categoryLabels[cat]}
            </CategoryPill>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-[#1B1833] border border-[#2d2548] flex items-center justify-center text-4xl mx-auto mb-6">
            📭
          </div>
          <h3 
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            No articles yet
          </h3>
          <p className="text-[#a3a3a3] mb-6">
            We haven&apos;t published any articles in this category yet.
          </p>
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white font-semibold"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            View all articles
          </Link>
        </div>
      )}
    </>
  );
}

function CategoryPill({ 
  href, 
  active, 
  icon,
  children 
}: { 
  href: string; 
  active: boolean;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
        ${active 
          ? 'bg-gradient-to-r from-[#EB1B69] to-[#EF5B57] text-white shadow-lg shadow-[#EB1B69]/20' 
          : 'bg-[#1B1833]/50 border border-[#2d2548] text-[#a3a3a3] hover:border-[#EB1B69]/50 hover:text-white'
        }
      `}
      style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden hero-bg">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-[#EB1B69]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#FD8F50]/10 blur-[80px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span 
              className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              The Archive
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-xl text-[#a3a3a3] leading-relaxed">
              Deep dives into x402, ERC-8004, AI agents, and the protocols 
              powering the agent economy. Analysis for builders, by builders.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Suspense fallback={<ArticlesLoading />}>
            <ArticlesContent />
          </Suspense>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 border-t border-[#2d2548]/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            Never miss an article
          </h2>
          <p className="text-[#a3a3a3] mb-8">
            Get weekly insights on the agent economy delivered to your inbox.
          </p>
          <Link 
            href="/subscribe"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/20 transition-all"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            Subscribe to Perky News
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ArticlesLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="rounded-2xl bg-[#1B1833]/50 border border-[#2d2548] overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-[#2d2548]/50" />
          <div className="p-6 space-y-4">
            <div className="h-4 w-20 bg-[#2d2548]/50 rounded-full" />
            <div className="h-6 w-3/4 bg-[#2d2548]/50 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-[#2d2548]/50 rounded" />
              <div className="h-4 w-2/3 bg-[#2d2548]/50 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
