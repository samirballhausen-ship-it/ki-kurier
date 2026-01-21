import { Article } from '../../types';
import { ExternalLink, CheckCircle, ArrowUpRight } from 'lucide-react';

interface TopStoryProps {
  article: Article;
}

export function TopStory({ article }: TopStoryProps) {
  return (
    <article className="top-story-card mb-8">
      <div className="divider-thick mb-4"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bild */}
        <div className="order-2 lg:order-1">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.headline}
              className="w-full h-72 lg:h-96 object-cover border-2 border-newspaper-border shadow-lg"
            />
          ) : (
            <div className="w-full h-72 lg:h-96 bg-gradient-to-br from-newspaper-border to-newspaper-muted
                            flex items-center justify-center border-2 border-newspaper-border">
              <span className="text-6xl">🤖</span>
            </div>
          )}
          <p className="text-xs font-sans text-newspaper-muted mt-2 italic">
            Titelbild generiert mit DALL-E
          </p>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2 flex flex-col">
          <span className="category-badge mb-3 inline-block self-start">Top-Thema des Tages</span>

          <h2 className="headline-main mb-4">
            {article.headline}
          </h2>

          {/* Ausführlicher Inhalt */}
          <p className="article-content text-lg leading-relaxed mb-4">
            {article.content}
          </p>

          {/* Kernpunkte */}
          {article.key_points && article.key_points.length > 0 && (
            <ul className="key-points-large mb-5">
              {article.key_points.map((point, index) => (
                <li key={index} className="key-point-large">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Prominenter Quellen-Button */}
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-button mt-auto"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Originalquelle lesen
            </span>
            <span className="source-button-name">
              {article.source_name}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>

      <div className="divider-thick mt-8"></div>
    </article>
  );
}
