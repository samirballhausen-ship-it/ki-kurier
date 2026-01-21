import { Article } from '../../types';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="article-card group">
      <h3 className="headline-article mb-3">
        {article.headline}
      </h3>

      {/* Ausführlicher Inhalt */}
      <p className="article-content mb-3">
        {article.content}
      </p>

      {/* Kernpunkte */}
      {article.key_points && article.key_points.length > 0 && (
        <ul className="key-points mb-3">
          {article.key_points.map((point, index) => (
            <li key={index} className="key-point">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Quellen-Box */}
      <div className="source-box">
        <span className="source-label">Quelle:</span>
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          {article.source_name}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <span className="fact-check-hint">Faktencheck</span>
      </div>
    </article>
  );
}
