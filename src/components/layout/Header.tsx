import { Calendar, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface HeaderProps {
  date: string;
  onPrintClick: () => void;
}

export function Header({ date, onPrintClick }: HeaderProps) {
  const formattedDate = format(new Date(date), "EEEE, d. MMMM yyyy", { locale: de });

  return (
    <header className="border-b-4 border-newspaper-ink pb-4 mb-6">
      {/* Datum und Ausgabe-Info */}
      <div className="flex justify-between items-center mb-4 text-newspaper-muted">
        <div className="date-header flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <button
          onClick={onPrintClick}
          className="no-print flex items-center gap-2 px-3 py-1 bg-newspaper-ink text-newspaper-paper 
                     hover:bg-newspaper-accent transition-colors text-sm font-sans"
        >
          <Printer className="w-4 h-4" />
          <span>PDF herunterladen</span>
        </button>
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
