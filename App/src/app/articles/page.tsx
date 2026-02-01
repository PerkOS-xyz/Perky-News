import Link from 'next/link';
import { getArticles, getAllCategories, categoryLabels, type Category, type Article } from '@/lib/articles';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const categoryIcons: Record<Category, string> = {
  'x402': '💰',
  'erc-8004': '🔐',
  'ai-agents': '🤖',
  'openclaw': '🦊',
  'eliza': '💜',
  'defi': '📈',
  'hackathons': '🏆',
  'general': '📰',
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { category: categoryFilter } = await searchParams;
  const categories = getAllCategories();
  const articles = await getArticles(categoryFilter as Category || undefined);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0E0716] to-[#1a1a2e] text-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <Link href="/" className="text-white/70 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold">All Articles</h1>
          <p className="text-white/80 mt-2">Deep dives into the agent economy</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/articles"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !categoryFilter
                ? 'bg-[#EB1B69] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ✨ All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/articles?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-[#EB1B69] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoryIcons[cat]} {categoryLabels[cat]}
            </Link>
          ))}
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
            <p className="text-gray-500 text-lg">No articles found.</p>
            <Link href="/articles" className="text-[#EB1B69] hover:underline mt-4 inline-block">
              View all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group">
      <div className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={article.coverImage || '/perkos-banner.jpg'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-[#EB1B69] uppercase">
            {categoryLabels[article.category]}
          </span>
          <h3 className="font-bold text-[#0E0716] mt-1 group-hover:text-[#EB1B69] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
          <p className="text-xs text-gray-400 mt-3">{article.publishedAt}</p>
        </div>
      </div>
    </Link>
  );
}
