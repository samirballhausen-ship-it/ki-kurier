import { Calendar, Printer, ChevronLeft, ChevronRight, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface EditionInfo {
  id: string;
  date: string;
}

interface HeaderProps {
  date: string;
  onPrintClick: () => void;
  editions?: EditionInfo[];
  currentEditionId?: string;
  onEditionChange?: (editionId: string) => void;
}

export function Header({ date, onPrintClick, editions, currentEditionId, onEditionChange }: HeaderProps) {
  const formattedDate = format(new Date(date), "EEEE, d. MMMM yyyy", { locale: de });

  // Finde aktuelle Position in der Editions-Liste
  const currentIndex = editions?.findIndex(e => e.id === currentEditionId) ?? -1;
  const hasPrevious = currentIndex < (editions?.length ?? 0) - 1;
  const hasNext = currentIndex > 0;

  const goToPrevious = () => {
    if (hasPrevious && editions && onEditionChange) {
      onEditionChange(editions[currentIndex + 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext && editions && onEditionChange) {
      onEditionChange(editions[currentIndex - 1].id);
    }
  };

  return (
    <header className="border-b-4 border-newspaper-ink pb-4 mb-6">
      {/* Datum und Ausgabe-Info */}
      <div className="flex justify-between items-center mb-4 text-newspaper-muted">
        <div className="date-header flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="no-print flex items-center gap-2">
          {/* Archiv-Navigation */}
          {editions && editions.length > 1 && (
            <div className="flex items-center gap-1 mr-4">
              <button
                onClick={goToPrevious}
                disabled={!hasPrevious}
                className={`p-1 rounded ${hasPrevious ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed'}`}
                title="Ältere Ausgabe"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="flex items-center gap-1 text-sm">
                <Archive className="w-4 h-4" />
                <span>{currentIndex + 1} / {editions.length}</span>
              </span>
              <button
                onClick={goToNext}
                disabled={!hasNext}
                className={`p-1 rounded ${hasNext ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed'}`}
                title="Neuere Ausgabe"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          <button
            onClick={onPrintClick}
            className="flex items-center gap-2 px-3 py-1 bg-newspaper-ink text-newspaper-paper
                       hover:bg-newspaper-accent transition-colors text-sm font-sans"
          >
            <Printer className="w-4 h-4" />
            <span>PDF herunterladen</span>
          </button>
        </div>
      </div>

      {/* Masthead / Zeitungs-Titel */}
      <div className="text-center">
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2">
          KI-Kurier
        </h1>
        <div className="divider-double max-w-md mx-auto mb-2"></div>
        <p className="font-sans text-sm text-newspaper-muted italic">
          Deine tägliche Zeitung für Künstliche Intelligenz
        </p>
      </div>

      {/* Ausgabe-Nummer (simuliert) */}
      <div className="flex justify-between items-center mt-4 text-xs font-sans text-newspaper-muted uppercase tracking-wider">
        <span>Ausgabe Nr. {Math.floor((new Date(date).getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1}</span>
        <span>Automatisch generiert mit KI</span>
      </div>
    </header>
  );
}
