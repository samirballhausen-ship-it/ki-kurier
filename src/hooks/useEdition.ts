import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Edition, Article, ConceptOfTheDay, PromptOfTheDay } from '../types';
import { mockEdition } from '../lib/mock-data';

interface UseEditionResult {
  edition: Edition | null;
  loading: boolean;
  error: string | null;
}

// Aktuelle Ausgabe laden
export function useCurrentEdition(): UseEditionResult {
  const [edition, setEdition] = useState<Edition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEdition() {
      // Wenn Supabase nicht konfiguriert ist, Mock-Daten verwenden
      if (!isSupabaseConfigured()) {
        setEdition(mockEdition);
        setLoading(false);
        return;
      }

      try {
        // Neueste Ausgabe abrufen
        if (!supabase) throw new Error('Supabase nicht konfiguriert');
        const { data: editionData, error: editionError } = await supabase
          .from('editions')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .single();

        if (editionError) throw editionError;

        // Artikel für diese Ausgabe
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .eq('edition_id', editionData.id)
          .order('is_top_story', { ascending: false });

        if (articlesError) throw articlesError;

        // Konzept des Tages
        const { data: concept } = await supabase
          .from('concepts')
          .select('*')
          .eq('edition_id', editionData.id)
          .single();

        // Prompt des Tages
        const { data: prompt } = await supabase
          .from('daily_prompts')
          .select('*')
          .eq('edition_id', editionData.id)
          .single();

        const fullEdition: Edition = {
          ...editionData,
          articles: articles as Article[],
          concept: concept as ConceptOfTheDay | undefined,
          prompt: prompt as PromptOfTheDay | undefined,
        };

        setEdition(fullEdition);
      } catch (err) {
        console.error('Fehler beim Laden der Ausgabe:', err);
        setError('Ausgabe konnte nicht geladen werden. Zeige Mock-Daten.');
        // Fallback zu Mock-Daten
        setEdition(mockEdition);
      } finally {
        setLoading(false);
      }
    }

    fetchEdition();
  }, []);

  return { edition, loading, error };
}

// Ausgabe nach Datum laden (für Archiv)
export function useEditionByDate(date: string): UseEditionResult {
  const [edition, setEdition] = useState<Edition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEdition() {
      if (!isSupabaseConfigured()) {
        // Im Dev-Modus nur aktuelle Mock-Daten verfügbar
        if (date === mockEdition.date) {
          setEdition(mockEdition);
        } else {
          setError('Archiv nur mit Supabase verfügbar');
        }
        setLoading(false);
        return;
      }

      try {
        if (!supabase) throw new Error('Supabase nicht konfiguriert');
        const { data: editionData, error: editionError } = await supabase
          .from('editions')
          .select('*')
          .eq('date', date)
          .single();

        if (editionError) throw editionError;

        const { data: articles } = await supabase
          .from('articles')
          .select('*')
          .eq('edition_id', editionData.id)
          .order('is_top_story', { ascending: false });

        const { data: concept } = await supabase
          .from('concepts')
          .select('*')
          .eq('edition_id', editionData.id)
          .single();

        const { data: prompt } = await supabase
          .from('daily_prompts')
          .select('*')
          .eq('edition_id', editionData.id)
          .single();

        setEdition({
          ...editionData,
          articles: articles || [],
          concept,
          prompt,
        });
      } catch (err) {
        setError('Ausgabe nicht gefunden');
      } finally {
        setLoading(false);
      }
    }

    fetchEdition();
  }, [date]);

  return { edition, loading, error };
}

// Liste aller verfügbaren Ausgaben (für Archiv-Navigation)
export function useEditionList() {
  const [editions, setEditions] = useState<{ id: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      if (!isSupabaseConfigured()) {
        setEditions([{ id: mockEdition.id, date: mockEdition.date }]);
        setLoading(false);
        return;
      }

      if (!supabase) return;
      const { data } = await supabase
        .from('editions')
        .select('id, date')
        .order('date', { ascending: false });

      setEditions(data || []);
      setLoading(false);
    }

    fetchList();
  }, []);

  return { editions, loading };
}
