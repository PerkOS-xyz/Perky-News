import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticles, categoryLabels } from '@/lib/articles';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0E0716] to-[#1a1a2e] text-white">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="text-white/70 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/category/${article.category}`}>
              <span className="text-xs font-semibold text-[#EB1B69] uppercase tracking-wide bg-white/10 px-3 py-1 rounded-full">
                {categoryLabels[article.category] || article.category}
              </span>
            </Link>
            <span className="text-white/50 text-sm">{article.publishedAt}</span>
            {article.readingTime && (
              <span className="text-white/50 text-sm">• {article.readingTime} min read</span>
            )}
          </div>
          <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>
          <p className="text-white/80 mt-4 text-lg">{article.excerpt}</p>
          
          {/* Author */}
          <div className="flex items-center gap-3 mt-6">
            <img 
              src={article.authorAvatar || '/perky-mascot.jpg'} 
              alt={article.author}
              className="w-12 h-12 rounded-full border-2 border-[#EB1B69]"
            />
            <div>
              <p className="font-semibold">{article.author}</p>
              {article.authorEmail && (
                <p className="text-white/60 text-sm">{article.authorEmail}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="container mx-auto max-w-4xl px-4 -mt-6">
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#0E0716] prose-a:text-[#EB1B69] prose-strong:text-[#0E0716]"
          dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
        />

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg mb-4">Sources</h3>
            <ul className="space-y-2">
              {article.sources.map((source, i) => (
                <li key={i}>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#EB1B69] hover:underline"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio */}
        {article.authorBio && (
          <div className="mt-12 p-6 bg-gradient-to-r from-[#EB1B69]/10 to-[#FD8F50]/10 rounded-lg">
            <div className="flex items-start gap-4">
              <img 
                src={article.authorAvatar || '/perky-mascot.jpg'} 
                alt={article.author}
                className="w-16 h-16 rounded-full border-2 border-[#EB1B69]"
              />
              <div>
                <h4 className="font-bold text-lg">About {article.author}</h4>
                <p className="text-gray-600 mt-2">{article.authorBio}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4"></h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-3"></h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-2"></h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong></strong>')
    .replace(/\*(.*?)\*/g, '<em></em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="" target="_blank" rel="noopener noreferrer"></a>')
    .replace(/^- (.*$)/gm, '<li class="ml-4"></li>')
    .replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-4"></ul>')
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/^(?!<)(.+)$/gm, '<p class="my-4"></p>')
    .replace(/<p class="my-4"><\/p>/g, '');
}
