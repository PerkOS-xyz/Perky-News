import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NewsletterForm } from '@/components/newsletter-form';
import { getArticleBySlug, getArticles, categoryLabels, categoryColors } from '@/lib/articles';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.title} | Perky News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-zinc-400">
          <Link href="/" className="hover:text-zinc-100">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-zinc-100">Articles</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-100">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
            {article.featured && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-zinc-400 mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-zinc-400 border-y border-zinc-700 py-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  🐧
                </span>
                {article.author}
              </span>
            </div>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Cover Image Placeholder */}
        {article.coverImage && (
          <div className="mb-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-600/20 h-64 flex items-center justify-center">
            <span className="text-8xl">🐧</span>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none mb-12 prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-a:text-purple-400 prose-strong:text-zinc-100 prose-code:text-purple-300 prose-pre:bg-zinc-800">
          <div dangerouslySetInnerHTML={{ __html: formatContent(article.content) }} />
        </div>

        {/* Tags */}
        <div className="mb-12 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-zinc-800/50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Enjoyed this article?</h3>
          <p className="text-zinc-400 mb-6">
            Subscribe to Perky News for weekly updates on x402, ERC-8004, and AI agents.
          </p>
          <div className="flex justify-center">
            <NewsletterForm variant="inline" />
          </div>
        </div>

        {/* Back to Articles */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/articles">← Back to Articles</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

// Simple markdown-like formatting - in production, use MDX properly
function formatContent(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-purple-400 hover:underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p>${match}</p>`;
    });
}
