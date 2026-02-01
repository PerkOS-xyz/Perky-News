import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticles, categoryLabels, Category, getAllCategories } from '@/lib/articles';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    slug: category,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = slug as Category;
  
  if (!categoryLabels[category]) {
    notFound();
  }

  const articles = await getArticles(category);
  const categoryName = categoryLabels[category];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <Link href="/" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold">{categoryName}</h1>
          <p className="text-white/90 mt-2">{articles.length} articles</p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles in this category yet.</p>
            <Link href="/" className="text-[#EB1B69] hover:underline mt-4 inline-block">
              Browse all articles
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/articles/${article.slug}`}>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={article.coverImage || '/perkos-banner.jpg'} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="font-bold text-lg text-[#0E0716] group-hover:text-[#EB1B69] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">{article.publishedAt}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
