import { useState, useCallback, useEffect } from 'react';
import { NewspaperLayout } from './components/newspaper/NewspaperLayout';
import { mockEdition } from './lib/mock-data';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Edition, Article, ConceptOfTheDay, PromptOfTheDay } from './types';

interface EditionInfo {
  id: string;
  date: string;
}

function App() {
  const [edition, setEdition] = useState<Edition>(mockEdition);
  const [editions, setEditions] = useState<EditionInfo[]>([]);
  const [selectedEditionId, setSelectedEditionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Alle Editions laden (für Archiv-Navigation)
  useEffect(() => {
    async function fetchAllEditions() {
      if (!isSupabaseConfigured() || !supabase) return;

      const { data } = await supabase
        .from('editions')
        .select('id, publication_date')
        .order('publication_date', { ascending: false });

      if (data) {
        setEditions(data.map(e => ({ id: e.id, date: e.publication_date })));
      }
    }

    fetchAllEditions();
  }, []);

  // Daten aus Supabase laden
  useEffect(() => {
    async function fetchEdition() {
      if (!isSupabaseConfigured() || !supabase) {
        console.log('Supabase nicht konfiguriert, verwende Mock-Daten');
        setLoading(false);
        return;
      }

      console.log('Lade Daten aus Supabase...');
      setLoading(true);

      try {
        let editionData;

        // Wenn eine bestimmte Edition ausgewählt ist, lade diese
        if (selectedEditionId) {
          const { data, error: editionError } = await supabase
            .from('editions')
            .select('*')
            .eq('id', selectedEditionId)
            .single();

          if (editionError) throw editionError;
          editionData = data;
        } else {
          // Sonst neueste Edition holen
          const { data: editionsData, error: editionError } = await supabase
            .from('editions')
            .select('*')
            .order('publication_date', { ascending: false })
            .limit(1);

          console.log('Edition Antwort:', { editions: editionsData, editionError });

          if (editionError) throw editionError;
          if (!editionsData || editionsData.length === 0) throw new Error('Keine Edition gefunden');

          editionData = editionsData[0];
        }

        if (!editionData) throw new Error('Keine Edition gefunden');

        // Artikel für diese Edition holen
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .eq('edition_id', editionData.id);

        if (articlesError) throw articlesError;

        // Konzept des Tages holen
        const { data: concept } = await supabase
          .from('concepts')
          .select('*')
          .eq('edition_id', editionData.id)
          .single();

        // Prompt des Tages holen
        const { data: prompt } = await supabase
          .from('daily_prompts')
          .select('*')
          .eq('edition_id', editionData.id)
          .single();

        // Daten in Edition-Format umwandeln
        const formattedArticles: Article[] = (articles || []).map((a: any) => ({
          id: a.id,
          edition_id: a.edition_id,
          headline: a.headline,
          summary: a.summary,
          content: a.content,
          key_points: a.key_points || [],
          category: a.category,
          source_url: a.source_url,
          source_name: a.source_name,
          image_url: a.image_url,
          is_top_story: a.is_top_story,
          created_at: a.created_at,
        }));

        const formattedConcept: ConceptOfTheDay | undefined = concept ? {
          id: concept.id,
          edition_id: concept.edition_id,
          title: concept.title,
          explanation: concept.explanation,
          practical_examples: concept.practical_examples,
          created_at: concept.created_at,
        } : undefined;

        const formattedPrompt: PromptOfTheDay | undefined = prompt ? {
          id: prompt.id,
          edition_id: prompt.edition_id,
          prompt_text: prompt.prompt_text,
          explanation: prompt.explanation,
          use_case: prompt.use_case,
          example_output: prompt.example_output,
          created_at: prompt.created_at,
        } : undefined;

        // Top Story finden
        const topStory = formattedArticles.find(a => a.is_top_story);

        // Edition zusammenbauen
        const fullEdition: Edition = {
          id: editionData.id,
          date: new Date(editionData.publication_date).toISOString().split('T')[0],
          top_story_id: topStory?.id || formattedArticles[0]?.id || '',
          created_at: editionData.created_at,
          articles: formattedArticles,
          concept: formattedConcept,
          prompt: formattedPrompt,
        };

        setEdition(fullEdition);
        setError(null);
      } catch (err: any) {
        console.error('Fehler beim Laden:', err);
        setError(err.message);
        // Bei Fehler: Mock-Daten verwenden
      } finally {
        setLoading(false);
      }
    }

    fetchEdition();
  }, [selectedEditionId]);

  const handlePrint = useCallback(async () => {
    // @ts-ignore - html2pdf.js hat keine TypeScript Definitionen
    const html2pdf = (await import('html2pdf.js')).default;

    const element = document.getElementById('newspaper-content');
    if (!element) return;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `KI-Kurier_${edition.date}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
  }, [edition.date]);

  // Lade-Anzeige
  if (loading) {
    return (
      <div className="min-h-screen bg-newspaper-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📰</div>
          <p className="text-newspaper-muted">Lade KI-Kurier...</p>
        </div>
      </div>
    );
  }

  // Info-Banner
  const showDevBanner = !isSupabaseConfigured();
  const showErrorBanner = error && isSupabaseConfigured();

  return (
    <>
      {showDevBanner && (
        <div className="bg-amber-100 border-b border-amber-300 px-4 py-2 text-center no-print">
          <p className="text-amber-800 text-sm">
            <strong>Entwicklungsmodus:</strong> Zeige Mock-Daten. Konfiguriere Supabase für echte Daten.
          </p>
        </div>
      )}
      {showErrorBanner && (
        <div className="bg-red-100 border-b border-red-300 px-4 py-2 text-center no-print">
          <p className="text-red-800 text-sm">
            <strong>Fehler:</strong> {error} - Zeige Mock-Daten als Fallback.
          </p>
        </div>
      )}
      <NewspaperLayout
          edition={edition}
          onPrintClick={handlePrint}
          editions={editions}
          onEditionChange={setSelectedEditionId}
        />
    </>
  );
}

export default App;
