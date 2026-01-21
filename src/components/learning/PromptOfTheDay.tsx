import { PromptOfTheDay as PromptType } from '../../types';
import { MessageSquare, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PromptOfTheDayProps {
  prompt: PromptType;
}

export function PromptOfTheDay({ prompt }: PromptOfTheDayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="tip-box mb-8 bg-gray-50">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6 text-newspaper-accent" />
        <h2 className="headline-section">Prompt des Tages</h2>
      </div>

      {/* Der Prompt */}
      <div className="relative mb-6">
        <div className="prompt-box">
          <pre className="whitespace-pre-wrap">{prompt.prompt_text}</pre>
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors no-print"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>

      {/* Erklärung */}
      <div className="mb-4">
        <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-2 text-newspaper-muted">
          Warum funktioniert dieser Prompt?
        </h4>
        <p className="article-summary text-sm">{prompt.explanation}</p>
      </div>

      {/* Use Case */}
      <div className="mb-4">
        <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-2 text-newspaper-muted">
          Wann ist dieser Prompt nützlich?
        </h4>
        <p className="article-summary text-sm">{prompt.use_case}</p>
      </div>

      {/* Beispiel-Output */}
      <div>
        <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-2 text-newspaper-muted">
          Beispiel-Ausgabe
        </h4>
        <div className="bg-white border border-newspaper-border p-4 rounded">
          <div className="prose prose-sm max-w-none">
            {prompt.example_output.split('\n').map((line, idx) => (
              <p key={idx} className="text-sm mb-1 whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
