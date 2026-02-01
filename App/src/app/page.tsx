import Link from 'next/link';
import { NewsletterForm } from '@/components/newsletter-form';
import { PremiumSubscribe } from '@/components/premium-subscribe';
import { ArticleCard } from '@/components/article-card';
import { getFeaturedArticles, getArticles, categoryLabels, type Category } from '@/lib/articles';

export default function Home() {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getArticles().slice(0, 4);
  const categories: Category[] = ['x402', 'erc-8004', 'ai-agents', 'openclaw', 'eliza', 'defi'];

  const categoryIcons: Record<Category, string> = {
    'x402': '💰',
    'erc-8004': '🔐',
    'ai-agents': '🤖',
    'openclaw': '🦊',
    'eliza': '💜',
    'defi': '📈',
    'general': '📰',
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Banner Background */}
        <div className="absolute inset-0">
          <img 
            src="/perkos-banner.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0716]/60 via-[#0E0716]/80 to-[#0E0716]" />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#EB1B69]/10 blur-[100px] orb" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FD8F50]/10 blur-[120px] orb-delayed" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-[#76437B]/10 blur-[80px] orb" />

        <div className="container mx-auto max-w-6xl px-6 pt-32 pb-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B1833]/80 border border-[#2d2548] mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#EB1B69] animate-pulse" />
              <span className="text-sm text-[#a3a3a3]">The Agent Economy Chronicle</span>
            </div>

            {/* Perky Mascot */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 border-2 border-[#EB1B69]/30">
                  <img 
                    src="/perky-mascot.jpg" 
                    alt="Perky - the PerkOS mascot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] opacity-20 blur-2xl -z-10 group-hover:opacity-40 transition-opacity duration-500" />
                {/* Floating particles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#EB1B69] animate-pulse" />
                <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-[#FD8F50] animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Headline */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              <span className="gradient-text">Perky News</span>
            </h1>

            {/* Subhead */}
            <p className="text-xl md:text-2xl text-[#a3a3a3] mb-10 max-w-2xl mx-auto leading-relaxed">
              Deep analysis of <span className="text-white">x402</span>, <span className="text-white">ERC-8004</span>, 
              and <span className="text-white">AI agents</span> — the infrastructure powering Web3&apos;s next chapter.
            </p>

            {/* Newsletter CTA */}
            <div className="max-w-lg mx-auto mb-8">
              <NewsletterForm variant="hero" />
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-[#666]">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-[#0E0716] bg-gradient-to-br from-[#EB1B69] to-[#FD8F50]"
                      style={{ zIndex: 4 - i }}
                    />
                  ))}
                </div>
                <span className="text-[#a3a3a3]">1,200+ subscribers</span>
              </div>
              <span className="hidden sm:inline text-[#2d2548]">|</span>
              <span className="hidden sm:inline text-[#a3a3a3]">Weekly insights</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-[#666] uppercase tracking-widest">Explore</span>
          <svg className="w-5 h-5 text-[#EB1B69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <span 
                  className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-2 block"
                  style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                >
                  Featured
                </span>
                <h2 
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                >
                  Editor&apos;s Picks
                </h2>
              </div>
              <Link 
                href="/articles"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-[#a3a3a3] hover:text-white transition-colors group"
              >
                <span>View all</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Featured Grid */}
            <div className="grid gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Topics Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1B1833]/30 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="text-xs font-semibold text-[#FD8F50] tracking-widest uppercase mb-2 block"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Coverage
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Explore Topics
            </h2>
            <p className="text-[#a3a3a3] max-w-xl mx-auto">
              Deep dives into the protocols, standards, and technologies shaping the agent economy.
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat}
                href={`/articles?category=${cat}`}
                className="group relative p-6 rounded-2xl bg-[#1B1833]/50 border border-[#2d2548] hover:border-[#EB1B69]/50 transition-all duration-300 hover-lift"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#EB1B69]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-center">
                  <span className="text-4xl block mb-3 transform group-hover:scale-110 transition-transform">
                    {categoryIcons[cat]}
                  </span>
                  <span 
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                  >
                    {categoryLabels[cat]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span 
                className="text-xs font-semibold text-[#EF5B57] tracking-widest uppercase mb-2 block"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                Latest
              </span>
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                Recent Articles
              </h2>
            </div>
            <Link 
              href="/articles"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2d2548] text-sm font-medium text-white hover:border-[#EB1B69]/50 hover:bg-[#EB1B69]/10 transition-all"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              View all articles
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Mobile View All */}
          <div className="md:hidden text-center mt-8">
            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2d2548] text-sm font-medium text-white"
            >
              View all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0716] via-[#1B1833]/50 to-[#0E0716]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#EB1B69]/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#FD8F50]/10 blur-[120px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <span 
                className="text-xs font-semibold text-[#FAB46C] tracking-widest uppercase mb-4 block"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                Premium Access
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                Go deeper with{' '}
                <span className="gradient-text">Premium</span>
              </h2>
              <p className="text-[#a3a3a3] text-lg mb-8 leading-relaxed">
                Unlock exclusive analysis, early access to breaking coverage, and support 
                independent journalism with seamless x402 crypto payments.
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {[
                  { icon: '📊', text: 'Exclusive technical deep-dives' },
                  { icon: '⚡', text: 'Early access to breaking news' },
                  { icon: '💬', text: 'Discord community access' },
                  { icon: '🔗', text: 'Powered by x402 payments' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-[#1B1833] border border-[#2d2548] flex items-center justify-center text-lg">
                      {item.icon}
                    </span>
                    <span className="text-white">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Card */}
            <div>
              <PremiumSubscribe variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* Final Newsletter CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B1833] to-[#0E0716] border border-[#2d2548] rounded-3xl" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EB1B69]/10 blur-[100px]" />
            
            <div className="relative z-10 text-center">
              <span 
                className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-4 block"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                Free Newsletter
              </span>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                Stay Ahead of the Curve
              </h2>
              <p className="text-[#a3a3a3] mb-8 max-w-xl mx-auto">
                Not ready for premium? Get the free weekly digest with the best insights 
                on x402, ERC-8004, and AI agents delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm variant="full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
