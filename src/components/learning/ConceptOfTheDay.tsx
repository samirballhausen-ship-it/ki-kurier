import { ConceptOfTheDay as ConceptType } from '../../types';
import { Lightbulb, CheckCircle } from 'lucide-react';

interface ConceptOfTheDayProps {
  concept: ConceptType;
}

export function ConceptOfTheDay({ concept }: ConceptOfTheDayProps) {
  return (
    <section className="tip-box mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-newspaper-accent" />
        <h2 className="headline-section">KI-Konzept des Tages</h2>
      </div>

      <h3 className="font-serif text-2xl font-bold mb-4 text-newspaper-accent">
        {concept.title}
      </h3>

      <div className="prose prose-newspaper max-w-none mb-6">
        {concept.explanation.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="article-summary mb-3 whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-3 text-newspaper-muted">
          Praktische Beispiele
        </h4>
        <ul className="space-y-2">
          {concept.practical_examples.map((example, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <span className="font-sans text-sm">{example}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
