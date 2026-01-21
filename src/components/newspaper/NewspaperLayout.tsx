import { Edition, Category } from '../../types';
import { Header } from '../layout/Header';
import { TopStory } from './TopStory';
import { CategorySection } from './CategorySection';
import { ConceptOfTheDay } from '../learning/ConceptOfTheDay';
import { PromptOfTheDay } from '../learning/PromptOfTheDay';
import { getArticlesByCategory } from '../../lib/mock-data';

interface EditionInfo {
  id: string;
  date: string;
}

interface NewspaperLayoutProps {
  edition: Edition;
  onPrintClick: () => void;
  editions?: EditionInfo[];
  onEditionChange?: (editionId: string) => void;
}

export function NewspaperLayout({ edition, onPrintClick, editions, onEditionChange }: NewspaperLayoutProps) {
  const topStory = edition.articles.find(a => a.is_top_story);
  const articlesByCategory = getArticlesByCategory(edition.articles);

  // Kategorien in zwei Spalten aufteilen
  const leftCategories: Category[] = ['politik', 'wissenschaft', 'biologie', 'medizin'];
  const rightCategories: Category[] = ['krieg', 'china', 'roboter', 'allgemein'];

  return (
    <div className="min-h-screen bg-newspaper-bg">
      <div className="max-w-6xl mx-auto px-4 py-8 bg-newspaper-paper shadow-xl" id="newspaper-content">
        <Header
          date={edition.date}
          onPrintClick={onPrintClick}
          editions={editions}
          currentEditionId={edition.id}
          onEditionChange={onEditionChange}
        />

        {/* Top Story */}
        {topStory && <TopStory article={topStory} />}

        {/* News-Kategorien in 2 Spalten */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Linke Spalte */}
          <div className="border-r-0 lg:border-r border-newspaper-border pr-0 lg:pr-6">
            {leftCategories.map(cat => (
              <CategorySection
                key={cat}
                categoryId={cat}
                articles={articlesByCategory[cat]}
              />
            ))}
          </div>

          {/* Rechte Spalte */}
          <div>
            {rightCategories.map(cat => (
              <CategorySection
                key={cat}
                categoryId={cat}
                articles={articlesByCategory[cat]}
              />
            ))}
          </div>
        </div>

        {/* Trennlinie vor Lern-Sektion */}
        <div className="divider-double mb-8"></div>

        {/* Lern-Sektion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* KI-Konzept des Tages */}
          {edition.concept && (
            <ConceptOfTheDay concept={edition.concept} />
          )}

          {/* Prompt des Tages */}
          {edition.prompt && (
            <PromptOfTheDay prompt={edition.prompt} />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t-2 border-newspaper-ink text-center">
          <p className="font-sans text-xs text-newspaper-muted">
            Der KI-Kurier wird täglich automatisch generiert mit GPT-4 und DALL-E.
          </p>
          <p className="font-sans text-xs text-newspaper-muted mt-1">
            News-Quellen werden aus führenden Tech-Publikationen aggregiert.
          </p>
          <p className="font-serif text-sm mt-2 italic">
            "Wissen ist Macht - KI-Wissen ist Zukunft"
          </p>
        </footer>
      </div>
    </div>
  );
}
