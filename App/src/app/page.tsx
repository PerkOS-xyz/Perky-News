import { CategoryBar } from '@/components/CategoryBar';
import { ArticleList } from '@/components/ArticleList';
import { Sidebar } from '@/components/Sidebar';
import { getArticles } from '@/lib/articles';

export default function Home() {
  const articles = getArticles();

  return (
    <div className='container mx-auto max-w-7xl px-4 py-8'>
      <CategoryBar />
      <div className='flex flex-col lg:flex-row gap-8 mt-8'>
        <main className='flex-1 lg:w-8/12'>
          <ArticleList articles={articles} />
        </main>
        <Sidebar popularArticles={articles.slice(0, 5)} />
      </div>
    </div>
  );
}
