import { Article, CategoryInfo, CATEGORIES, Category } from '../../types';
import { ArticleCard } from './ArticleCard';

interface CategorySectionProps {
  categoryId: string;
  articles: Article[];
}

// Farbliche Akzente pro Kategorie
const categoryColors: Record<Category, string> = {
  politik: 'border-l-blue-600',
  wissenschaft: 'border-l-purple-600',
  biologie: 'border-l-green-600',
  medizin: 'border-l-red-500',
  krieg: 'border-l-orange-600',
  china: 'border-l-rose-600',
  roboter: 'border-l-cyan-600',
  allgemein: 'border-l-gray-600',
};

export function CategorySection({ categoryId, articles }: CategorySectionProps) {
  const category = CATEGORIES.find(c => c.id === categoryId) as CategoryInfo;

  if (articles.length === 0) return null;

  const accentColor = categoryColors[categoryId as Category] || 'border-l-gray-600';

  return (
    <section className={`category-section mb-8 pl-4 border-l-4 ${accentColor}`}>
      <div className="category-header">
        <span className="category-emoji">{category.emoji}</span>
        <h2 className="category-title">{category.name}</h2>
      </div>

      <div className="space-y-0">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
